const mongoose = require("mongoose");

const uri = "mongodb+srv://mridulbirla13:gAXZpE43ujfiep8o@cluster0.rm4nkc5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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

