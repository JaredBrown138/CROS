var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({

    id: String,
    question: String,
    createdById: String,
    dateCreated: String,

}

    , { collection: 'security-questions' });

const Question = (module.exports = mongoose.model('Question', questionSchema));

module.exports.add = (question, callback) => {
    question.save(callback);
}

module.exports.getById = (id, callback) => {
    var query = { id: id };
    Question.findOne(query, callback);
};

module.exports.getAll = (callback) => {
    var query = {};
    Question.find(query, callback);
};