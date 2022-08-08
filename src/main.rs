use mygrpc::service;
use tonic::transport::Server;

#[tokio::main]
async fn main() {
    let server = service::Service::create_server();
    let _res = Server::builder()
        .add_service(server)
        .serve("0.0.0.0:8000".parse().unwrap())
        .await;
}
