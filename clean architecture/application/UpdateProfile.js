class UpdateProfile {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(id, firstname, lastname) {
        const user = await this.userRepository.findById(id);

        if (!user) {
            return null;
        }

        user.changeName(firstname, lastname);

        await this.userRepository.save(user);

        return {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname
        }
    }
}

module.exports = UpdateProfile;