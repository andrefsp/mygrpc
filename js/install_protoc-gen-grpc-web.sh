#! /bin/bash 

dest=.bin/protoc-gen-grpc-web

mkdir -p .bin

if [ -f ${dest} ]; then
    exit 0;
fi;

wget https://github.com/grpc/grpc-web/releases/download/1.3.1/protoc-gen-grpc-web-1.3.1-linux-x86_64 -O $dest
