var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Passenger = new Schema({
    name: String,
    email: String,
    password: String,
    balance: String,
    passengername: String,
    title: String,
    age:String,
    from:String,
    to: String
});

module.exports = mongoose.model('Passenger', Passenger);