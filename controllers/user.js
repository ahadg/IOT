const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { uuid } = require('uuidv4')
const User = require('../model/userSchema');

exports.getalluser = async (req, res) => {
    try {
      console.log(req.user)
      const users = await User.find()
      if (!users) {
        res.status(400).json({error:"Users not found"});
      } else {
        res.status(200).json({
          success: "true",
          users : users,
        });
      }
    } catch (error) {
        res.status(400).json({error:"Error in server"});
    }
}

exports.searchUser = async (req, res) => {
  console.log(req.body)
  var regex = new RegExp([req.body.search].join(""), "i");
  try{  
     let users = await User.find({
        Username : { $regex: regex }
     })
     res.status(200).json({users});
  } 
  catch(err){
     console.log(err);
  }
}

exports.getuser = async (req, res) => {
    try {
      console.log(req.user)
      const theuser = await User.findById(req.user._id)
      if (!theuser) {
        res.status(400).json({error:"User not found"});
      } else {
        res.status(200).json({
          success: "true",
          userlogin: theuser,
        });
      }
    } catch (error) {
        res.status(400).json({error:"Error in server"});
    }
  }

exports.register = async (req,res)=>{
    let data;
try{
    data = req.body;
    const {Username,Email,Password,Confirm_Pass,Phone_Number,usertype} = data
    console.log('data',data)
    if(!Username || !Email || !Phone_Number || !Password || !Confirm_Pass){
        return res.status(400).json({error: "fill properly"});
    }
   const emailExist = await User.findOne({Email});
   const phoneExist = await User.findOne({Phone_Number});
    if(emailExist){
        return res.status(400).json({error: "email already exist"});
    }
    else if(phoneExist){
        return res.status(400).json({error: "Phone already exist"});
    }
    else if( Password != Confirm_Pass){
        return res.status(400).json({error: "password is not matchingt"});
    } 
    else{
        let user;
        user = new User({Username,Email,Phone_Number,Password,usertype});
        await user.save();
        res.status(201).json({message:"user register successfully"});
    }
    }catch(err){
        console.log(err);
        res.status(400).json({error:"Error in server"});
    }
}

exports.login = async (req,res)=>{
console.log(req.body);
try{
let token;
const {email,password} = req.body;
if(!email || !password){
    return res.status(400).json({error:"fill properly"});
}
let userlogin =await  User.findOne({Email : email})
if(userlogin){
    const isMatch = await bcrypt.compare(password,userlogin.Password);
    token = await userlogin.generateAuthToken();
    userlogin =await  User.findOne({Email :  email}).select('Username Email Phone_Number CNIC usertype approved');
    if(!isMatch){
        return res.status(400).json({error:"in valid credentials"});
    }else{
    res.json({message:"user sign in succefully",token,userlogin});
    }
    }else{
        res.status(400).json({error:"in valid credentials"});
    }
} 
catch(err){
console.log(err);
res.status(400).json({error:"Error in server"});
}
}