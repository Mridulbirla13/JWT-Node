const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI;



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