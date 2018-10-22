const mongoose = require('mongoose'); // connects to the data base
const Schema = mongoose.Schema // connects model to  database in mongo etc...

//Making the user
const userSchema = new Schema({
    username: String,
    password: String,
    name: String,
    },
    { timestamps: true }
);
//Defining the user schema to use with outside. 
const User = mongoose.model("User", userSchema);//stating that User w/ capital u is going to be the model userSchem.

module.exports = User;