const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

function createClient(file, packageName, serviceName, port) {
    const definition = protoLoader.loadSync(path.join(__dirname, '../proto', file));
    const Service = grpc.loadPackageDefinition(definition)[packageName][serviceName];
    return new Service(`localhost:${port}`, grpc.credentials.createInsecure());
}

exports.createStockClient = () => createClient('stock.proto', 'stock', 'StockService', process.env.STOCK_GRPC_PORT);
exports.createOrderClient = () => createClient('order.proto', 'order', 'OrderService', process.env.ORDER_GRPC_PORT);
exports.createNotificationClient = () => createClient('notification.proto', 'notification', 'NotificationService', process.env.NOTIFICATION_GRPC_PORT);
