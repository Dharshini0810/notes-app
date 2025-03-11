const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const validateToken = asyncHandler(async (req,res,next)=>{
    console.log("Start of validation")
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization
    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(' ')[1]
        if(!token){
            res.status(401)
            throw new Error("User not authorized or token missing")
        }
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                console.log(err)
                res.status(401)
                throw new Error("Token Expired!!")
            }
            req.user = decoded
            next()
            console.log("User Authorized")
        })
    }
    else{
        res.status(400)
        throw new Error("Token missing")
    }
    console.log("End of validation")
})

module.exports = {validateToken}