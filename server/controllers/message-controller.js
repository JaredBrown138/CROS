const Message = require('../models/message');
const uuidv4 = require('uuid/v4');

exports.send = function (req, res) {

    var now = new Date();

    var newMessage = new Message({
        id: uuidv4(),
        message: req.body.items,
        subject: req.body.subject,
        name: req.body.name,
        dateCreated: now,
        email: req.body.email,
        read: false
    });

    Message.add(newMessage, (err, message) => {

        if (err) return res.status(500).send({ "message": "Could Not Send Message!" });


        res.status(200).send({ "message": "Message Sent!", completed: "true" })

    });
}

exports.read = function (req, res) {

    Message.getById(req.body.id, function (err, message) {

        if (err) return res.status(500).send({ "message": "Unable to save read!", completed: false });

        message.set({
            read: true
        });

        message.save(function (err, updatedMessage) {
            if (err) return res.status(200).send({ "message": "Unable to save read!", completed: false });
            res.status(200).send({ "message": "Saved read!", completed: true });

        });

    });
}


exports.list = function (req, res) {

    Message.getAll((err, messages) => {

        if (err) return res.status(500).send({ message: 'Error on Server' });

        res.status(200).send(messages);

    })
}