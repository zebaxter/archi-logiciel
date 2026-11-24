const UserRepository = require("../application/port/UserRepository");
const User = require("../domain/User");

class InMemoryUserRepository extends UserRepository{
    constructor(){
        super();
        this.users = new Map([
            [1, new User(1,"Jean","Dupont")]
        ]);
    }

    async findById(id){
        const user = this.users.get(id);

        if(!user){
            return null;
        }

        return new User(
            user.id,
            user.firstname,
            user.lastname
        );
    }

    async save(user){
        this.users.set(
            user.id,
            new User(user.id, user.firstname, user.lastname)
        );
    }
}

module.exports = InMemoryUserRepository;