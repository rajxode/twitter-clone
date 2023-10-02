
const User = require('../models/User');

const cloudinary = require('cloudinary').v2;


const CustomError = require('../utils/customError');
const cookieGenerator = require('../utils/cookieGenerator');


module.exports.signup = async (req,res) => {
    try {

        console.log('called',req.body);

        // getting user's data
        const { name , email, password,day,month,year} = req.body;


        const userExist = await User.findOne({email});

        if(userExist){
            return res.status(400).json({
                success:false,
                message:'User already exist, Sign In instead or Try again !!'
            })
        }

        // if user didn't uploaded photo
        // if(!req.files) {
        //     // error 
        //     return next(new CustomError('Please upload image', 400) );
        // }


        // // get uploaded image
        // const file = req.files.photo;
        // // upload the image to cloudinary
        // const result = await cloudinary.uploader.upload(file.tempFilePath,{
        //     folder:process.env.CLOUD_USER_FOLDER,
        //     width:150,
        //     crop:'scale'
        // })

        const dateOfBirth = {
            day,month,year
        }


        // create new user
        const user = await User.create({
            name,
            email,
            password,
            dateOfBirth
        });

        // generate a token and store in cookie
        // cookieGenerator(user,res);
        return res.status(201).json({
            success:true,
            message:'New user created, Please Login to continue !!!'
        })
    } catch (error) {
        return res.status(400).json({
            error:error,
            message:'Bad Request'
        })
    }
}


// for logging in the user
module.exports.login = async(req,res) => {
    
    try{    
        // get the entered values of email and password
        const {email,password} = req.body;


        // to get the user from database by his/her email id
        // (.select) = to get value of password also from database, which is initially hide for access inside the schema
        const user = await User.findOne({email}).select('+password');


        // if user doesn't found inside the database
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User doesn't exist, Please check email address !!"
            });
        }


        // match the user's entered password  with password saved inside the database
        const isValidUser = await user.isPasswordMatch(password);


        // if both password doesn't match
        if(!isValidUser){
            return res.status(400).json({
                success:false,
                message:"Email and Password doesn't match "
            })
        }

        // if the user's is validated then create a token for him
        cookieGenerator(user,res);
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:'Bad Request',
            error
        })
    }
}


// to logout user
module.exports.logout = async (req,res) => {
    res.cookie('token',null,{
        expires: new Date(
            Date.now()
        ),
        httpOnly: true,
    });

    res.status(200).json({
        success:true,
        message:"User logout successfully"
    })
}