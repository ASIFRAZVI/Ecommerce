const jwt=require("jsonwebtoken");
const signup=require("../models/signupmodel")
//login auth part
const auth=async(req, res, next)=>{
    try{
        const token=req.cookies.jwt;
        const verifyuser=jwt.verify(token, process.env.SECRET_KEY);
       // console.log(verifyuser)
        const user=await signup.findOne({_id:verifyuser._id})
        //console.log(user.name)

        //logout auth part
         req.token=token;
         req.user=user;

        //this is also login token auth
        next();
        
    }catch(error){
       // console.log(error)
      res.redirect("error1")
    }

}
module.exports=auth;