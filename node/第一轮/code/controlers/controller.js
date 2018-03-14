var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var url = 'mongodb://localhost:27017/students';
var db = require('./db');
var controller = module.exports;
controller.showIndex = function(req,res){
    db.find('demo',{},function(err,result){
        if(err){
            console.log('500');
        }
        res.render('index',{
           stus:result
        });
    })


    // MongoClient.connect(url,function(err,db){
    //     if(err){
    //         return console.log('数据库连接失败');
    //     }
    //     db
    //      .collection('demo')
    //      .find({}).toArray(function(err,doc){
    //          if(err){
    //              return console.log('数据查找失败')
    //          }
    //          res.render('index',{
    //              stus:doc
    //          });
    //      })
    // })
    
}

controller.showAdd = function(req,res){
    res.render('add');
}

controller.add = function(req,res){


    MongoClient.connect(url,function(err,db){
        if(err){
            return console.log('数据库连接失败');
        }
        db
         .collection('demo')
         .insert(req.body,function(err,result){
             if(err){
                 return console.log('数据添加失败');
             }
         })
    })
}