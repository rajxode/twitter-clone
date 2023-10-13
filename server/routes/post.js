
// creating router 
const router = require('express').Router();
const { isLoggedIn } = require('../middlewares/user');
// controller
const postController  = require('../controllers/postController');

router.use(isLoggedIn);

// get post ofa a user
router.get('/getmyposts/:id',postController.getMyPosts);
// get all the posts
router.get('/getallposts',postController.getAllPosts);
// get post of follows
router.get('/getfollowsposts/:id',postController.getFollowPosts)

// add post route
router.post('/addpost',postController.addPost);
// delete post
router.put('/deletepost/:id',postController.deletePost);
// like and unlike a post
router.put('/togglelike/:postId',postController.toggleLike);
// add comment
router.put('/addcomment/:postId',postController.addComment);
// remove comment
router.put('/deletecomment/:commentId',postController.deleteComment);


// export router
module.exports = router;