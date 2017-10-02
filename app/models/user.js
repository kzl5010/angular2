const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String
});

const TUser = mongoose.model('TestUsers', userSchema);

const tester = new TUser ({
  email: "test",
  password: "test"
});

tester.save(function (err) {if (err) console.log('Error')});

module.exports = mongoose.model('User', userSchema);
