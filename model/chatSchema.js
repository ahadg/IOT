const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  users: [{
    type : String
  }],
  title : {
    type : String
  },
  subject : {
    type : String
  },
  messages: [{
      title : {
        type : String
      },
      subject : {
        type : String
      },
      user : {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
      message : {
        type : String,
      },
      created: {
        type: Date,
        default: Date.now
      }
  }],
  response : {
    type : Boolean,
    default : false
  },
  senderid : {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
   
});

module.exports = mongoose.model('chat', chatSchema);