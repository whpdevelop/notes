
const ioo = require('socket.io');

const http = require('http');
const fs = require('fs');
let server = http.createServer((req,res)=>{
    if(req.url == '/'){
        fs.readFile('./view/index.html','utf8',(err,data)=>{
            if(err){
                return ;
            }
            res.end(data);
        })
    }
});
const io = ioo.listen(server);
io.on('connection',(socket)=>{
    socket.on('send',(data)=>{
        console.log(data);
        io.emit('return',data);
    })
})


server.listen(3000,()=>{
    console.log('running');
})
