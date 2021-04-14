
interface IUser{
    firstname:string;
    lastname:string;
}

function welcomeuser(user:IUser){
    return `Hello ${user.firstname} ${user.lastname} - Welcome to SPFx Training`;
}

const username = {firstname:"Jenkins", lastname:"NS"};
var userdata:string = welcomeuser(username);

console.log(userdata);