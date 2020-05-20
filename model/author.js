
const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

const authSchema = new Schema({
	name:String,
	age:Number
});
module.exports = Mongoose.model('Auther',authSchema);