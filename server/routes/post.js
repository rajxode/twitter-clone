
// creating router 
const router = require('express').Router();

// controller
const postController  = require('../controllers/postController');


router.get('/getposts/:id',postController.getPosts);
// add post route
router.post('/addpost',postController.addPost);

router.put('/togglelike/:postId/',postController.toggleLike);


// export router
module.exports = router;