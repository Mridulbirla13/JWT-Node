const mongoose = require('mongoose');
const mon = require('../configuration/dbConfig');

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    role:{ type:String, enum: ["admin", "customer"], default:"customer"}
})

module.exports = mongoose.model("User", userSchema);