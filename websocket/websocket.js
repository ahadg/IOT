const jwt = require('jsonwebtoken')
const WebSocket = require("ws");
const { wsSaveMessage } =  require('../controllers/chat');
const {mqttpublish,mqttcommandpublish} = require('../mqtt/mqtt')
const clients = []
const {wsSaveActivity} = require('../controllers/activity')

const connectws = (wss) => {
wss.on("connection", function connection(ws,req) {
    console.log('ws',req.url)
    let token = req.url.split('=')[1];
    let senderid;
    try {
      const decoded= jwt.verify(token,process.env.SECRET_KEY);
      senderid = decoded._id
      if(clients.find((item) => item._id == decoded._id ))
      {
        return
      }
      clients.push({ws,_id : decoded._id})
      global.clients = clients;
      console.log('wsclient length',clients.length)
    } catch (error) {
      console.log({error:"Token is not valid"});
    }
    ws.on("message", function incoming(message) {
      const themessage = JSON.parse(message)
      let reciever_id = JSON.parse(message).id;
      const reciever = clients.find((item) => reciever_id == item._id)
      let clientSocket;
      if(reciever){
          clientSocket =  reciever.ws
      }
      try {
        //if(clientSocket.readyState === WebSocket.OPEN) {
          console.log('client [%s]: %s', message);
          console.log(themessage)
          if(themessage.type === "chat"){
            console.log('inside')
            if(clientSocket){
              clientSocket.send(JSON.stringify({
              "type" : "chat",
              "id": `${senderid}`,
              "message": `${themessage.message}`
              }))
              }
              wsSaveMessage(themessage.message,reciever_id,senderid,themessage.info)
          }
          else if(themessage.type === "mqttclient") {
             mqttpublish(senderid,themessage.message)
          }
          else if(themessage.type === "mqttclientcommand") {
            wsSaveActivity(themessage)
            mqttcommandpublish(senderid,themessage.message)
          }
      } catch (error) {
        console.log(error);
      }
    });
    ws.on('close', function(ws,req) {
      console.log(token)
       const decoded= jwt.verify(token,process.env.SECRET_KEY);
       const index = clients.findIndex((item) => decoded._id == item._id)
       clients.splice(index,1)
       global.clients = clients
      console.log('wsclient length',clients.length)
    })
  });
}

module.exports = connectws;
