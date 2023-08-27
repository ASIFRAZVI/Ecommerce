const express= require('express')

//router object
const router=express.Router();

// const contactController=require("../controllers/contactController")
// const auth=require("../middleware/auth")

router.get('/',(req,res)=>{
    res.render("frontpage")
  })

module.exports=router;