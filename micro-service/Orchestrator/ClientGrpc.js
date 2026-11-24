const grpc = require('@grpc/grpc-js');
const protoloader = require('@grpc/proto-loader');
const path = require('path');
require('dotenv').config();
const {createOrderClient, createStockClient, createNotificationClient} = require('./grpcClientCreation');

stockClient = createStockClient();
orderClient = createOrderClient();
notificationClient = createNotificationClient();

function order(productId, quantity) {
    return new Promise((resolve, reject) => {
        client.reserveStock({ productId, quantity }, (error, response) => {
            if (error) {
                return reject(error);
            }
            resolve(response);
        });
    })
}

module.exports = { reserveStock };