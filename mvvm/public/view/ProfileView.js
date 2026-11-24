import { User } from "../model/User.js";
import { UserViewModel } from "../viewmodel/UserViewModel.js";

const user = new User('Jean','Dupont');
const vm = new UserViewModel(user);

const navUser = document.querySelector('#user');
const firstname = document.querySelector('#firstname');
const lastname = document.querySelector('#lastname');

firstname.value = vm.firstname;
lastname.value = vm.lastname;

function render(){
    navUser.innerHTML = vm.fullname;
}

vm.addEventListener('change', render);

firstname.addEventListener('input', update);
lastname.addEventListener('input', update);

function update(){
    vm.updateProfile(firstname.value,lastname.value);
}

render();