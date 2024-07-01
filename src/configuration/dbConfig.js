const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

console.log("URL -- ",uri);

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

