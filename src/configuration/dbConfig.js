const mongoose = require("mongoose");

const uri = "mongodb://127.0.0.1:27017/jwt_db";
// const uri = "mongodb://admin:mridul@localhost:27017/jwt_db?authSource=admin";

mongoose.connect(uri,{
  serverSelectionTimeoutMS: 5000
})

mongoose.connection.on("connected",()=>{
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error",(err)=>{
  console.log(`MongoDB connection error: ${err}`);
});

module.exports = mongoose;