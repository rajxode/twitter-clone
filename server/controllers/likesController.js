
module.exports.toggleLike = async (req,res) => {
    try {
        res.status(200).json({
            success:true,
            message:'Added'
        })   
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}