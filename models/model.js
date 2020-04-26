const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const ItemSchema = new Schema({
    name: {
        type: 'String',
        required: true
    },
    email: {
        type: 'string', 
        required: true
    },
    mobile: {
        type: 'string',
        required: false
    }
})

const Model = mongoose.model('employeeData', ItemSchema, 'employeeData');
module.exports = Model;