const express = require('express');
const router=express.Router();
const protect = require('../middleware/protect')
const {getalluser,getuser,register,login,searchUser,adduser,deleteuser} = require('../controllers/user')

// protected routes
router.get('/api/getallusers',protect,getalluser)
router.get('/api/getuser',protect,getuser)
router.post('/api/searchusers',protect,searchUser)
router.post('/api/signin',login)
// admin
router.post('/api/register',protect,register)
router.delete('/api/deleteuser/:id',protect,deleteuser)




module.exports = router;