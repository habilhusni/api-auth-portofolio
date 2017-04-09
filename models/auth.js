var mongoose = require(mongoose)
var Schema = mongoose.Schema;
// var Users = require('./user');

var authSchema = new Schema({
	name: String,
	email: String,
	password: String
	// available_at: [{type: Schema.Types.ObjectId, ref:'Restaurants'}]
});

var Auth = mongoose.model('Auth', authSchema);

module.exports = Auth;