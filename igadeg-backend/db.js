const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/igadget";

const connectToMongo = async () =>{
    try{
   await mongoose.connect(mongoURI);
   console.log("mongoose connected successfully");
   console.log(mongoose.connection.readyState);
    }catch(e){
        console.log("internal error while connecting with database.")
    }
}

module.exports = connectToMongo;