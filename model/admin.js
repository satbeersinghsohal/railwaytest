var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Admin = new Schema({
    name: String,
    email: String,
    password: String,
    trains:{
        train1: String,
        train2: String,
        train2: String
    }
});

module.exports = mongoose.model('admin', Admin);