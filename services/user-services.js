var bcrypt = require('bcrypt');
var User = require("../models/user").User;
var Stats = require("../models/stats").Stats;
var config = require("../config");

exports.addUser = function(user, next) {
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
            return next(err);
        }
        var newUser = new User({
        username: user.username.toLowerCase(),
        email: user.email.toLowerCase(),
        password: hash
        });
    
        newUser.save(function(err) {
           if (err) {
               return next(err);
           } 
           next(null);
        });
    });
    
};

exports.addStats = function(type, quantity, date, next) {
    // adds a certain qunatity of reps for an excercise (e.g. pushups)
}

exports.findStats = function(user, date, next) {
    Stats.findOne({$and: [{date: config.getCurrentDate()}, {username: user}]}, function(err, statistics){
        next(err, statistics);
    });  
};

exports.findUser = function(username, next) {
    User.findOne({username: username.toLowerCase()}, function(err, user){
        next(err, user);    
    });   
};