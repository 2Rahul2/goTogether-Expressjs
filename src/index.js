const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/api/user')
const testRoute = require('./routes/tests/getUserInfo')
const port = process.env.PORT || 8081; 

const path = require("path");

const cors = require("cors")

// Serve React build files
const buildPath = path.join(__dirname, '', 'build'); // Update path if `build` is moved outside `src`
app.use(express.static(buildPath));

// Serve React's index.html for any unmatched routes
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
    res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
    next();
  });
  
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({

    origin: ['https://magenta-sable-2d6826.netlify.app','http://localhost:3000'], 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders:['Content-Type']
}))

// app.get("/",(req ,res)=>{
//     res.send("Hello from server")
// })

app.use('/api/users' , userRoute)

app.use('/test' , testRoute)

// module.exports = app; 
app.listen(port ,()=>{
    console.log(`Server at port : ${port}`)
})