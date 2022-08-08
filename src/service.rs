use std::collections::BTreeMap;
use std::sync::Arc;
use std::sync::Mutex;

use tonic::{Request, Response};

use proto::mytowerproto::my_tower_service_server::{MyTowerService, MyTowerServiceServer};
use proto::mytowerproto::{
    CreatePointRequest, CreatePointResponse, ListPointsRequest, ListPointsResponse, Point,
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
    ) -> Result<Response<CreatePointResponse>, tonic::Status> {
        let request = request.into_inner();

        let point = match request.point {
            Some(point) => point,
            _ => return Err(tonic::Status::invalid_argument("invalid request")),
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
        _request: tonic::Request<ListPointsRequest>,
    ) -> Result<tonic::Response<ListPointsResponse>, tonic::Status> {
        let points = self.points.clone();
        let points = points.lock().unwrap();

        let mut point_list = vec![];
        point_list.extend(points.values().map(|val| val.to_owned()));

        Ok(Response::new(ListPointsResponse {
            count: points.len() as i32,
            points: point_list,
        }))
    }
}
