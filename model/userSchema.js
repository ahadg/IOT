const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    Username : {
        type:String,
        required : true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Phone_Number:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        unique:true
    },
    usertype : {
        type : String,
        default : "user"
    },
    approved : {
        type : Boolean,
        default : false
    },
});

userSchema.pre('save',async function(next){
  console.log('hello ',this.Password);
  if(this.isModified('Password')){
       this.Password = await bcrypt.hash(this.Password, 12);
  } 
  next();
});
userSchema.methods.generateAuthToken = async function() {

    try{
       let token = jwt.sign({_id:this.id},process.env.SECRET_KEY);
       return token;
    }catch(err){
        console.log(err);
    }
}

const User= mongoose.model('user',userSchema);
module.exports=User;