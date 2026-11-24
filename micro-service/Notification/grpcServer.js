const grpc =require('@grpc/grpc-js');
const protoloader = require('@grpc/proto-loader');
const path = require('path');
require('dotenv').config();

const proto = protoloader.loadSync(
    path.join(__dirname, './../proto/notification.proto')
)

const notificationProto = grpc.loadPackageDefinition(proto).notification;

function startGrpcServer(service){
    const server = new grpc.Server();
    server.addService(notificationProto.NotificationService.service, {
        createNotification(call, callback){
            const trace = call.metadata.get('x-trace-id')[0] || 'sans-trace';
            console.log(`[Notification] [${trace}] Notification : traitement demandé`);
            let notification;
            try {
                notification = service.createNotification(call.request);
            } catch (error) {
                console.error(`[Notification] [${trace}] Échec : ${error.message}`);
                return callback({ code: grpc.status.INTERNAL, message: error.message });
            }
            console.log(`[Notification] [${trace}] Notification créée : ${notification.id}`);

            callback(null, {
                success: true,
                notificationId: notification.id,
                message: "Notification envoyée"
            });
        }
    });

    server.bindAsync(
        `0.0.0.0:${process.env.NOTIFICATION_GRPC_PORT}`,
        grpc.ServerCredentials.createInsecure(),
        () => console.log("Serveur gRPC démarré sur le port : " + process.env.NOTIFICATION_GRPC_PORT)
    )
}

module.exports = {startGrpcServer};
