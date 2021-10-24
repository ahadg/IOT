const Chat = require('../model/chatSchema')

exports.getUserMessage = async (req, res) => {
    try {
      console.log(req.user)
      const chat = await Chat.findOne({ $and: [{users : req.user._id}]});
      res.status(200).json({
        success : 'ok',
        chat
      })
    } catch (error) {
        res.status(400).json({error:"Error in server"});
    }
}

exports.getUserMessageById = async (req, res) => {
  try {
    console.log(req.body.id)
    const chat = await Chat.findOne({senderid : req.body.id});
    res.status(200).json({
      success : 'ok',
      chat
    })
  } catch (error) {
      res.status(400).json({error:"Error in server"});
  }
}

exports.getUserNonResponse = async (req, res) => {
  try {
    console.log(req.user)
    const chat = await Chat.find({response : false}).populate('senderid');
    console.log(chat)
    res.status(200).json({
      success : 'ok',
      chat
    }) 
  } catch (error) {
    console.log(error)
      res.status(400).json({error:"Error in server"});
  }
}

exports.getAllChat = async (req, res) => {
  try {
    console.log(req.user)
    const chat = await Chat.find().populate('senderid');
    console.log(chat)
    res.status(200).json({
      success : 'ok',
      chat
    }) 
  } catch (error) {
    console.log(error)
      res.status(400).json({error:"Error in server"});
  }
}


exports.wsSaveMessage = async (message,reciever_id,senderid,info) => {
   console.log('id',reciever_id,senderid,message,info)
   const chat = await Chat.findOne({ users: {'$all' :  [reciever_id,senderid]}});
  console.log(chat)
   if(chat) {
     //console.log('found',chat)
     await Chat.findOneAndUpdate({ users: { '$all' :  [ reciever_id, senderid]}},
       {$push : {messages : {user : senderid,message}}});
   }
   else {
    await Chat.create({
      users : [reciever_id,senderid],
      senderid,
      title : info.title,
      subject : info.subject,
      messages : [{user : senderid,message}]
    });  
   }
}