
// creating router 
const router = require('express').Router();

// controller
const postController  = require('../controllers/postController');


router.get('/getposts/:id',postController.getPosts);
// add post route
router.post('/addpost',postController.addPost);

router.put('/deletepost/:id',postController.deletePost);

router.put('/togglelike/:postId',postController.toggleLike);

router.put('/addcomment/:postId',postController.addComment);

router.put('/deletecomment/:commentId',postController.deleteComment);


// export router
module.exports = router;