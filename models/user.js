const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({

        firstName: {
            type: String,
            required: true
        },        
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        id: {
            type: Number,
            required: true
        },
        orders: {
            type: Array,
            required:true
        }


        
});

module.exports = mongoose.model('user', userSchema);