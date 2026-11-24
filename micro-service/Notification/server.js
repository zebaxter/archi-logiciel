const express = require('express');
const { createNotificationService } = require('./service');
const { startGrpcServer } = require('./grpcServer');
require('dotenv').config();

const app = express();
const service = createNotificationService();
startGrpcServer(service);

app.use(express.json());

app.get('/health', (req,res) => res.json({
    service: "notification-service", status: 'ok'
}));

app.get('/notifications', (req,res) => res.json(service.findAll()));
app.post('/notifications', (req,res) => res.status(201).json(service.createNotification(req.body)));

app.listen(process.env.NOTIFICATION_PORT, ()=>{
    console.log("Service notification en écoute sur le port : " + process.env.NOTIFICATION_PORT);
});
