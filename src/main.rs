use mygrpc::service;
use tonic::transport::Server;

#[tokio::main]
async fn main() {
    let server = service::Service::create_server();
    let server = tonic_web::enable(server);

    let _res = Server::builder()
        .accept_http1(true)
        .add_service(server)
        .serve("0.0.0.0:8000".parse().unwrap())
        .await;
}
