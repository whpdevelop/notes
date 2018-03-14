
const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.static('views'));
app.post('/senddata',(req,res)=>{
    fs.readFile('./data.json','utf8',(err,data)=>{
        if(err){
            return;
        }
        var objData = JSON.parse(data);
        objData.push(req.body);
        fs.writeFile('./data.json',JSON.stringify(objData));
    })
    res.send('前端发送过来的数据接收成功..');
})

app.get('/getdata',(req,res)=>{
    fs.readFile('./data.json','utf8',(err,data)=>{
        if(err){
            return;
        }
        res.send(data);
    })
})

app.listen(3000,()=>{
    console.log('running....')
});