"use strict";
function welcomeuser(user) {
    return "Hello " + user.firstname + " " + user.lastname + " - Welcome to SPFx Training";
}
var username = { firstname: "Jenkins", lastname: "NS" };
var userdata = welcomeuser(username);
console.log(userdata);
