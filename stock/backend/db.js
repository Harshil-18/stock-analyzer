require("dotenv").config();
const mongoose =require("mongoose");

const db = async () => {
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Database Connected...");
    }
    catch(error){
        console.log(error);
    }    
};

module.exports = db;