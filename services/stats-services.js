var config = require('../config.js');
var mongojs = require("mongojs");
var db = mongojs(config.statsUri, ["statistics"]);

exports.findStats =  function(username, next){
    db.statistics.find({date: config.getCurrentDate()}, function(err, doc){
        if (err){
          return next(err, null);
        }
        if (JSON.stringify(doc) == "[]"){
          return next(null, null);
        }
        return next(null, doc);
      });
};

exports.addPushups = function(dateInput, quantity, next) {
    db.statistics.update({date: dateInput}, {$inc: {pushups: quantity}}, function(err, doc){
       if (err) {
           return next(err);
       }
       return next(null, doc);
    });
};