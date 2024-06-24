const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/jwt_db";
mongoose.connect(uri);

mongoose.connection.on("connected", ()=>{
    console.log("Connected to MongoDB")
})

mongoose.connection.on("error", (err)=>{
    console.log(`MongoDB connection error:${err}`)
})

module.exports = mongoose;