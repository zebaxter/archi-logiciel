const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const definition = protoLoader.loadSync(path.join(__dirname, '../proto/stock.proto'));
const stockProto = grpc.loadPackageDefinition(definition).stock;

function startGrpcServer(service) {
    const server = new grpc.Server();
    server.addService(stockProto.StockService.service, {
        reserveStock(call, callback) {
            const trace = call.metadata.get('x-trace-id')[0] || 'sans-trace';
            console.log(`[Stock] [${trace}] Réservation demandée : produit ${call.request.productId}, quantité ${call.request.quantity}`);
            try {
                const reservation = service.reserveStock(call.request);
                console.log(`[Stock] [${trace}] Réservation ${reservation.id} créée`);
                callback(null, { success: true, reservationId: reservation.id, message: 'Stock réservé' });
            } catch (error) {
                console.error(`[Stock] [${trace}] Échec de la réservation : ${error.message}`);
                callback({ code: grpc.status.FAILED_PRECONDITION, message: error.message });
            }
        }
    });
    server.bindAsync(`0.0.0.0:${process.env.STOCK_GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), (error, port) => {
        if (error) return console.error('Erreur serveur gRPC Stock :', error);
        console.log('Serveur gRPC Stock démarré sur le port : ' + port);
    });
}

module.exports = { startGrpcServer };
