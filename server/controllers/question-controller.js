var path = require('path');
const uuidv4 = require('uuid/v4');
const Question = require('../models/question');

exports.addQuestion = function (req, res) {

    let now = new Date();

    let question = new Question({
        id: uuidv4(),
        question: req.body.question,
        createdById: req.userId,
        dateCreated: now
    });

    Question.add(question, function (err, question) {

        if (err) return res.status(500).send({ "message": "Couldn't Add Question", completed: "false" });

        return res.status(200).send({ "message": "Question Added", completed: "true", question: question });

    });

}

exports.getQuestions = function (req, res) {

    Question.getAll(function (err, questions) {

        if (err) return res.status(500).send({ "message": "Couldn't Get Questions", completed: "false" });

        return res.status(200).send({ "message": "Questions Retrieved", completed: "true", questions: questions });

    });

}

exports.delete = function (req, res) {

    Question.deleteMany({ id: req.params.id }, function (err) {
        if (err) return res.status(500).send({ message: "Unable to Delete Question", completed: false });
        return res.status(200).send({ message: "Question Deleted", completed: true });
    })

}