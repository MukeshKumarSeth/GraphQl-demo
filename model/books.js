
const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;
// const itemShema = new Schema({
// 	item : String,
// 	qty : Number
// });

const bookSchema = new Schema({
	name:String,
	genre:String,
	authorId:String
});
module.exports = Mongoose.model('Book',bookSchema);