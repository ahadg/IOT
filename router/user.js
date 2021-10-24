const express = require('express');
const router=express.Router();
const protect = require('../middleware/protect')
const {getalluser,getuser,register,login,searchUser} = require('../controllers/user')

// protected routes
router.get('/api/getallusers',protect,getalluser)
router.get('/api/getuser',protect,getuser)
router.post('/api/searchusers',protect,searchUser)
router.post('/api/signin',login)
router.post('/api/register',register)




module.exports = router;