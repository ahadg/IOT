const jwt = require('jsonwebtoken')
const WebSocket = require("ws");
const { wsSaveMessage } =  require('../controllers/chat');
const {mqttpublish,mqttcommandpublish} = require('../mqtt/mqtt')
const clients = []
const {wsSaveActivity} = require('../controllers/activity')

const connectws = (wss) => {
wss.on("connection", function connection(ws,req) {
    console.log(req.url.split('&'))
    const split1 = req.url.split('&')[0]
    const split2 = req.url.split('&')[1]
    let token = split1.split('=')[1];
    let Id = split2.split("=")[1]
    let senderid;
    console.log('Id',Id)
    console.log('token',token)
    if(!token) {
      return
    }
    try {
      const decoded= jwt.verify(token,process.env.SECRET_KEY);
      senderid = decoded._id
      if(clients.find((item) => item.Id == Id ))
      {
        return
      }
      clients.push({ws,_id : decoded._id,Id})
      global.clients = clients;
      console.log('wsclient length',clients.length)
    } catch (error) {
      return console.log({error:"Token is not valid"});
    }
    ws.on("message", async function incoming(message) {
      const themessage = JSON.parse(message)
      let reciever_id = JSON.parse(message).id;
      console.log('message to send',reciever_id)
      console.log('clients',clients)
      const reciever = clients.map((item) => {
        if(reciever_id == item._id){
          return item
        }
        else {
          return
        }
      })
      console.log('reciever',reciever)
      // let clientSocket;
      // if(reciever){
      //     clientSocket =  reciever.ws
      // }
      try {
        //if(clientSocket.readyState === WebSocket.OPEN) {
          console.log('client [%s]: %s', message);
          console.log(themessage)
          if(themessage.type === "chat"){
            reciever.map((item) => {
              if(item){
                console.log('inside')
                if(item.ws){
                  item.ws.send(JSON.stringify({
                  "type" : "chat",
                  "id": `${senderid}`,
                  "message": `${themessage.message}`
                  }))
                  }
              }
            })
              wsSaveMessage(themessage.message,reciever_id,senderid,themessage.info)
          }
          else if(themessage.type === "mqttclient") {
             mqttpublish(senderid,themessage.message)
          }
          else if(themessage.type === "mqttclientcommand") {
            await wsSaveActivity(themessage)
            mqttcommandpublish(senderid,themessage.message)
          }
      } catch (error) {
        console.log(error);
      }
    });
    ws.on('close', function(ws,req) {
      console.log(token)
      console.log('wsclient length before',clients.length)
      if(!token) {
        return
      }
      try {
        const decoded= jwt.verify(token,process.env.SECRET_KEY);
        const index = clients.findIndex((item) => decoded._id == item._id)
        clients.splice(index,1)
        global.clients = clients
       console.log('wsclient length after',clients.length) 
      } catch (error) {
        console.log('Error : token not valid')
      }
       
    })
  });
}

module.exports = connectws;
