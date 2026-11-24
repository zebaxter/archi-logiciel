const express = require('express');
const { createStockService } = require('./service');
require('dotenv').config();
const { startGrpcServer } = require('./grpcServer');

const app = express();
const service = createStockService();

startGrpcServer(service);

app.use(express.json());

app.get('/health', (req,res) => res.json({
    service: "stock-service", status: 'ok'
}));

app.get('/stock', (req,res) => res.json(service.getAllStock()));
app.get('/stock/:productId', (req,res) => res.json(service.getStockById(Number(req.params.productId))));
app.get('/reservations',(req,res) => res.json(service.getReservation()));
app.post('/reservations',(req,res) => res.json(service.reserveStock(req.body)));

app.listen(process.env.STOCK_PORT, ()=>{
    console.log("Service Order en écoute sur le port : " + process.env.STOCK_PORT);
});