const mongoose = require('mongoose');

require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("Mongo DB connection success ! ")
    }catch(error){
        //console.error(error)
        console.error("MongoDB connection failed !");
        process.exit(1);
    }
}
module.exports = connectDB ;