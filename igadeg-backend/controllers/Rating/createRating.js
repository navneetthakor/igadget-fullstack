// to connect with collections 
const Product = require('../../models/Product');
const Rating = require('../../models/Rating');

// to valid parameters provided in body 
const {validationResult} = require('express-validator');

const createRating = async(req,res) => {
    try{
        // check validation of the parameters provided in body 
        const validError = validationResult(req);
        if(!validError.isEmpty()){
            return res.status(401).json({error: "please provide valid parameters", signal: "red"});
        }

        // check whether product exist or not 
        const prod = await Product.findById(req.body.product_id);
        if(!prod){
            return res.status(401).json({error: "product doesn't exists", signal: "red"});
        }

        // check whether Rating document exists or not 
        const rating = await Rating.findOne({product_id: req.body.product_id});
        if(rating){
            return res.status(401).json({error: "Rating document already exists for this product", signal: "green"});
        }

        // now all set to create new document 
        const temp = new Rating({
            product_id: req.body.product_id,
            review: []
        })
        temp.save();

        return res.json({rating: temp, signal: "green"});
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error: "Internel server Error", signal: "red"});
    }
}

module.exports = createRating;