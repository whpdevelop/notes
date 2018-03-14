var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var url = 'mongodb://localhost:27017/students';

var db = module.exports;

db.find = function(collectionName,config,callback){
    MongoClient.connect(url,function(err,db){
        if(err){
            return callback(err);
        }
        db
         .collection(collectionName)
         .find(config).toArray(function(err,doc){
             if(err){
                 return callback(err);
             }
             callback(null,doc);
         })
    })
}


 