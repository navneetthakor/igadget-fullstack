const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const OrderSchema = new Schema({
    products: [
        {
            product_Id: {
                type: mongoose.Types.ObjectId,
                required: true
            },
            quantity:{
                type: Number,
                require: true
            }
        }
    ],
    customer_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    payment_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Confirm"
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        city:{
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        }
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

module.exports = model("Order", OrderSchema);

// orders = {
//     prodcutIds : ["array of products with quantity"],
//     userId,
//     address,
//     paymentId,
//     status,
//     date,
// }