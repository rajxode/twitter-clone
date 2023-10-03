
const User = require('../models/User');
const Post = require('../models/Post');

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