
// mongoose
const mongoose = require('mongoose');
// validate the data
const validator = require('validator');
// creating web token
const jwt = require('jsonwebtoken');
// generate a random string
const crypto = require('crypto');
// encrypt password
const bcrypt = require('bcryptjs');

// creating user schema
const userSchema = new mongoose.Schema(
    {
        // user's name
        name:{
            type:String,
            // required true, if user's not give name then show message
            required:[true, 'Please enter your name'],
            // max length of name
            maxlength:[40, 'Name cannot be greater than 40 Characters']
        },
        // email address of user
        email:{
            type:String,
            required:[true, 'Please enter your email'],
            // make email unique for each user
            unique:true,
            // validate whether email entered is in correct format
            validate:[validator.isEmail , 'Please enter valid email address']
        },
        // password
        password:{
            type:String,
            required:[true, 'Please enter password'],
            // min length of password
            minLength:[8, 'password cannot be less than 8 characters'],
            // will not return password value when getting user's data from database
            select:false
        },
        dateOfBirth:{
            day:{
                type:String,
                required:[true, 'Please enter day in date of birth']
            },
            month:{
                type: String,
                required:[true, 'Please enter month of your date of birth']
            },
            year:{
                type: String,
                required:[true, 'Please enter year of your date of birth']
            }
        },
        // photo:{
        //     // user's photo
        //     // photo id in cloudinary
        //     id:{
        //         type:String,
        //         required:true
        //     },
        //     // url from cloudinary
        //     secure_url:{
        //         type:String,
        //         required:true,
        //     }
            
        // },
        // list of people user follows 
        follows:[
            {
                // user's id
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            }
        ],
        // list of people who are following this user
        followers:[
            {
                // user's id
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            }
        ],
    },
    {
        timestamps:true,
    }
);



// to create bcrypt hash of password before saving in DB
userSchema.pre('save', async function(next){
    // if password is not modified return 
    if(!this.isModified('password')){
        return next();
    }

    // create hash for password
    this.password = await bcrypt.hash(this.password,10);
});


// to check whether the password entered and password in DB match 
userSchema.methods.isPasswordMatch = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}


userSchema.methods.getJWTToken = function(){
    // generating a new token for the user
    return jwt.sign(
        {id: this._id},
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRY
        }
    );
}


// exporting the schema's model
module.exports = mongoose.model('User',userSchema);