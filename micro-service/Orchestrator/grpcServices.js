const grpc = require('@grpc/grpc-js');
const { createStockClient, createOrderClient, createNotificationClient } = require('./grpcClientCreation');

const stockClient = createStockClient();
const orderClient = createOrderClient();
const notificationClient = createNotificationClient();

function call(client, method, request, traceId) {
    const metadata = new grpc.Metadata();
    if (traceId) metadata.set('x-trace-id', traceId);
    return new Promise((resolve, reject) => {
        client[method](request, metadata, (error, response) => {
            if (error) return reject(error);
            if (!response.success) return reject(new Error(response.message || `${method} a échoué`));
            resolve(response);
        });
    });
}

exports.reserveStock = (request, traceId) => call(stockClient, 'reserveStock', request, traceId);
exports.createOrder = (request, traceId) => call(orderClient, 'createOrder', request, traceId);
exports.createNotification = (request, traceId) => call(notificationClient, 'createNotification', request, traceId);
