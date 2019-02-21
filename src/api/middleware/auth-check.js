const jwt= require('jsonwebtoken');
const config=require('../../config/config');
module.exports = (req, res, next) =>{
    try {
        const token = req.headers.authorization;
        console.log(token);
        const code = jwt.verify(token, config().secret);
        req.userData = code;
        console.log('auth validated successfully');
        next();//continue
        
    } catch (error) {
        return res.status(500).json({
            message: 'token validation and auth failed'
        });
    }
   
}