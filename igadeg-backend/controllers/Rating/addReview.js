// to connect with collections 
const Customer = require('../../models/Customer');
const Rating = require('../../models/Rating');

// to check body parameter 
const {validationResult} = require('express-validator');

const addReview = async(req,res) => {
    try {
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

        // check whether user already given review or not 
        let bol = false;
        if(rating.review.length > 0){
            for(let i of rating.review){
                console.log(i);
                console.log(custmr._id);
                if(i.customer_id.toString() === custmr._id.toString()){
                    bol = true;
                    break;
                }
            }
        }

        // if this customer already given review then return error 
        if(bol){
            return res.status(401).json({error: "Customer had already given review for this product", signal:"red"});
        }

        // now all set to add review 
        const newIteam = {
            customer_id: custmr._id,
            rate: req.body.rate,
            desc: req.body.desc
        }

        // add this newIteam 
        const newRating = await Rating.findByIdAndUpdate(
            rating._id,
            {$push: {review : newIteam}},
            {new : true}
        )

        return res.json({rating: newRating, signal: "green"});
    } catch (e) {
       console.log(e);
       return res.status(500).json({error: "Internal server Error", signal: "red"});
    }
}

module.exports = addReview;