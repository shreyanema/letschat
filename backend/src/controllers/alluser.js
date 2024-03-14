// this is to fetch all the users available in the system to chat 

const express = require('express');
const UserDetail = require("../models/user");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app  =  express();
app.use(bodyParser.json());
require('dotenv').config();

const alluser = async (req, res) => {
    try {
        // Use the verifyToken middleware to check for a valid token
        verifyToken(req, res, async () => {
            // The code inside this block will only be executed if the token is valid
             jwt.verify(req.token,process.env.ACCESS_TOKEN_SECRET,async (error,authData)=>{
                if(error){
                    res.send({result: "invalid token"})
                  
                }
                else{
                      // Fetch all user details
                    const users = await UserDetail.find({}, 'fname');
                    // Process the usernames
                    users.forEach(user => {
                    console.log(user.fname);
                     });

                    // Send the user details as a JSON response
                     res.json({ users });
                     }
             })
          
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


//function to find the token 
function verifyToken (req,res,next){
    const bearerHeader = req.header("Authorisation");
    console.log(bearerHeader)
    if(typeof bearerHeader != "undefined"){
        const bearer = bearerHeader.split(" ");
        const token  = bearer[1]
        req.token = token
        console.log(token)
        next();
    }
    else{
        res.status(403).json({ result: "Token not provided" });  
    }

}
module.exports={alluser};