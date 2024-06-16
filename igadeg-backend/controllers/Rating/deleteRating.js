// to connect with collections 
const Rating = require('../../models/Rating');

// to check body parameters 
const {validationResult} = require('express-validator');

const deleteRating = async(req,res) => {
    try{

        console.log("ok");
        // check whether appropriate parameters are provided in body or not 
        const validError = validationResult(req);
        if(!validError.isEmpty()){
            return res.status(400).json({error: validError.array(), signal: "red"});
        }

        // delete Rating if it exists 
        const rating = await Rating.findOneAndDelete(
            {product_id: req.body.product_id}
        );

        // if rating not exists 
        if(!rating){
            return res.status(400).json({error:"Rating document not exists", signal: "red"});
        }

        // all gone well 
        return res.json({rating:rating, signal: "green"});
    }catch(e){
        console.log(e);
        return res.status(500).json({error: "Internal sever error", signal: "red"});
    }
};

module.exports = deleteRating;
