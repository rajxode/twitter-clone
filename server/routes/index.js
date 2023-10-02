
const router = require('express').Router();

router.get('/',(req,res) => {
    return res.status(200).send({
        message:'Greetings'
    });
})

router.use('/user',require('./user'));
router.use('/post',require('./post'));

module.exports = router;