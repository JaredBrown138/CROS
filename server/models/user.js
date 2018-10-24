var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  employeeId: String,
  name: String,
  isAdmin: Boolean,
  quizzesCompleted: Number,
  avgScore: Number
}, { collection: 'users' });
const User = (module.exports = mongoose.model('User', userSchema));
module.exports.getById = (employeeId, callback) => {
  var query = { employeeId: employeeId };
  User.findOne(query, callback);
};
module.exports.getAll = (callback) => {
  var query = {};
  User.find(query, callback);
};
