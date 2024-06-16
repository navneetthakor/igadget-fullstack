const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const RatingSchema = new Schema({
   product_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    unique: true
   },
   review: [
    {
        customer_id:{
            type: mongoose.Types.ObjectId,
            required: true,
        },
        rate: {
            type: Number,
            required: true
        },
        desc: {
            type: String,
            required: true
        }
    }
   ]
});

module.exports = model("Rating", RatingSchema);


// ratings = {
//     productId,
//     review: [
//         {
//             userId,
//             rate: "1 to 5 stars",
//             desc,
//         }
//     ]
// }
