const mongoose = require('mongoose'); // connects to the data base
const Schema = mongoose.Schema // connects model to  database in mongo etc...

//Making the user
const userSchema = new Schema({
    username: {type: String, required: true},
    password:  {type: String, required: true},
    firstName: {type: String, required: true},
    lastName:  {type: String, required: true},
    email:  {type: String, required: true},
    phone: Number,
    addressStreet:  {type: String, required: true},
    addressContinued:  {type: String, required: false},
    city:  {type: String, required: true},
    zipCode: Number,
    terms: Boolean,
    state: {
        type:  String,
        enum: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 
               'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 
               'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 
               'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 
               'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
               'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 
               'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 
               'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 
               'WI', 'WY']},
    familyName:  {type: String, required: true}
    },
    { timestamps: true }
);
//Defining the user schema to use with outside. 
const User = mongoose.model("User", userSchema);//stating that User w/ capital u is going to be the model userSchem.

module.exports = User;