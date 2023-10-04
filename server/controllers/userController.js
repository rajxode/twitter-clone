
const User = require('../models/User');

const cloudinary = require('cloudinary').v2;


const CustomError = require('../utils/customError');
const cookieGenerator = require('../utils/cookieGenerator');


module.exports.signup = async (req,res) => {
    try {

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
        const user = await User.findOne({email}).select('+password').populate('follows','name email');


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
        secure: true,   // Only send over HTTPS
        sameSite: 'none' // Allow cross-origin requests
    });

    res.status(200).json({
        success:true,
        message:"User logout successfully"
    })
}


module.exports.getAllUser = async(req,res) => {
    try{
        const users = await User.find();

        res.status(200).json({
            success:true,
            users
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:'Bad Request'
        })
    }
}

module.exports.toggleFollow = async (req,res) => {
    try {
        const id = req.params.id;
        const { userId } = req.query;
        const userOne = await User.findById(id);
        const userTwo = await User.findById(userId);
        let message='';

        if(!userOne){
            res.status(400).json({
                message:'Bad request check'
            })
        }

        const alreadyFollowing = userOne.follows.includes(userId);

        if(alreadyFollowing){
            const newFollows = await userOne.follows.filter((follow) => JSON.stringify(follow) !== JSON.stringify(userId));
            userOne.follows = newFollows;

            const newFollowers = await userTwo.followers.filter((follow) => JSON.stringify(follow) !== JSON.stringify(id));
            userTwo.followers = newFollowers;
            message='Stopped following'
        }
        else{
            userOne.follows.push(userId);
            userTwo.followers.push(id);
            message='Started following'
        }

        await userOne.save();
        await userTwo.save();

        res.status(200).json({
            success:true,
            userOne,
            message
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
        
    }
}


module.exports.iFollow = async(req,res) => {
    try {
        const id = req.params.id;

        const user = await User.findById(id).populate('follows', 'name email');

        res.status(200).json({
            success:true,
            follows:user.follows
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}

module.exports.updateInfo = async(req,res) => {
    try {
        const id = req.params.id;
        
        const { name , email , day , month , year } = req.body;

        const dateOfBirth = {day,month,year};
        const newData = {
            name,
            email,
            dateOfBirth
        };

        const user = await User.findByIdAndUpdate(
                                                id,
                                                newData,
                                                // options for updating
                                                {
                                                    new:true,
                                                    runValidators:true,
                                                    useFindAndModify: false,
                                                }
                                            )

        res.status(200).json({
            success:true,
            message:'Info Updated',
            user
        })

    } catch (error) {
        res.status(400).json({
            success:false,
            message:'Bad Request'
        })
    }
}

module.exports.updatePassword = async(req,res) => {
    try {
        const id = req.params.id;
        
        const { oldPassword , newPassword } = req.body;



        // get user data(including password) from database using user's id
        const user = await User.findById(id).select('+password');


        // checking whether the old password matches with db
        const isVerified = await user.isPasswordMatch(oldPassword);

        
        // if password doesn't match
        if(!isVerified){
            res.status(400).json({
                success:false,
                message:'Old Password Incorrect'
            })
        }


        // save new password
        user.password = newPassword;

        // save data inside the database
        await user.save();
        // generate new token
        // cookieGenerator(user,res);
        
        res.status(200).json({
            success:true,
            message:'Password Updated',
        })

    } catch (error) {
        res.status(400).json({
            success:false,
            message:'Bad Request'
        })
    }
}