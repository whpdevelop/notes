var path = require("path");

var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser')

var router = require('./routers/router');
// app.set('views',path.join(__dirname,"views"))
app.set('view engine','ejs');

// app.get('/',function(req,res){
//     res.render('index');
// })
// app.get('/add',function(req,res){
//     res.render('add');
// })


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

app.listen(3000,function(){
    console.log('running...');
})


