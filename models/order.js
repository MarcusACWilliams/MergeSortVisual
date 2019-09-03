const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var orderSchema = new Schema({

        owner: {
            type: String,
            required: true
        },
        ownerId: {
            type: Number,
            required: true
        },
        items: {
            type: Array,
            required: true
        },
        orderId: {
            type: String,
            required: true
        },
        shippingAddress: {
            type: String,
            required: true
        },
        orderDate: {
            type: Date,
            required: true
        },
        deliveryDate: {
            type: Date,
            required: true,
        },
        qty: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        }



});

module.exports = mongoose.model('order', orderSchema);