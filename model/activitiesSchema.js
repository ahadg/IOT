const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  user: {
    type: Object,
  },
  created: {
        type: Date,
        default: Date.now
   },
   activitytype : {
       type : Object
   },
   activityvalue : {
    type : Object
}

});

module.exports = mongoose.model('activity', activitySchema);