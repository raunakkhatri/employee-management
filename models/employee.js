const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const employeeSchema = new Schema({
    employeeId:{
        type: String,
        required: true,
        unique: true,
        indexes: true
    },
    firstName: {
        type: String,
        required: true,
        minlength: 1,
        maxlenght:10,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1,
        maxlenght:10,
    },
    middleName: {
        type: String,
        minlength: 1,
        maxlenght:10,
    },
    gender: {
        type: String,
        enum: ['M','F'],
        required: true
    },
    mobileNumber:{
        type: String,
        required: true,
        unique: true, 
        index: true,
        max: 10
    },
    dateOfBirth:{
        type: Date,
        required: true, 
        max: Date.now()
    },
    personalEmail:{
        type: String, 
        required: true, 
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'is invalid'], 
        unique: true,
        index: true
    }

})

module.exports = mongoose.model('employee', employeeSchema);
