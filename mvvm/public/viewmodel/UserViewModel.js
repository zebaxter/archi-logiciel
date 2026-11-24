export class UserViewModel extends EventTarget{
    constructor(user){
        super();
        this.user = user;
    }

    get firstname(){
        return this.user.firstname;
    }

    get lastname(){
        return this.user.lastname;
    }

    get fullname(){
        return `${this.user.firstname} ${this.user.lastname}`;
    }

    updateProfile(firstname, lastname){
        this.user.firstname = firstname;
        this.user.lastname = lastname;

        this.dispatchEvent(new Event("change"));
    }
}