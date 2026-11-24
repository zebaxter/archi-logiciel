const { randomUUID } = require('crypto');
const { reserveStock, createOrder, createNotification } = require('./grpcServices');

async function processOrder({ productId, quantity, email }) {
    const traceId = randomUUID();
    const log = message => console.log(`[Orchestrator] [${traceId}] ${message}`);
    let step = 'réservation du stock';
    log(`Début : produit ${productId}, quantité ${quantity}`);
    try {
        log('Réservation du stock');
        const reservation = await reserveStock({ productId, quantity }, traceId);
        log(`Stock réservé : réservation ${reservation.reservationId}`);
        step = 'création de la commande';
        log('Création de la commande');
        const order = await createOrder({ productId, quantity, email }, traceId);
        log(`Commande créée : ${order.orderId}`);
        step = 'notification client';
        log(`Création de la notification client pour la commande ${order.orderId}`);
        const customerNotification = await createNotification({ orderId: order.orderId, email }, traceId);
        log(`Notification client créée : ${customerNotification.notificationId}`);
        step = 'notification administrateur';
        log(`Création de la notification administrateur pour la commande ${order.orderId}`);
        const adminNotification = await createNotification({ orderId: order.orderId, email: process.env.ADMIN_EMAIL }, traceId);
        log(`Notification administrateur créée : ${adminNotification.notificationId}`);
        log('Processus terminé');
        return { reservation, order, customerNotification, adminNotification };
    } catch (error) {
        console.error(`[Orchestrator] [${traceId}] Échec à l’étape « ${step} » : ${error.message}`);
        throw error;
    }
}

module.exports = { processOrder };
