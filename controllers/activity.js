const Activity = require('../model/activitiesSchema')
const User = require('../model/userSchema')

exports.wsSaveActivity = async (data) => {
    try {
       const user = await User.findById(data.id).select('_id Username Email Phone_Number approved')
       console.log(user)
       await Activity.create({user,activitytype : Object.keys(data.message)[0],activityvalue : data.message[`${Object.keys(data.message)[0]}`]})
       console.log('got data',data)
    } catch (error) {
        console.log(error)
    }
}

exports.getactivitiesbydate = async (req,res) => {
    try {
      console.log(req.body)
      const {startDate} = req.body
      const modstartdate = new Date(new Date(startDate).setHours(12,0,0))
      const newdate = new Date(modstartdate)
      let nextdate = new Date(new Date().setHours(12,0,0));
      nextdate.setDate(newdate.getDate() + 1);
      console.log(nextdate)
      const activities = await Activity.find({created : { $gte: modstartdate, $lte: nextdate },activitytype : req.body.activity})
      res.send({status : 'ok',activities})
    } catch (error) {
        console.log(error)
    }
}

