
const User = require('../models/User');
const Post = require('../models/Post');
const Like = require('../models/Like');
const Comment = require('../models/Comment');

const cloudinary = require('cloudinary').v2;

const cookieGenerator = require('../utils/cookieGenerator');

// make the name's first letter capital
function capitalizeFirstLetter (str){
    
    const arr = str.split(" ");
    //loop through each element of the array and capitalize the first letter.
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

    }
    //Join all the elements of the array back into a string 
    //using a blankspace as a separator 
    const str2 = arr.join(" ");
    return str2;
}


// create new accoun for a user
module.exports.signup = async (req,res) => {
    try {

        // getting user's data
        var { name , email, password , day , month , year } = req.body;

        // remove unwanted spaces
        name = name.trim();
        name = capitalizeFirstLetter(name);
        // convert email to lowercase
        email = email.toLowerCase();

        // find user
        const userExist = await User.findOne({email});

        // if user already exist
        if(userExist){
            return res.status(400).json({
                success:false,
                message:'User already exist, Sign In instead or Try again !!'
            })
        }

        const dateOfBirth = {
            day,month,year
        }

        
        // if user upload photo
        if(req.files) {
            // get uploaded image
            const file = req.files.file;
            // upload the image to cloudinary
            const result = await cloudinary.uploader.upload(file.tempFilePath,{
                folder:process.env.CLOUD_USER_FOLDER,
            })

            const photo = {
                id:result.public_id,
                secure_url:result.secure_url
            }

            // create new user with image
            const user = await User.create({
                name,
                email,
                password,
                dateOfBirth,
                photo
            });
        }
        else{
            // create new user
            const user = await User.create({
                name,
                email,
                password,
                dateOfBirth
            });
        }

        return res.status(201).json({
            success:true,
            message:'New user created, Please Login to continue !!!'
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
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

// return data of logged in user
module.exports.loggedInUser = async(req,res) => {
    try {
        const user = req.user;

        res.status(200).json({
            user
        })   
    } catch (error) {
        res.status(400).json({
            error:'Bad Request'
        })
    }
}


// to logout user
module.exports.logout = async (req,res) => {

    req.user = null;

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


// get list of all the user
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
            error:'Bad Request'
        })
    }
}

// follow and unfollow a user
module.exports.toggleFollow = async (req,res) => {
    try {
        const id = req.user._id;
        const { userId } = req.query;
        const userOne = await User.findById(id);
        const userTwo = await User.findById(userId);
        let message='';

        // check whether already following 
        const alreadyFollowing = userOne.follows.includes(userId);

        // if already following
        if(alreadyFollowing){
            // remove from follow list
            const newFollows = await userOne.follows.filter((follow) => JSON.stringify(follow) !== JSON.stringify(userId));
            userOne.follows = newFollows;

            const newFollowers = await userTwo.followers.filter((follow) => JSON.stringify(follow) !== JSON.stringify(id));
            userTwo.followers = newFollowers;
            message='Stopped following'
        }
        // else
        else{
            // add to follow list
            userOne.follows.push(userId);
            userTwo.followers.push(id);
            message='Started following'
        }

        // update data
        await userOne.save();
        await userTwo.save();


        res.status(200).json({
            success:true,
            userOne,
            message
        })

    } catch (error) {
        res.status(500).json({
            error:'Internal Server Error'
        })
        
    }
}

// get list of people that user follows
module.exports.myFollows = async(req,res) => {
    try {
        const id = req.user._id;

        const user = await User.findById(id).populate('follows', 'name email');

        res.status(200).json({
            success:true,
            follows:user.follows
        });
    } catch (error) {
        res.status(500).json({
            error:'Internal Server Error'
        })
    }
}

// get list of all the followers of user
module.exports.myFollowers = async(req,res) => {
    try {
        const id = req.user._id;

        const user = await User.findById(id).populate('followers', 'name email');

        res.status(200).json({
            success:true,
            followers:user.followers
        });
    } catch (error) {
        res.status(500).json({
            error:'Internal Server Error'
        })
    }
}

// udpate data of user
module.exports.updateInfo = async(req,res) => {
    try {

        const id = req.user._id;
        
        const { name , email , day , month , year } = req.body;

        const dateOfBirth = {day,month,year};

        let newData = {
            name,
            email,
            dateOfBirth
        };

        // if user upload photo
        if(req.files) {

            const user = await User.findById(id);
            
            if(user.photo.id){
                // get photo id of previously uploaded image
                const imageId = user.photo.id;

                // delete the previously uploaded image
                await cloudinary.uploader.destroy(imageId);
            }

            // get uploaded image
            const file = req.files.file;
            
            // upload the image to cloudinary
            const result = await cloudinary.uploader.upload(file.tempFilePath,{
                folder:process.env.CLOUD_USER_FOLDER,
            })

            const photo = {
                id:result.public_id,
                secure_url:result.secure_url
            }

            newData.photo = photo;
        }

        console.log('updated');
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


// update the password of user
module.exports.updatePassword = async(req,res) => {
    try {
        const id = req.user._id;
        
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
            error:'Bad Request'
        })
    }
}


// delete account of a user
module.exports.deleteAccount = async(req,res) => {
    try {
        const id = req.user._id;
        const { password } = req.body;

        // get user data(including password) from database using user's id
        const user = await User.findById(id).select('+password');


        // checking whether the old password matches with db
        const isVerified = await user.isPasswordMatch(password);

        
        // if password doesn't match
        if(!isVerified){
            res.status(400).json({
                success:false,
                message:'Password Incorrect'
            })
        }

        // delete all comments made by user
        await Comment.deleteMany({user:id});
        // delete all the likes made by user
        await Like.deleteMany({user:id});
        // find all the post made by user
        const posts = await Post.find({user:id});

        // remove each of the post along with it's like and comments
        for (let index = 0; index < posts.length; index++) {
            let postId = posts[index];
            // comment on post
            await Comment.deleteMany({post:postId});
            // like on post
            await Like.deleteMany({post:postId});
            // remove the post
            await Post.findByIdAndDelete(postId);
        }


        // remove all the follows 
        for (let index = 0; index < user.follows.length; index++) {
            const followsId = user.follows[index];

            const followsUser = await User.findById(followsId);

            const newfollowers = await followsUser.followers.filter((follower) => JSON.stringify(follower) !== JSON.stringify(id));

            followsUser.followers = newfollowers;

            await followsUser.save();
        }

        // remove all the followers
        for (let index = 0; index < user.followers.length; index++) {
            const followerId = user.followers[index];

            const followerUser = await User.findById(followerId);

            const newfollows = await followerUser.follows.filter((follow) => JSON.stringify(follow) !== JSON.stringify(id));

            followerUser.follows = newfollows;

            await followerUser.save();
        }

        // remove user
        await User.findByIdAndDelete(id);

        // response
        res.status(200).json({
            success:true,
            message:'Your Account is deleted, #GoodBye'
        })

    } catch (error) {
        res.status(500).json({
            error:'Internal Server Error'
        })
    }
}