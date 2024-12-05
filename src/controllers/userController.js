const { OAuth2Client } = require('google-auth-library')
const { v4 : uuid4} = require('uuid')
require('dotenv').config()


const client = new OAuth2Client(process.env.client_id)
const db = require('../db')

const logout = (req , res)=>{
    res.clearCookie('session_token' ,{httpOnly:true ,secure:true ,sameSite:"lax", path: "/"})
    res.status(200).json({ message: 'Logged out successfully' });
}

const createUser = async (req , res)=>{

    const {token} = req.body

    // const {id , name ,email} = req.body

    try{
        const ticket = await client.verifyIdToken({
            idToken:token,
            audience:process.env.client_id
        })
        
        const payload = ticket.getPayload()
        // console.log(payload)
        const {email , name} = payload
        const id = payload.sub
        const existinguser = await db('users').where({email}).first()
        if (existinguser){
            res.cookie('session_token' , token , {httpOnly:true , secure:true ,sameSite:"lax"})
            return res.status(200).json({
                message:"user signed in",
                id:existinguser.id,
                name:existinguser.name
            })
        }    
        const result = await db('users').insert({id ,name , email}).returning('id')
        // const {id:userid} = result[0]

        res.cookie('session_token' , token ,{httpOnly:true ,secure:true,sameSite:"lax"})
        res.status(201).json({
            message:"User created",
            id,
            name
        })
    }catch(error){
        if (error.code === '23505'){
            res.status(400).json({
                error:"user already exists"
            })
        }else{
            res.status(500).json({
                error:`error occured creating user ${error}`
            })
        }
    }
}

module.exports = {
    createUser,
    logout
}