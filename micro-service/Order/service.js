function createOrderService(){
    const orders = new Map();
    let nextId = 1;

    function createOrder({productId, quantity, email} = {}){
        const order = {
            id: nextId++,
            productId,
            quantity,
            email,
            status: 'STOCK_RESERVED',
            createdAt: new Date().toISOString()
        };
        orders.set(order.id, order);
        return {...order};
    }

    function findAll(){
        return [...orders.values()].map(order => ({...order}));
    }

    function findById(id){
        const order = orders.get(id);
        return order? {...order}:null;
    }

    return { createOrder, findAll, findById};
}

module.exports = {createOrderService};
