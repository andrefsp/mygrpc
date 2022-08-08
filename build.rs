fn main() {
    tonic_build::configure()
        .out_dir("./proto/src")
        .compile(&["proto/tower.proto"], &["proto/"])
        .unwrap_or_else(|e| panic!("Failed to compile protos {:?}", e));
}
