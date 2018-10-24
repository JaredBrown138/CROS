var mongoose = require('mongoose');
var quizSchema = new mongoose.Schema({

}, { collection: 'quizzes' });

const Quiz = (module.exports = mongoose.model('Quiz', quizSchema));

module.exports.getById = (quizId, callback) => {
  Quiz.findOne({ "quizId": quizId }, callback);
};

module.exports.getAll = (callback) => {
  var query = {};
  Quiz.find(query, callback);
};
