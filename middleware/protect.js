const jwt = require('jsonwebtoken')
module.exports = (req,res,next) => {
    //console.log('reached');
   let token = req.header('thejwttoken699');
   console.log('token',token)
  if(!token){
      //
     return res.status(400).json({error:"You must login first"});
  }
  try {
      const decoded= jwt.verify(token,process.env.SECRET_KEY);
      req.user= decoded
      next()
  } catch (error) {
   //console.log(error)
  return res.status(400).json({error:"Token is not valid"});
  }
}