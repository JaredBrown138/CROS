const Order = require('../models/order');
const uuidv4 = require('uuid/v4');

exports.submit = function (req, res) {


    var now = new Date();

    var newOrder = new Order({
        id: uuidv4(),
        items: req.body.items,
        dateCreated: now,
        createdById: req.userId,
        total: req.body.total
    });

    Order.add(newOrder, (err, order) => {

        if (err) return res.status(500).send({ "message": "Couldn't Submit Order" });


        res.status(200).send({ "message": "Order Submitted", completed: "true" })

    });
}


exports.list = function (req, res) {

    Order.getAll((err, orders) => {

        if (err) return res.status(500).send({ message: 'Error on Server' });

        res.status(200).send(orders);

    })
}
