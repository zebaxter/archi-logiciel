const grpc =require('@grpc/grpc-js');
const protoloader = require('@grpc/proto-loader');
const path = require('path');
require('dotenv').config();

const proto = protoloader.loadSync(
    path.join(__dirname, './../proto/order.proto')
)

const orderProto = grpc.loadPackageDefinition(proto).order;

function startGrpcServer(service){
    const server = new grpc.Server();
    server.addService(orderProto.OrderService.service, {
        createOrder(call, callback){
            const trace = call.metadata.get('x-trace-id')[0] || 'sans-trace';
            console.log(`[Order] [${trace}] Commande : traitement demandé`);
            let order;
            try {
                order = service.createOrder(call.request);
            } catch (error) {
                console.error(`[Order] [${trace}] Échec : ${error.message}`);
                return callback({ code: grpc.status.INTERNAL, message: error.message });
            }
            console.log(`[Order] [${trace}] Commande créée : ${order.id}`);

            callback(null, {
                success: true,
                orderId: order.id,
                message: "Commande enregistrée"
            });
        }
    });

    server.bindAsync(
        `0.0.0.0:${process.env.ORDER_GRPC_PORT}`,
        grpc.ServerCredentials.createInsecure(),
        () => console.log("Serveur gRPC démarré sur le port : " + process.env.ORDER_GRPC_PORT)
    )
}

module.exports = {startGrpcServer};