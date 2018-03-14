## 前端学科node阶段 第一次串讲

#### 一、直播名称：node操作mongdb串讲

#### 二、直播时长：90分钟

#### 三、直播目标：

#### 1. 掌握命令行操作mongodb数据库

#### 2. 掌握 `mongdb` 模块操作mongodb

#### 3. 掌握表格案例(数据的增删改查)

### 四、教学内容：

#### 1. 过度引入mongodb

#### 2.mongodb 的学习

##### 终端的指令操作

- 检查版本
```
mongod -version
```
- 启动mongod服务器
```
mongod --dbpath c:/data/db
```
- 启动mongod客户端
```
mongo
```
- 创建数据库 和 切换到相应的数据库
```
use 数据库的名字
```
- 显示所有数据库
```
show dbs
```
- 插入文档
```
db.集合名.insert({name:"zs"})
```
- 显示所有表(集合)
```
show tables
```
- 查找文档
```
db.集合名.find({条件名:属性值})  查找所有
db.集合名.findOne() 查找第一条
```
- 更新文档
```
以上语句只会修改第一条发现的文档，如果你要修改多条相同的文档，则需要设置 multi 参数为 true。
db.集合名.update({条件名:属性值},{$set:{条件名:更改的值}},{multi:true})  
db.集合名.findOne() 查找第一条
```
- 删除文档
```
justOne : （可选）如果设为 true 或 1，则只删除一个文档。
db.集合名.remove({条件名:属性值},{jistOne:ture})
```
- 删除数据库
```
db.dropDatabase()
```
- 删除集合
```
db.集合名.drop()
```
##### node操作mongodb
```JavaScript
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/test';

// 1 打开冰箱门 : 连接到数据库
MongoClient.connect(url,function(err,db){
    
    if(err){
        return console.log("数据库连接失败");
    }
    // 2 把大象放到冰箱里 :通过使用db操作数据库

    // => 插入一条数据
    var collection = db.collection('docs');
    collection.insertOne({name:'zs',age:22},function(err,result){
        if(err){
            return console.log("添加数据失败");
        }
        console.log(result);
    }) 
    //=> 更新数据
    // 2 把大象放到冰箱里 :通过使用db操作数据库
    var collection = db.collection('docs');
    collection.update({name:'zs'},{$set:{name:'ls'}},{
        multi:true
    },function(err,result){
        if(err){
            return console.log("添加数据失败");
        }
        // console.log(result);
    }) 
    //=> 删除数据
    var collection = db.collection('docs');
    collection.deleteOne({name:'ls'},function(err,result){
        if(err){
            return console.log("添加数据失败");
        }
        // console.log(result);
    }) 
    //=> 查找多条数据
    var collection = db.collection('docs');
    collection.find({}).toArray(function(err,result){
        if(err){
            return console.log("添加数据失败");
        }
        console.log(result);
    }) 
    //=> 查找一条数据
    var collection = db.collection('docs');
    collection.findOne({name:"ls"},function(err,result){
        if(err){
            return console.log("添加数据失败");
        }
        console.log(result);
    })
    // 3 关上冰箱门 : 关闭连接
    db.close();
})
```
##### app.js
```javascript
var path = require("path");

var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');

var router = require('./router/router');
// 在expres 中配置使用ejs模板引擎 
// npm install ejs --save
// 只要经过下面的配置 则在没一个 请求处理函数中的res对象都会有一个 render 方法
// 也就是说 如果需要渲染一个index.html 页面 直接配置res.render('模板文件名',{要注入的解析替换的对象})
// 如果 在express中使用了ejs模板引擎 则模板的文件名必须是.ejs后缀
//app.set('views',path.join(__dirname,"views"))//这句可以省略 默认会去views目录查找
app.set('view engine','ejs');

// app.get('/',function(req,res){
//     res.render('index');
// })

// app.get('/add',function(req,res){
//     res.render('add');
// })

// 配置body-parser插件 用来解析菜单 POST请求体
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 挂载路由
app.use(router);

app.listen(3000,function(){
    console.log('running');
})


```
##### router.js
```javascript
var express = require('express');

var router  = express.Router();
var controller = require('../controllers/controller');
router.get('/',controller.showIndex);

router
  .get('/add',controller.showAdd)
  .post('/add',controller.add);

module.exports = router;
```
##### controllers.js
```javascript

var MongoClient = require('mongodb').MongoClient;
var controller = module.exports;
var db = require('./db');

// 展示首页
controller.showIndex = function(req,res){
    // 分装之后的方法 添加数据之后 重新渲染页面 
    db.find('stu',{},function(err,result){
        if(err){
            res.send('连接服务器失败');
        }
        res.render('index',{
            students:result
        })
       })

    // 添加数据之后 重新渲染页面 
    var url = 'mongodb://localhost:27017/stus'
    MongoClient.connect(url,function(err,db){
        if(err){
            return console.log('数据库连接失败')
        }
        db.collection("stu").find().toArray(function(err,docs){
            if(err){
                return console.log('数据库查找失败');
            }
            res.render('index',{
                students:docs
            });
        })
        db.close();
    })
    
}

// 渲染添加页面 
controller.showAdd = function(req,res){
    res.render('add');
}

// 添加页面 提交数据
controller.add = function(req,res){
    var url = 'mongodb://localhost:27017/stus'
    MongoClient.connect(url,function(err,db){
        if(err){
            return console.log('数据库连接失败')
        }
        db.collection("stu").insertOne(req.body,function(err,result){
            if(err){
                console.log('插入数据失败');
            }
            res.send('insert success')
        })
        db.close();
    })
}

```

##### 连接数据库的封装

```JavaScript
var MongoClient = require('mongodb').MongoClient;
var controller = module.exports;

var url = 'mongodb://localhost:27017/stus';

 module.exports.find = function(collectionName,config,callback){
    MongoClient.connect(url,function(err,db){
        if(err){
            return callback(err);
        }
        db.collection(collectionName).find(config).toArray(function(err,docs){
            if(err){
                return callback(err);
            }
            callback(null,docs);
        })
        db.close();
    })
 }
```

#### 五、授课流程

| 教学过程           | 教师活动                                      | 学生活动   |
| ------------------ | --------------------------------------------- | ---------- |
| 已知引未知         | 引入：通过课程中学的mySqL引出mongodb          | 思考       |
| 知识讲解           | 知识讲解：  通过官网文档学习`Mongodb`完成案例 | 思考       |
| 活动               | 教师组织活动，活跃气氛                        | 学生参与活 |
| 归纳总结，畅谈收获 | 归纳总结                                      | 畅谈收获   |