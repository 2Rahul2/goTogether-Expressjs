const express = require('express')
const { verifyToken } = require('../../middleware/verifyUser')

const router = express.Router()

router.get('/protected' , verifyToken ,(req , res)=>{
    res.status(200).json({
        name:req.user.name,
        id:req.user.id
    })
})

module.exports = router
