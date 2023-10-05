
const router = require('express').Router();

router.get('/',(req,res) => {
    console.log('back called');
    const token = req.cookies.token;

    res.status(200).json({
        success:true,
        token
    });
})

router.use('/user',require('./user'));
router.use('/post',require('./post'));
// router.use('/like',require('./likes'));

module.exports = router;