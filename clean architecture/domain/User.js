class User {
    constructor(id, firstname, lastname) {
        this.id = id;
        this.changeName(firstname, lastname)
    }

    changeName(firstname, lastname) {
        if (typeof firstname !== "string") {
            throw new Error('Le prénom doit être une chaine de caractères');
        }
        if (typeof lastname !== "string") {
            throw new Error('Le nom doit être une chaine de caractères');
        }

        if(firstname.trim().length <=2){
            throw new Error('Le prénom doit comporter au moins 3 caractères');
        }
        if(lastname.trim().length <=2){
            throw new Error('Le nom doit comporter au moins 3 caractères');
        }

        this.firstname = firstname;
        this.lastname = lastname;
    }
}

module.exports = User;