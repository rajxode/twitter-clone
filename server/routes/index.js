
const router = require('express').Router();

router.get('/',(req,res) => {
    res.send('Hello');
})


// user related routes
router.use('/user',require('./user'));
// post related routes
router.use('/post',require('./post'));

module.exports = router;