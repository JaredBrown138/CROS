var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({

    id: String,
    items: Array,
    createdById: String,
    dateCreated: String,
    total: Number

}

    , { collection: 'orders' });

const Order = (module.exports = mongoose.model('Order', orderSchema));

module.exports.add = (order, callback) => {
    order.save(callback);
}

module.exports.getById = (id, callback) => {
    var query = { id: id };
    Order.findOne(query, callback);
};

module.exports.getAll = (callback) => {
    var query = {};
    Order.find(query, callback);
};