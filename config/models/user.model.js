var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String, required: true, trim: true}, 
    email: {type: String, unique: true, },
    apps: [String],
    userLevel: {type: Number}, 
    
    hash: {type: String, required: true}, 
    salt: {type: String, required: true},

})

const User = mongoose.model('User', userSchema)
module.exports = User

