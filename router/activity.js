const express = require('express');
const Activities = require('../model/activitiesSchema')
const User = require('../model/userSchema')
const router=express.Router();
const protect = require('../middleware/protect')
const {getactivitiesbydate} = require('../controllers/activity')

router.post('/api/getactivitiesbydate',protect,getactivitiesbydate)


module.exports = router;