#! /bin/bash

PATH=${PATH}:${PWD}/.bin/ protoc -I=../proto/ tower.proto \
    --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./src/proto/ \
    --js_out=import_style=commonjs:./src/proto/
