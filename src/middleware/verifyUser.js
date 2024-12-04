const { OAuth2Client } = require("google-auth-library");
const jwt = require('jsonwebtoken')

const client = new OAuth2Client(process.env.client_id)

const checkTokenExpiration = (exp)=>{
    const currentTime = Math.floor(Date.now()/1000) //milli to sec
    if (currentTime < exp){
        return true 
    } 
    return false
}

const verifyToken = async (req , res , next)=>{
    const token = req.cookies.session_token

    if (!token){
        return res.status(401).json({
            message:"no token given"
        })
    }
    // console.log("Token",token)


    try{

        const decoded = jwt.decode(token)
        if(!decoded || !decoded.exp){
            return res.status(400).json({
                message:"cannot decode token with JWT"
            })
        }

        const isValidToken = checkTokenExpiration(decoded.exp)
        if (!isValidToken){
            console.log("EXPIRED TOKEN GIVEN TO THE SERVER")
            return res.status(401).json({
                message:"Token Expire"
            })
        }
        const ticket = await client.verifyIdToken({
            idToken:token,
            audience:process.env.client_id
        })

        const payload = ticket.getPayload()
        console.log("Payload  ",payload)

        req.user = {
            id:payload.sub,
            name:payload.name,
            email:payload.email
        }

        next()
    }catch(error){
        console.log(`Error : ${error}`)
        return res.status(400).json({
            message:`Error : ${error}`
        })
    }
}



module.exports ={
    verifyToken
}



