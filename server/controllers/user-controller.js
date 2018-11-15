const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../helpers/config');
const uuidv4 = require('uuid/v4');

exports.register = function (req, res) {
    console.log(req.body);
    var pswdHash = bcrypt.hashSync(req.body.password, 8);
    var now = new Date();

    var userToRegister = new User({
        id: uuidv4(),
        username: req.body.username,
        password: pswdHash,
        email: req.body.email,
        address: req.body.address,
        fName: req.body.fName,
        lName: req.body.lName,
        phone: req.body.phone,
        role: 'user',
        dateCreated: now,
        dateUpdated: now
    });

    User.register(userToRegister, (err, user) => {

        if (err) return res.status(500).send({ "message": "Couldn't Register User" });


        res.status(200).send({ "message": "User Successfully Saved" })

    });
}

exports.update = function (req, res) {

    User.getById(req.body.id, function (err, user) {

        if (err) res.status(200).send({ "message": "Unable to update user!", completed: false });

        if (req.userId == req.body.id) {
            if (req.body.role != 'admin') {
                res.status(200).send({ "message": "Can't downgrade your own role!", completed: false });
                return;
            }
        }

        let updatedDate = new Date();

        user.set({
            fName: req.body.fName,
            lName: req.body.lName,
            role: req.body.role,
            phone: req.body.phone,
            address: req.body.address,
            email: req.body.email,
            dateUpdated: updatedDate
        });

        user.save(function (err, updatedUser) {
            if (err) res.status(200).send({ "message": "Unable to update user!", completed: false });
            res.status(200).send({ "message": "User Successfully updated", completed: true });

        });

    });
}

exports.login = function (req, res) {

    User.getByUsername(req.body.username, function (err, user) {

        if (err) return res.status(500).send({ message: 'Error on Server' });

        if (!user) return res.status(200).send({ message: 'Invalid Username or Password!' });

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) return res.status(200).send({ message: "Invalid Username or Password!" });

        var token = jwt.sign({ id: user.id }, config.web.secret, {
            expiresIn: 86400
        });

        res.status(200).send({
            auth: true,
            token: token,
            username: user.name,
            role: user.role,
        });
    });

}

exports.list = function (req, res) {

    User.getAll((err, users) => {

        if (err) return res.status(500).send({ message: 'Error on Server' });

        res.status(200).send(users);

    })
}

exports.delete = function (req, res) {
    if (req.userId == req.params.id) {
        res.status(200).send({ message: "Can't Delete Yourself", completed: false });
    } else {
        User.deleteMany({ id: req.params.id }, function (err) {
            if (err) res.status(200).send({ message: "Unable to Delete User", completed: false });
            res.status(200).send({ message: "User Deleted", completed: true });
        })
    }
}