const express= require('express')

//router object
const router=express.Router();

//signup requiring controller
const {loginController, signupController, forgotController, resetpassController}=require("../controllers/signupController")

//requiring auth middleware
const auth=require("../middleware/auth")




//login part rout
router.post('/login',loginController)

//registration part
router.post('/signup', signupController)

//forgot pass rout
router.post('/forgotpass',forgotController)

router.post('/resetpass', resetpassController)


//extra routers
router.get('/signup',(req,res)=>{
  res.render("signup")
})

router.get('/login',(req,res)=>{
  res.render("login")
})
 
    //rout or orgot paasss
    router.get('/forgotpass',(req,res)=>{
      res.render("forgotpass")
    })

    //rout for reset pass after email werification
    router.get('/resetpass', (req, res)=>{
      res.render("resetpass")
    })

  
//logout funtion
    router.get('/logout',auth ,async(req,res)=>{
      try{
      //remove from db one user token or single out
      //req.user.tokens=req.user.tokens.filter((currenttoken)=>{
          // return currenttoken.token !== req.token;
      //})
    
      //logout from all devices
      req.user.tokens=[];

      //clear cookies
        res.clearCookie("jwt")
        await req.user.save();
        res.render("login")
      }catch{
        res.send("your not a logged-in")
      }
    })

module.exports=router;