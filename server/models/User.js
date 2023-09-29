
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
        photo:{
            // user's photo
            // photo id in cloudinary
            id:{
                type:String,
                required:true
            },
            // url from cloudinary
            secure_url:{
                type:String,
                required:true,
            }
            
        },
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
        // post done by user
        posts:[
            {
                // post id
                type:mongoose.Schema.Types.ObjectId,
                ref:'Post'
            }
        ],
        // comments done by user
        comments:[
            {
                // comment's id
                type:mongoose.Schema.Types.ObjectId,
                ref:'Comment',
            }
        ],
        // likes done by user
        likes:[
            {
                // likes id
                type:mongoose.Schema.Types.ObjectId,
                ref:'Like'
            }
        ],
        // token for forget password
        forgetPasswordToken:String,
        // expiry time of forgetpass token
        forgetPasswordExpiry:Date,
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

// to create a random string(token) for reset password
// we store the hash of token in database and give user the simple crypto string 
// so when we use the resetPasswordToken in backend we have to again perform createHash method
userSchema.methods.resetPasswordToken = function(){
    
    // generate a long and random string
    const forgotToken = crypto.randomBytes(20).toString("hex");

    // creating hash from the random string token and store it inside the database
    this.forgetPasswordToken = crypto
    .createHash("sha256")
    .update(forgotToken)
    .digest("hex");

    // expiry time of token 20 minutes
    this.forgetPasswordExpiry = Date.now() + 20*60*1000;

    // return the string token ( not the hash token )
    return forgotToken;
};


// exporting the schema's model
module.exports = mongoose.model('User',userSchema);