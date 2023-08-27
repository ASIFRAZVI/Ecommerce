const express= require('express')

//router object
const router=express.Router();

// const contactController=require("../controllers/contactController")
// const auth=require("../middleware/auth")

router.get('/gallery',(req,res)=>{
    res.render("gallery")
  })

  router.get('/about',(req,res)=>{
    res.render("about")
  })

  router.get('/contact',(req,res)=>{
    res.render("contact")
  })

module.exports=router;