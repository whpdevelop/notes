
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;

// 1 单开冰箱门 : 连接到数据库
var url = 'mongodb://localhost:27017/students';
MongoClient.connect(url,function(err,db){
    if(err){
        return console.log("数据库连接失败");
    }
    // 2 把大象放到冰箱里 : 通过使用db操作数据库
 var collection = db.collection('stu');
 // 插入数据
//  collection.insertOne({name:'zs'},function(err,result){
//      if(err){
//          return console.log("数据库加入数据失败");
//      }
//      console.log(result);
//  })
// 查找一条数据
// collection.findOne({},function(err,result){
//     if(err){
//         return console.log("数据库查找数据失败");
//     }
//     console.log(result);
// })

// 查找多条数据
// collection.find({}).toArray(function(err,doc){
//     if(err){
//         return console.log("查找失败")
//     }
//     console.log(doc)
// })
// 更新
// collection.update({name:"ls"},{$set:{name:"zs"}},{multi:true},function(err,rusult){
//         if(err){
//         return console.log("更新失败")
//     }
//     // console.log(rusult)
// })
//删除
// collection.deleteOne({name:"zs"},function(err,rusult){
//     if(err){
//     return console.log("删除失败")
// }
// // console.log(rusult)
// })

//     // 3 关上冰箱门 : 关闭数据库
//     db.close();
// })






