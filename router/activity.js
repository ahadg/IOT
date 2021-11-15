const express = require('express');
const Activities = require('../model/activitiesSchema')
const User = require('../model/userSchema')
const router=express.Router();
const protect = require('../middleware/protect')
const {getactivitiesbydate,getActivities} = require('../controllers/activity')

router.post('/api/getactivitiesbydate',protect,getactivitiesbydate)
router.get('/api/getactivites',protect,getActivities)

module.exports = router;