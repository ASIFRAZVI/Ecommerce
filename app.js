const express =require('express')
const cors=require('cors')
const dotenv=require('dotenv')
const path=require('path');
const bodyparser=require('body-parser')
const cookieParser = require('cookie-parser');


const port=3000 || process.env.port
dotenv.config()

const app=express()

//require database
require('./server/database')

//requiring contact rouit
const frontpagerouter = require('./routes/frontpageroute');
const galleryrouter = require('./routes/gallery');
const userrouter = require('./routes/userroute');
const dashboardrouter = require('./routes/dashboard');




//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//midlleware or configuration
app.use(cors())
app.use(express.urlencoded({ extended:false}))
//app.use(express.json())
app.use(cookieParser())
app.use(bodyparser.json({extended:false}))

//public static style path
app.use(express.static(path.join(__dirname, 'public')));

//use routes
app.use(frontpagerouter);
app.use(galleryrouter);
app.use(userrouter);
app.use(dashboardrouter);

app.listen(port,()=>{
    console.log("server started")
})