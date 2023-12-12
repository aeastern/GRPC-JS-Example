const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('example.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const examplePackage = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
server.addService(examplePackage.Employee.service, {
    paySalary: (call, callback) => {
        const request = call.request;
        console.log('Received request: ' + JSON.stringify(request));
        const response = { message: 'Salary paid successfully' };
        callback(null, response);
    },
});

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
        console.error('Failed to start server:', error);
    } else {
        console.log('Server started on port:', port);
        server.start();
    }
});