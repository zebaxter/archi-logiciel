const express = require('express');
const { createOrderService } = require('./service');
const { startGrpcServer } = require('./grpcServer');
require('dotenv').config();

const app = express();
const service = createOrderService();
startGrpcServer(service);

app.use(express.json());

app.get('/health', (req,res) => res.json({
    service: "order-service", status: 'ok'
}));

app.get('/orders', (req,res) => res.json(service.findAll()));
app.get('/orders/:id', (req,res) => res.json(service.findById(Number(req.params.id))));
app.post('/orders', (req,res) => res.status(201).json(service.createOrder(req.body)));

app.listen(process.env.ORDER_PORT, ()=>{
    console.log("Service Order en écoute sur le port : " + process.env.ORDER_PORT);
});
