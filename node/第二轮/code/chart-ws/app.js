
const express = require('express');
const WebSocket = require('ws');
const wss = new WebSocket.Server({
    port:8080
});
const app = express();

app.use(express.static('views'));

wss.on('connection',(client)=>{
    // client参数 代表的就客户端
    client.on('message',(data)=>{
        console.log(data);
        wss.clients.forEach((client)=>{
            client.send(data);
        })
    })
})

app.listen(3000,()=>{
    console.log('running....')
})

