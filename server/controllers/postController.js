
const User = require('../models/User');
const Post = require('../models/Post');
const Like = require('../models/Like');
const Comment = require('../models/Comment');

module.exports.getPosts = async (req,res) => {
    try {

        const posts = await Post.find({user:req.params.id}).populate('user','name').populate('likes','user').populate('comments','user content');

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


module.exports.deletePost = async(req,res) => {
    try {
        const id = req.params.id;

        
        // const post = await Post.findById(id);
        await Like.deleteMany({post:id});
        await Comment.deleteMany({post:id})
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