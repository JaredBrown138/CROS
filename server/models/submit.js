var mongoose = require('mongoose');

var submissionSchema = new mongoose.Schema({
    title: String,
    version: String,
    quizId: String,
    score: Number,
    dateCompleted: String,
    answers: Array,
    employeeId: String

}, { collection: 'completedQuizzes' });

const Submission = (module.exports = mongoose.model('Submission', submissionSchema));

