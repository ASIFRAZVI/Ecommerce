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

  
  router.get('/error1',(req,res)=>{
    res.render("error1")
  })

  router.get('/error2',(req,res)=>{
    res.render("error2")
  })

  router.get('/forgotpass',(req,res)=>{
    res.render("forgotpass")
  })

  router.get('/resetpass',(req,res)=>{
    res.render("resetpass")
  })
module.exports=router;