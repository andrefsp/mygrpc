/**
 * @fileoverview gRPC-Web generated client stub for mytowerproto
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.mytowerproto = require('./tower_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.mytowerproto.MyTowerServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.mytowerproto.MyTowerServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.mytowerproto.CreatePointRequest,
 *   !proto.mytowerproto.CreatePointResponse>}
 */
const methodDescriptor_MyTowerService_CreatePoint = new grpc.web.MethodDescriptor(
  '/mytowerproto.MyTowerService/CreatePoint',
  grpc.web.MethodType.UNARY,
  proto.mytowerproto.CreatePointRequest,
  proto.mytowerproto.CreatePointResponse,
  /**
   * @param {!proto.mytowerproto.CreatePointRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.mytowerproto.CreatePointResponse.deserializeBinary
);


/**
 * @param {!proto.mytowerproto.CreatePointRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.mytowerproto.CreatePointResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.mytowerproto.CreatePointResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.mytowerproto.MyTowerServiceClient.prototype.createPoint =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/mytowerproto.MyTowerService/CreatePoint',
      request,
      metadata || {},
      methodDescriptor_MyTowerService_CreatePoint,
      callback);
};


/**
 * @param {!proto.mytowerproto.CreatePointRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.mytowerproto.CreatePointResponse>}
 *     Promise that resolves to the response
 */
proto.mytowerproto.MyTowerServicePromiseClient.prototype.createPoint =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/mytowerproto.MyTowerService/CreatePoint',
      request,
      metadata || {},
      methodDescriptor_MyTowerService_CreatePoint);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.mytowerproto.ListPointsRequest,
 *   !proto.mytowerproto.ListPointsResponse>}
 */
const methodDescriptor_MyTowerService_ListPoints = new grpc.web.MethodDescriptor(
  '/mytowerproto.MyTowerService/ListPoints',
  grpc.web.MethodType.UNARY,
  proto.mytowerproto.ListPointsRequest,
  proto.mytowerproto.ListPointsResponse,
  /**
   * @param {!proto.mytowerproto.ListPointsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.mytowerproto.ListPointsResponse.deserializeBinary
);


/**
 * @param {!proto.mytowerproto.ListPointsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.mytowerproto.ListPointsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.mytowerproto.ListPointsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.mytowerproto.MyTowerServiceClient.prototype.listPoints =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/mytowerproto.MyTowerService/ListPoints',
      request,
      metadata || {},
      methodDescriptor_MyTowerService_ListPoints,
      callback);
};


/**
 * @param {!proto.mytowerproto.ListPointsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.mytowerproto.ListPointsResponse>}
 *     Promise that resolves to the response
 */
proto.mytowerproto.MyTowerServicePromiseClient.prototype.listPoints =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/mytowerproto.MyTowerService/ListPoints',
      request,
      metadata || {},
      methodDescriptor_MyTowerService_ListPoints);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.mytowerproto.StreamPointsRequest,
 *   !proto.mytowerproto.Point>}
 */
const methodDescriptor_MyTowerService_StreamPoints = new grpc.web.MethodDescriptor(
  '/mytowerproto.MyTowerService/StreamPoints',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.mytowerproto.StreamPointsRequest,
  proto.mytowerproto.Point,
  /**
   * @param {!proto.mytowerproto.StreamPointsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.mytowerproto.Point.deserializeBinary
);


/**
 * @param {!proto.mytowerproto.StreamPointsRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.mytowerproto.Point>}
 *     The XHR Node Readable Stream
 */
proto.mytowerproto.MyTowerServiceClient.prototype.streamPoints =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/mytowerproto.MyTowerService/StreamPoints',
      request,
      metadata || {},
      methodDescriptor_MyTowerService_StreamPoints);
};


/**
 * @param {!proto.mytowerproto.StreamPointsRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.mytowerproto.Point>}
 *     The XHR Node Readable Stream
 */
proto.mytowerproto.MyTowerServicePromiseClient.prototype.streamPoints =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/mytowerproto.MyTowerService/StreamPoints',
      request,
      metadata || {},
      methodDescriptor_MyTowerService_StreamPoints);
};


module.exports = proto.mytowerproto;

