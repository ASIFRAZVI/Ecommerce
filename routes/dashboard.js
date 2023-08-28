const express= require('express')
const router=express.Router();

// const contactController=require("../controllers/contactController")
const auth=require("../middleware/auth")

router.get('/dashboard',auth,(req,res)=>{
    res.render("dashboard")
  })

 

module.exports=router;