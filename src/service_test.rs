use super::service;
use tonic::transport::Server;

#[test]
fn test_executor_one() {
    assert_eq!(service::one(), 1);
}

#[tokio::test]
async fn test_create_point() {
    let (tx, rx) = tokio::sync::oneshot::channel::<()>();

    let stop = move || {
        tx.send(()).unwrap();
    };

    let s = tokio::spawn(async move {
        let server = service::Service::create_server();
        let res = Server::builder()
            .add_service(server)
            .serve_with_shutdown("[::1]:10000".parse().unwrap(), async move {
                rx.await.unwrap();
            })
            .await;

        assert!(res.is_ok());
        res.unwrap();
    });

    let c = tokio::spawn(async move {
        use proto::mytowerproto::my_tower_service_client::MyTowerServiceClient;
        use proto::mytowerproto::{CreatePointRequest, ListPointsRequest, Point};

        let client = MyTowerServiceClient::connect("http://[::1]:10000").await;
        assert!(client.is_ok());

        let mut client = client.unwrap();

        let response = client
            .create_point(CreatePointRequest {
                id: "1".into(),
                point: Some(Point { x: 1.0, y: 2.0 }),
            })
            .await;
        assert!(response.is_ok());

        let response = client
            .create_point(CreatePointRequest {
                id: "2".into(),
                point: Some(Point { x: 1.0, y: 2.0 }),
            })
            .await;
        assert!(response.is_ok());

        let response = client.list_points(ListPointsRequest::default()).await;

        assert!(response.is_ok());
        let response = response.unwrap().into_inner();

        assert_eq!(response.count, 2);
        assert_eq!(response.points.len(), 2);

        stop();
    });

    let spawns = tokio::join!(s, c);
    assert!(spawns.0.is_ok());
    assert!(spawns.1.is_ok());
}
