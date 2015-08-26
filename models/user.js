var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userService = require('../services/user-services');

var userSchema = new Schema({
   username: {type: String, required: 'Please Enter Your Username'}, 
   email: {type: String, required: 'Please Enter Your Email'},
   password: {type: String, required: 'Please Enter Your Email Address'},
   created: {type: Date, default: Date.now()}
});

userSchema.path('username').validate(function(value, next){
    userService.findUser(value, function(err, user) {
       if (err) {
           console.log(err);
           return next(false);
       }
       next(!user);
    });
}, 'This Username is Already in Use');

var User = mongoose.model('User', userSchema);

module.exports = {
    User: User
};