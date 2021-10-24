const mqtt = require('mqtt')
//const client = mqtt.connect('mqtt://localhost:1883')
//const client = mqtt.connect('mqtt://test.mosquitto.org:1883')
const client = mqtt.connect('mqtt://mqtt.coltivo.io:1883')
const topic = 'Raspberrypi/myproject/alessio/aqua'
const commandtopic = 'Raspberrypi/myproject/alessio/command'
global.mqttclient = client

const Onmessage = (topic,message) => {
    message = JSON.parse(message.toString())
    console.log('listening',message)
    //console.log('global client',global.clients)
    console.log('recieved from this topic',topic)
    if(topic === "Raspberrypi/myproject/alessio/command") {
        console.log('command topic')
    }
    else if(topic === "Raspberrypi/myproject/alessio/aqua") {
        global.clients.map((client) => {
            client.ws.send(JSON.stringify({
                "type" : "mqtt",
                message
            }))
        })
    }
    
        //console.log('clientss',client)

}

client.on('message', (topic, message)=>{
    Onmessage(topic,message)
})

client.on('connect', ()=>{
    console.log('connected')
    client.subscribe(topic)
    client.subscribe(commandtopic)
})


exports.mqttpublish = (id,msg) => {
    client.publish(topic, JSON.stringify(msg))
}

exports.mqttcommandpublish = (id,msg) => {
    console.log('called')
    console.log(msg)
    try {
        client.publish(commandtopic, JSON.stringify(msg) )  
        //Onmessage(commandtopic,msg) 
    } catch (error) {
        console.log(error)
    }
    
}