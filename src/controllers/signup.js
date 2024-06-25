const userService = require('../services/signup');

async function createUser(req, res){
    try{
        console.log("Request body:", req.body);  // Log the request body
        const userData = req.body;
        console.log("User data:", userData);  // Log the extracted user data
        const user = await userService.createUser(userData);
        res.status(201).json({user: user, message: "User created successfully"});
    } catch(error){
        console.error("Error in createUser:", error);  // More detailed error logging
        res.status(400).json({ message: error.message });
    }
}

module.exports = { createUser };