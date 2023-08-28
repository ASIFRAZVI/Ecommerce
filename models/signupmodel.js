const mongoose=require("mongoose");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
//signup schema
const usersignupSchema=new mongoose.Schema({
    
    name: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phnumber:{
        type:Number,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true,
    },
    
    password:{
        type:String,
        required:true,
    },
    
    //token filed
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]

})

//generate jws token
usersignupSchema.methods.generateauthtoken=async function(){
    try{
       const token= jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
       this.tokens=this.tokens.concat({token:token})
       await this.save();
       return token;
    }catch(error) {
      res.send (error)
    }
}

//hashing password
const hash=usersignupSchema.pre("save",async function(next){
    if(this.isModified('password')){
    this.password=await bcrypt.hash(this.password,10)
    }
    next();
})


//creating collection
const signup= new mongoose.model("signup", usersignupSchema);

module.exports=signup;