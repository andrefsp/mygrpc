use std::collections::BTreeMap;
use std::sync::Arc;
use std::sync::Mutex;

use tokio_stream::wrappers::ReceiverStream;
use tokio_stream::StreamExt;

use tonic::{Request, Response, Status, Streaming};

use proto::mytowerproto::my_tower_service_server::{MyTowerService, MyTowerServiceServer};
use proto::mytowerproto::{
    CreatePointRequest, CreatePointResponse, ListPointsRequest, ListPointsResponse, Point,
    StreamPointsRequest,
};

pub fn one() -> u8 {
    1
}

#[derive(Default)]
pub struct Service {
    points: Arc<Mutex<BTreeMap<String, Point>>>,
}

impl Service {
    pub fn create_server() -> MyTowerServiceServer<Self> {
        let svc = Service::default();
        MyTowerServiceServer::new(svc)
    }
}

#[tonic::async_trait]
impl MyTowerService for Service {
    async fn create_point(
        &self,
        request: Request<CreatePointRequest>,
    ) -> Result<Response<CreatePointResponse>, Status> {
        let request = request.into_inner();
        println!("create_point: {:?}", request);
        let point = match request.point {
            Some(point) => point,
            _ => return Err(Status::invalid_argument("invalid request")),
        };

        let points = self.points.clone();
        let mut points = points.lock().unwrap();

        let response = CreatePointResponse {
            id: request.id.clone(),
            point: Some(point.clone()),
        };

        points.insert(request.id, point);

        Ok(Response::new(response))
    }

    async fn list_points(
        &self,
        request: Request<ListPointsRequest>,
    ) -> Result<Response<ListPointsResponse>, Status> {
        println!("list_points: {:?}", request);

        let points = self.points.clone();
        let points = points.lock().unwrap();

        let point_count = points.len() as i32;

        let mut point_list = vec![];
        point_list.extend(points.values().map(|val| val.to_owned()));

        Ok(Response::new(ListPointsResponse {
            count: point_count,
            points: point_list,
        }))
    }

    // bidirectional streams are not supported by gRPC-web;
    // this endpoint is therefore just one example.
    type PushPointsStream = ReceiverStream<Result<Point, Status>>;
    async fn push_points(
        &self,
        request: Request<Streaming<Point>>,
    ) -> Result<Response<Self::PushPointsStream>, Status> {
        let (tx, rx) = tokio::sync::mpsc::channel(10);
        let rx = tokio_stream::wrappers::ReceiverStream::new(rx);

        tokio::spawn(async move {
            let mut in_stream = request.into_inner();

            while let Some(result) = in_stream.next().await {
                match result {
                    Ok(point) => tx.send(Ok(point)).await.expect("message sent"),
                    Err(err) => {
                        println!("err: {:?}", err);
                        tx.send(Err(Status::internal("closing connection")))
                            .await
                            .unwrap();
                        return;
                    }
                };
            }
        });

        Ok(Response::new(rx))
    }

    // Server downstream stream. Given a request the server responds
    // with a unidirectional stream.
    type StreamPointsStream = ReceiverStream<Result<Point, Status>>;
    async fn stream_points(
        &self,
        _request: Request<StreamPointsRequest>,
    ) -> Result<Response<Self::StreamPointsStream>, Status> {
        let (tx, rx) = tokio::sync::mpsc::channel(10);
        let rx = tokio_stream::wrappers::ReceiverStream::new(rx);

        tokio::spawn(async move {
            loop {
                tokio::time::sleep(tokio::time::Duration::from_millis(1000)).await;
                match tx.send(Ok(Point { x: 1.0, y: 2.0 })).await {
                    Err(err) => {
                        println!("{:?}", err);
                        return;
                    }
                    _ => {}
                };
            }
        });

        Ok(Response::new(rx))
    }
}
