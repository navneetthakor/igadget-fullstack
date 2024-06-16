const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const AdminSchema = new Schema({
    image: {
        type: String
    },
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

module.exports = model("Admin", AdminSchema);



// image, 
//     name,
//     email, /*(unique)*/
//     password,
//     mobile,
//     date,