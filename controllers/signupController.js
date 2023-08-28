const dotenv=require('dotenv')
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const nodemailer=require("nodemailer")
const randomstring=require("randomstring")
//to load.env files
dotenv.config()

const signup=require('../models/signupmodel')

//creat method for forgot password
const sendresetpasswordmail=async(email,token)=>{
  try{
     const transpoter= nodemailer.createTransport({
       service:"gmail",
        auth:{
          user:process.env.emailuser,
          pass:process.env.emailpassword,
        }
       })

       const mailoption={
        from:process.env.emailuser,
        to:email,
        subject:'For Reset Password',
        html:`<p><a href="https://milkomilkyzpure.onrender.com/resetpass?token=${token}">CLICK HERE TO RESET PASSWORD</a></p>`,
       }
       transpoter.sendMail(mailoption)
  }catch(error){
    console.log("error1")
  }
}

//signup rout controller fn
const signupController=async (req,res)=> {
    try{
      const password=req.body.password;
      const usersignupSchema= new signup({
        name:req.body.name,
        email:req.body.email,
        phnumber:req.body.phnumber,
        address:req.body.address,
        password:password
      })
      const token=await usersignupSchema.generateauthtoken();
   // store token to cookies // syntax res.cookie(name, value, [option])
   res.cookie("jwt", token,{
    expires:new Date(Date.now()+604800000),
    httpOnly:true,
    //secure:true,
  });

     const registered = await usersignupSchema.save()
      res.redirect("login")
    }catch(error){
      res.redirect("/error1")
    }
  };

// login rout controller fn
const loginController=async(req,res)=>{
    try{
      const email=req.body.email;
      const password=req.body.password;
  
     const registeredemail=await signup.findOne({email:email});

  // hash pasword comparing
  const isMatch=await bcrypt.compare(password, registeredemail.password)

  //jwt token fn only one line for login
  const token=await registeredemail.generateauthtoken();

  // store token to cookies // syntax res.cookie(name, value, [option])
  res.cookie("jwt", token,{
    expires:new Date(Date.now()+604800000),
    httpOnly:true,
    //secure:true,
  });


   if(isMatch){
      res.redirect("/dashboard");
  }else{
        res.redirect("/error1")
     }
    }catch(error){
      res.redirect("/error1")
    }
  }
//controller for forgot pass
const forgotController=async(req,res)=>{
  try {
    const email = req.body.email;
    const user = await signup.findOne({ email: email });

    if (!user) {
      return res.send("Invalid email");
    }

    const token = randomstring.generate();
    user.token = token;
    await user.save();

    // Call the sendResetPasswordMail function
    await sendresetpasswordmail(user.email, token);

    res.send("Please check your email inbox and reset your password! IF not Cheak Spam ");
  }catch (error){
   res.send("this is forgotcontroller error")
} 
}

const resetpassController=async (req,res)=>{
  try {
    const token = req.query.token;
    console.log(token)
    const newPassword = req.body.password;

    const user = await signup.findOne({ token: token });
    console.log(user)
    if (!user) {
      return res.send('This link has expired');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and clear the token field using findByIdAndUpdate
    await signup.findByIdAndUpdate(
      user._id,
      { password: hashedPassword, token: '' },
      { new: true }
    );

    res.send('Password reset successfully');
   
   
  }catch(error){
  res.send('this is catch reset error from reset block')
}
}

module.exports={loginController, signupController,forgotController, resetpassController}