function createNotificationService(){
    const notifications = new Map();
    let nextId = 1;

    function createNotification({orderId, email} = {}){
        const notification = {
            id: nextId++,
            orderId,
            email,
            status: 'SIMULATED',
            createdAt: new Date().toISOString()
        };
        notifications.set(notification.id, notification);
        return {...notification};
    }

    function findAll(){
        return [...notifications.values()].map(notification => ({...notification}));
    }


    return { createNotification, findAll};
}

module.exports = {createNotificationService};