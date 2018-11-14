var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({

  username: String,
  password: String,
  id: String,
  fName: String,
  lName: String,
  email: String,
  phone: String,
  address: String,
  role: String,
  dateCreated: String,
  dateUpdated: String

}

  , { collection: 'users' });



const User = (module.exports = mongoose.model('User', userSchema));

module.exports.register = (user, callback) => {
  user.save(callback);
}

module.exports.getByUsername = (username, callback) => {
  var query = { username: username };
  User.findOne(query, callback);
};

module.exports.getById = (id, callback) => {
  var query = { id: id };
  User.findOne(query, callback);
};

module.exports.getAll = (callback) => {
  var query = {};
  User.find(query, { password: 0 }, callback);
};


