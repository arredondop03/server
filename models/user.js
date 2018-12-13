const mongoose = require('mongoose'); // connects to the data base
const Schema = mongoose.Schema // connects model to  database in mongo etc...

//Making the user
const userSchema = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    addressStreet: String,
    addressContinued: String,
    city: String,
    zipCode: Number,
    terms: Boolean,
    state: {
        type: String, 
        enum: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 
               'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 
               'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 
               'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 
               'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
               'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 
               'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 
               'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 
               'WI', 'WY']},
    },
    { timestamps: true }
);
//Defining the user schema to use with outside. 
const User = mongoose.model("User", userSchema);//stating that User w/ capital u is going to be the model userSchem.

module.exports = User;