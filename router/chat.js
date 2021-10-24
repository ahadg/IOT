const express = require('express');
const Messages = require('../model/chatSchema')
const User = require('../model/userSchema')
const router=express.Router();
const protect = require('../middleware/protect')
const {getUserMessage,getUserNonResponse,getAllChat,getUserMessageById} = require('../controllers/chat')

router.get('/api/getusermessages',protect,getUserMessage)
router.post('/api/getUserMessageById',protect,getUserMessageById)
router.get('/api/getUserNonResponse',protect,getUserNonResponse)
router.get('/api/getAllChat',protect,getAllChat)

module.exports = router;