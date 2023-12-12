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

const client = new examplePackage.Employee('localhost:50051', grpc.credentials.createInsecure());
const request = { employeIdList: [1, 2, 3] };

client.paySalary(request, (error, response) => {
	if (error) {
		console.error('Error:', error);
	} else {
		console.log('Response:', response);
	}
});