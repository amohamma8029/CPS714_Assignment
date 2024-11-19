const fs = require('fs');
var path = process.cwd();
var buffer = fs.readFileSync(path + "/database_api.txt"); 
const mongo_db_api = buffer.toString()


// Import Express.JS
const express = require("express");
const app = express();

// Import Mongoose for MongoDB
const mongoose = require("mongoose");
mongoose.connect(mongo_db_api);

//Import database_model.js
const { transaction_schema, activity_schema, user_schema } = require('./database_model');

//Import Body Parser
const body_parser = require("body-parser");
app.use(body_parser.json());

//Import Cross Origin Resource Sharing.
const cors = require("cors");
const cors_options = {
    origin: "*",
    credentials: true, // access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

app.use(cors(cors_options));

//create host
app.get("/", (request, response) => {
    response.send("This is our main end point");
});

//open express server
app.listen(4545, () => {
    console.log("Connected");
});

const user_model = mongoose.model('user', user_schema);

// Get user by email
app.get("/get_user_by_email/:email", async (request, response) => {
    try{
        // find the user by email in the database
        const user = await user_model.findOne({"email": request.params.email})

        // check if the user exists or not, and if not return and error message
        if (!user) {
            return response.status(400).json({error: "User not found"})
        }

        // if the user does exist, respond with the user data
        response.status(200).json(user);
    } catch (err) {
        console.error("Error fetching user:", err);
        response.status(500).json({ error: "Failed to fetch user" });
    }
});

// Delete user data
app.delete("/delete_data/:email", async (request,response)=>{
    try{
        // find the user data by using the email as the key
        const user_data  = await user_model.findOneAndDelete({"email": request.params.email})
        
        // Respond with the deleted user
        response.status(201).json({message: "Item Successfully Removed", user: user_data});

    }catch(err){
        console.error("Error deleting user data", err);
        response.status(500).json({ error: "Failed to delete user data" });
    }
})

// Adding a new user 
app.post("/add_user", async(request,response)=>{
    try{
        const user = await user_model.create({
            "email": request["body"]["email"],
             "role":request["body"]["role"],
             "points_balance":0,
             "transaction_history":{},
             "activity_log":[],
        })

        await user.save()
        response.status(201).json({
            message:"User created successfully}",
            user:user.email
    });
    }catch(err){
        console.error(err);
        response.status(500).json({
            message:"Error occured while creating user",
            error:err.message
        })
    }
})