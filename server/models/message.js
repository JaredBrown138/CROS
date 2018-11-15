var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({

    id: String,
    message: String,
    name: String,
    dateCreated: String,
    email: String,
    read: Boolean,
    subject: String,

}
    , { collection: 'messages' });

const Message = (module.exports = mongoose.model('Message', messageSchema));

module.exports.add = (message, callback) => {
    message.save(callback);
}

module.exports.getById = (id, callback) => {
    var query = { id: id };
    Message.findOne(query, callback);
};

module.exports.getAll = (callback) => {
    var query = {};
    Message.find(query, callback);
};