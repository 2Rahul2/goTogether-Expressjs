const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/api/user')
const testRoute = require('./routes/tests/getUserInfo')
const port = process.env.PORT || 8081; 


const cors = require("cors")



app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
    origin: ['https://magenta-sable-2d6826.netlify.app','http://localhost:3000'], 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders:['Content-Type']
}))

app.get("/",(req ,res)=>{
    res.send("Hello from server")
})

app.use('/api/users' , userRoute)

app.use('/test' , testRoute)

// module.exports = app; 
app.listen(port ,()=>{
    console.log(`Server at port : ${port}`)
})