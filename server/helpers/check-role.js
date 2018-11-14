const User = require('../models/user');

function checkRole(req, res, next) {

    let userId = req.userId;

    User.getById(userId, (err, user) => {

        if (err) return res.status(500).send({ message: "Error while checking authorization" });

        if (user.role != "admin") return res.status(403).send({ message: "Not Authorized" });

        next();

    });
}
module.exports = checkRole;