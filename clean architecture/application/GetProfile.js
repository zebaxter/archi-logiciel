class GetProfile{
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async execute(id){
        const user = await this.userRepository.findById(id);

        if(!user){
            return null;
        }

        return {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname
        }
    }
}

module.exports = GetProfile;