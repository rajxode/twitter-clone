
// creating router 
const router = require('express').Router();

// controller
const postController  = require('../controllers/postController');

const {isLoggedIn} = require('../middlewares/user');

// add post route
router.post('/addpost',postController.addPost);


// export router
module.exports = router;