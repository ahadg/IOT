// MQTT publisher
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://mqtt.coltivo.io:1883')
//var client = mqtt.connect('mqtt://localhost:1883')
var topic = 'deviceinfos'
var commandtopic = 'commands'

let fans = ['','on','off']
let drawer = ['','open','close']
let pumpstatus = ['normal','broken','overloaded']
let wastelevel = [0,50,100]

client.on('connect', ()=>{
    setInterval(()=>{
        var message = {
            temp : `${Math.floor((Math.random() * 100) + 1)}`,
            humidity : `${Math.floor((Math.random() * 100) + 1)}`,
            fans : `${fans[Math.floor((Math.random() * 2) + 1)]}`,
            drawer : `${drawer[Math.floor((Math.random() * 1) + 1)]}`,
            wastelevel : `${Math.floor((Math.random() * 100) + 1)}`,
            wasteactivitystatus : `${drawer[Math.floor((Math.random() * 2) + 1)]}`,
            drawerwaterlevel : `${Math.floor((Math.random() * 100) + 1)}`,
            draweractivitystatus : `${drawer[Math.floor((Math.random() * 2) + 1)]}`,
            cupswaterlevel : `${Math.floor((Math.random() * 100) + 1)}`,
            cupactivitystatus : `${drawer[Math.floor((Math.random() * 2) + 1)]}`,
            containerlevel : `${Math.floor((Math.random() * 100) + 1)}`,
            pumpworkstatus : `${pumpstatus[Math.floor((Math.random() * 2) + 1)]}`,
            containerlevel : 'empty',
            cupstatus : 'full',
            airpump : 'on'
        }
        client.publish(topic, JSON.stringify(message))
        console.log('Message sent!', message)
    }, 15000)
})