
const User = require('../models/User');
const Post = require('../models/Post');
const Like = require('../models/Like');
const Comment = require('../models/Comment');
const cloudinary = require('cloudinary').v2;


// return all the post of  a user
module.exports.getMyPosts = async (req,res) => {
    try {

        const posts = await Post.find({user:req.params.id}).populate('user','name photo').populate('likes','user').populate({
            path: 'comments',
            populate: {
            path: 'user',
            model: 'User',
            },
        });

        res.status(200).json({
            success:true,
            posts
        })

    } catch (error) {
        res.status(400).json({
            success:false,
            message:'Bad request'
        })
    }
}


// return all the post inside the database
module.exports.getAllPosts = async (req,res) => {
    try {

        const posts = await Post.find({}).populate('user','name photo').populate('likes','user').populate({
            path: 'comments',
            populate: {
            path: 'user',
            model: 'User',
            },
        });

        res.status(200).json({
            success:true,
            posts
        })

    } catch (error) {
        res.status(400).json({
            success:false,
            message:'Bad request'
        })
    }
}

// return all the post of people the user follows
module.exports.getFollowPosts = async (req,res) => {
    try {

        const user = await User.findById(req.params.id);
        let followPosts = [];

        for (let i = 0; i < user.follows.length; i++) {
            const followId = user.follows[i];
            
            const posts = await Post.find({user:followId})
                                .populate('user','name photo')
                                .populate('likes','user')
                                .populate({
                                    path: 'comments',
                                    populate: {
                                    path: 'user',
                                    model: 'User',
                                    },
                                });
            followPosts = [...followPosts,...posts];
        }
        

        res.status(200).json({
            success:true,
            posts:followPosts
        })

    } catch (error) {
        res.status(400).json({
            success:false,
            message:'Bad request'
        })
    }
}

// for adding a new post 
module.exports.addPost = async(req,res) => {
    try {
        const { content, userId } = req.body;
        var post;

        // if user upload photo
        if(req.files) {
            // get uploaded image
            const file = req.files.file;
            // upload the image to cloudinary
            const result = await cloudinary.uploader.upload(file.tempFilePath,{
                folder:process.env.CLOUD_POST_FOLDER,
            })

            const photo = {
                id:result.public_id,
                secure_url:result.secure_url
            }

            post = await Post.create({
                content,
                user:userId,
                photo
            })
        }
        else{
            post = await Post.create({
                content,
                user:userId,
            })   
        }

        res.status(200).json({
            success:true,
            message:'New Post added',
            post
        });

    } catch (error) {
        res.status(400).json({
            success:false,
            message:'Bad Request'
        })
    }
}


// delete the post
module.exports.deletePost = async(req,res) => {
    try {
        const id = req.params.id;

        await Like.deleteMany({post:id});
        await Comment.deleteMany({post:id});

        const post = await Post.findById(id);

        if(post.photo.id){
            // get photo id of previously uploaded image
            const imageId = post.photo.id;

            // delete the uploaded image
            await cloudinary.uploader.destroy(imageId);
        }
        await Post.findByIdAndDelete(id);

        res.status(200).json({
            success:true,
            message:'Your Post deleted',
        });

    } catch (error) {
        res.status(400).json({
            success:false,
            message:'Bad Request'
        })
    }
}


// like / unlike a post
module.exports.toggleLike = async (req,res) => {
    try {
        const postId = req.params.postId;
        const userId = req.query.userId;


        const alreadyLike = await Like.findOne({user:userId, post:postId});
        const post = await Post.findById(postId);

        if(!alreadyLike){

            const like = await Like.create({
                post:postId,
                user:userId
            })
            
            post.likes.push(like._id);     
            await post.save();

            return res.status(200).json({
                success:true,
            })       
        }
        else{
            const postNewLike = await post.likes.filter((like) => JSON.stringify(like) !== JSON.stringify(alreadyLike._id));
            post.likes = postNewLike;

            await Like.findByIdAndDelete(alreadyLike._id);
        }
        
        await post.save();

        return res.status(200).json({
            success:false,
        })   
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


// for adding a new comment
module.exports.addComment = async (req,res) => {
    try {
        const postId = req.params.postId;
        const userId = req.query.userId;
        const { content } = req.body;

        const post = await Post.findById(postId);

        const comment = await Comment.create({
            post:postId,
            user:userId,
            content
        })

        post.comments.push(comment._id);     
        await post.save();

        return res.status(200).json({
            success:true,
            message:'Comment Added'
        })   
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


// delete a comment
module.exports.deleteComment = async (req,res) => {
    try {
        
        const id = req.params.id;

        await Comment.findOneAndDelete(id);

        return res.status(200).json({
            success:true,
            message:'Comment Deleted'
        })   
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}