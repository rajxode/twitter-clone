
// creating router 
const router = require('express').Router();

// controller
const likesController  = require('../controllers/likesController');


router.get('/:postId',likesController.toggleLike);
// add post route


// export router
module.exports = router;