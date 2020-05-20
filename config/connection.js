

const Mongoose = require('mongoose');

module.exports =Mongoose.connect("mongodb://localhost:27017/user",{useNewUrlParser:true});