
const User = require('../models/User');
const Post = require('../models/Post');
const Like = require('../models/Like');
const ObjectId = require('mongodb').ObjectId;

module.exports.getPosts = async (req,res) => {
    try {

        const posts = await Post.find({user:req.params.id}).populate('user','name');

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


module.exports.addPost = async(req,res) => {
    try {
        const { content, userId } = req.body;

        const post = await Post.create({
            content,
            user:userId,
        })

        const user = await User.findById(userId);

        user.posts.push(post._id);
        await user.save();
        

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



module.exports.toggleLike = async (req,res) => {
    try {
        const postId = req.params.postId;
        const userId = req.query.userId;


        const alreadyLike = await Like.findOne({user:userId, post:postId});
        const user = await User.findById(userId);
        const post = await Post.findById(postId);

        if(!alreadyLike){

            const like = await Like.create({
                post:postId,
                user:userId
            })

            user.likes.push(like._id);
            
            post.likes.push(like._id);     
            await user.save();
            await post.save();

            return res.status(200).json({
                success:true,
            })       
        }
        else{
            const userNewLike = await user.likes.filter((like) => JSON.stringify(like) !== JSON.stringify(alreadyLike._id));
            const postNewLike = await post.likes.filter((like) => JSON.stringify(like) !== JSON.stringify(alreadyLike._id));
            
            user.likes = userNewLike;
            post.likes = postNewLike;

            await Like.findByIdAndDelete(alreadyLike._id);
        }
        

        await user.save();
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