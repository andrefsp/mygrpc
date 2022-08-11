const {CreatePointRequest, CreatePointResponse, Point} = require('./proto/tower_pb.js');
const {MyTowerServiceClient} = require('./proto/tower_grpc_web_pb.js');


export function makeCall() {
    var towerService = new MyTowerServiceClient('http://127.0.0.1:8000');

    let point = new Point();
    point.setX(1.0);
    point.setY(2.0);

    let request = new CreatePointRequest();
    request.setPoint(point);
    request.setId("123");

    towerService.createPoint(request, {}, function(err, response) {
        console.log(">> err: ", err);
        console.log(">> response: ", response);
    });
}

makeCall();
