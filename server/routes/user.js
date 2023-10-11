
// creating router 
const router = require('express').Router();

// controller
const userController = require('../controllers/userController');

// signup route
router.post('/signup',userController.signup);

// signin route
router.post('/signin',userController.login);
// signout
router.get('/signout',userController.logout);
// all user
router.get('/alluser',userController.getAllUser);
// user's follows
router.get('/ifollow/:id',userController.iFollow);
// user's followers
router.get('/myfollower/:id',userController.myFollowers);
// update data
router.put('/updateinfo/:id',userController.updateInfo);
// update password
router.put('/updatepassword/:id',userController.updatePassword);
// delete account
router.put('/deleteaccount/:id',userController.deleteAccount);
// follow and unfollow
router.put('/:id/follow',userController.toggleFollow);

// export router
module.exports = router;