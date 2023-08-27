const express= require('express')

//router object
const router=express.Router();

// const contactController=require("../controllers/contactController")
// const auth=require("../middleware/auth")

router.get('/signup',(req,res)=>{
    res.render("signup")
  })

  router.get('/login',(req,res)=>{
    res.render("about")
  })

  

module.exports=router;