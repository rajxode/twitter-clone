
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

router.get('/ifollow/:id',userController.iFollow);

router.put('/updateinfo/:id',userController.updateInfo);

router.put('/updatepassword/:id',userController.updatePassword);

router.put('/deleteaccount/:id',userController.deleteAccount);

router.put('/:id/follow',userController.toggleFollow);

// export router
module.exports = router;