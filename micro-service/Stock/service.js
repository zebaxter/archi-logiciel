function createStockService() {
    const products = new Map([
        [1, { productId: 1, name: "Clavier", available: 10 }],
        [2, { productId: 2, name: "Souris", available: 5 }],
        [3, { productId: 3, name: "Ecran", available: 15 }]
    ]);
    const reservations = new Map();
    let nextReservationId = 1;

    function getAllStock() {
        return [...products.values()].map(product => ({ ...product }));
    }

    function getStockById(productId) {
        const product = products.get(productId);
        return product ? { ...product } : null;
    }

    function getReservation() {
        return [...reservations.values()].map(reservation => ({ ...reservation }));
    }

    function reserveStock({ productId, quantity }) {
        if(quantity <=0){
            throw new Error('La quantité doit être supérieur à 0');
        }

        const product = products.get(productId);
        if(!product){
            throw new Error('Produit introuvable');
        }
        if(product.available < quantity){
            throw new Error('Stock insuffisant');
        }

        product.available -= quantity;

        const reservation = {
            id: nextReservationId++,
            productId,
            quantity,
            status: "RESERVED",
            createdAt: new Date().toISOString()
        };
        reservations.set(reservation.id, reservation);
        return {...reservation};
    }

    return {getAllStock, getStockById, getReservation, reserveStock};
}

module.exports = {createStockService};