const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CartSchema = new Schema({
    customer_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    cart_prods: [
        {
            product_id: {
                type: mongoose.Types.ObjectId,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    fav_prods: [
        {
            product_id: {
                type: mongoose.Types.ObjectId,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
})


module.exports = model("Cart", CartSchema);



// cart = {
//     customer_id,
//     Cart_prods : [
//         {
//             id: "product id",
//             quantity: "enter quantity"
//         }
//     ],
//     Fav_prods : [
//         {
//             id: "product id",
//             quantity: "enter quantity"
//         }
//     ]
// }