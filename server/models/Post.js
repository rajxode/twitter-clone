
const mongoose = require('mongoose');


const postSchema = new mongoose.Schema(
    {
        content:{
            type:String,
            required:[true, 'Please give content to post']
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        likes:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Like'
            }
        ],
        comments:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Comment'
            }
        ],
    },
    {
        timestamps:true,
    }
)

const Post = mongoose.model('Post',postSchema);

module.exports = Post;