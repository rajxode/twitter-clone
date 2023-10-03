
// creating router 
const router = require('express').Router();

// controller
const userController = require('../controllers/userController');

// signup route
router.post('/signup',userController.signup);

// signin route
router.post('/signin',userController.login);

router.get('/signout',userController.logout);

router.get('/alluser',userController.getAllUser);


// export router
module.exports = router;