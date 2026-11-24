require('dotenv').config();
const express = require('express');
const { processOrder } = require('./orderWorkflow');

const app = express();
app.use(express.json());

app.post('/orders', async (req, res) => {
    try {
        const result = await processOrder(req.body || {});
        res.status(201).json(result);
    } catch (error) {
        console.error('Échec du processus de commande :', error);
        res.status(error.status || 500).json({ error: error.message });
    }
});

app.listen(process.env.ORCHESTRATOR_PORT, () => {
    console.log('Orchestrateur en écoute sur le port : ' + process.env.ORCHESTRATOR_PORT);
});
