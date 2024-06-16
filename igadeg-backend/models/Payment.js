const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PaymentSchema = new Schema({
    order_id: {
        type: mongoose.Types.ObjectId,
        // first payment will be perform so at that moment orderf_id will not be available
        // once order is confirm will provide a way to add order_id  
        // required: true
    },
    customer_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    session_id: {
        type: String,
    },
    method: {
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
        default: "Pending"
    },
    country: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

module.exports = model("Payment", PaymentSchema);

// payments = {
//     orderId,
//     userId,
//     payments,
//     date,
//     month,
//     year
// }