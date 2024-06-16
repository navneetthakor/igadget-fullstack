// to connect with collection in mongoDb 
const Customer = require('../../models/Customer');

// to delete image 
const fs = require('fs');
const path = require('path');

const updateCustomer = async (req,res) => {
    try{

        // find id of custmr
        const custmrId = req.custmr.id;
        
        // find customer 
        const custmr = await Customer.findById(custmrId);
        if(!custmr){
            // delete uploaded image 
            if(req.file) fs.unlinkSync(path.join(__dirname,'../..', req.file.path));
            return res.status(401).json({message: "Please login with valid credentials", signal: "red"});
        }
        
        // now customer exists
        // get all the fields which are suppose to update 
        const {name, mobile} = req.body;
        
        // create object to hold values 
        const newCustmr = {
            name: name ? name : custmr.name,
            mobile: mobile ? mobile : custmr.mobile
        };
        if(req.file) newCustmr.image = req.file.path;
        
        // delete old image if new image is being provided 
        if(req.file && custmr.image!=="") fs.unlinkSync(path.join(__dirname,'../..', custmr.image));
        
        // now update profile 
        const updtCustmr = await Customer.findByIdAndUpdate(
            custmrId,
            {$set : newCustmr},
            {new :  true}
        )
            
        // return updated profile 
        return  res.json({custmr: updtCustmr, signal:"green"});
    }
    catch(e){
        console.log(e);
        // delete uploaded image 
        if(req.file) fs.unlinkSync(path.join(__dirname,'../..', req.file.path));
        return res.status(500).json({message: "internal error occured", signal: "red"});
    }
};

module.exports = updateCustomer;