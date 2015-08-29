var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userService = require('../services/user-services');

var statsSchema = new Schema({
   username: {type: String},
   date: {type: String},
   pushups: {type: Number}
});

var Stats = mongoose.model('Stats', statsSchema);

module.exports = {
    Stats: Stats
};