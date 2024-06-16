// to connect with collections 
const Customer = require('../../models/Customer');
const Rating = require('../../models/Rating');

// to check body parameters 
const {validationResult} = require('express-validator');

const updateReview = async(req,res) => {
    try{

        // check whether appropriate parameters are provided in body or not 
        const validError = validationResult(req);
        if(!validError.isEmpty()){
            return res.status(401).json({error: validError.array(), signal: "red"});
        }
        
        // check whether product exists or not (will check at the time of
        //  retriving Rating document to reduce number of system call)
        
        // check whether customer exists or not 
        const custmr = await Customer.findById(req.custmr.id);
        if(!custmr){
            return res.status(401).json({error: "customer not exist", signal: "red"});
        }
        
        // now try to retrive Rating document from backend 
        const rating = await Rating.findOne({product_id: req.body.product_id});
        if(!rating){
            return res.status(401).json({error: "product doesn't exists", signal: "red"});
        }

        // update rating locally 
        let bol = true;
        if(rating.review.length> 0){
            for(let i of rating.review){
                if(i.customer_id.toString() === custmr._id.toString()){
                    i.rate = req.body.rate;
                    i.desc = req.body.desc;
                    bol = false;
                    break;
                }
            }
        }

        // if user had not given review previously then 
        if(bol){
            return res.status(401).json({error: "customer hadn't given any review previously", signal: "red"});
        }

        // all set to actually update database 
        const newRating = await Rating.findByIdAndUpdate(
            rating._id,
            {$set: {review: rating.review}},
            {new : true}
        )

        return res.json({rating: newRating, signal: "green"});
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error: "Internal server Error", signal: "red"});
    }
}

module.exports = updateReview;