

const cookieGenerator = (user,res) => {
    // generate a new token for the user
    const token = user.getJWTToken();

    // store the token inside the cookies
    // options for cookie
    const options = {
        // expires token in 3days
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE *24 * 60 * 60 * 1000
        ),
        httpOnly: true, // makes the token available only to backend
        secure: true,   // Only send over HTTPS
        sameSite: 'none' // Allow cross-origin requests
    }

    // remove password from variable
    user.password = undefined;
    
    // return response { token , user }
    res.status(200).cookie('token', token, options).json({
        success: true,
        message:'Logged In successfully !!',
        token,
        user
    })
}

module.exports = cookieGenerator;