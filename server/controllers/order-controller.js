const Order = require('../models/order');
const uuidv4 = require('uuid/v4');

exports.submit = function (req, res) {


    var now = new Date();
    console.log(req.body.total);
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

    });
}

exports.stats = function (req, res) {
    Order.getAll((err, orders) => {

        if (err) return res.status(500).send({ message: 'Error on Server' });

        let stats = {
            custom: 0,
            software: 0,
            password: 0,
            spyware: 0,
            ram: 0,
            tune: 0,
            keyboard: 0,
            disk: 0,
            totalSales: 0
        }

        orders.forEach(element => {
            element['items'].forEach((v, i, a) => {
                stats[v['type']] += 1;
            });
            stats.totalSales += element['total'];

        });

        let writeArray = [
            { name: "Custom Job", quantity: stats.custom },
            { name: "Software Installation", quantity: stats.software },
            { name: "Password Reset", quantity: stats.password },
            { name: "Spyware Removal", quantity: stats.spyware },
            { name: "Ram Upgrade", quantity: stats.ram },
            { name: "Tune-up", quantity: stats.tune },
            { name: "Keyboard Cleaning", quantity: stats.keyboard },
            { name: "Disk Clean-up", quantity: stats.disk },
            { totalSales: stats.totalSales.toFixed(2) }
        ]


        res.status(200).send(writeArray);

    });
}
