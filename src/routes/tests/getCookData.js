const express = require('express')

const router = express.Router()


router.get('/cookie',(req , res)=>{
    const token = req.cookies.session_token

    if (!token){
        console.log("no token from client received")
        return res.status(401).json({
            message:"no cookies sent to server"
        })
    }
    console.log(token)
    res.status(200).json({
        message:"Got session token at server"
    })
})
module.exports = router

