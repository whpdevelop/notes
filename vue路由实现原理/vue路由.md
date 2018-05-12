# Vue 路由原理

### 路由了解

```txt
什么是路由

路由这个概念最先是后端出现的。在以前用模板引擎开发页面时，经常会看到这样http://hometown.xxx.edu.cn/bbs/forum.php
有时还会有带`.asp`或`.html`的路径，这就是所谓的SSR(Server Side Render)，通过服务端渲染，直接返回页面。
其响应过程是这样的
1.浏览器发出请求
2.服务器监听到80端口（或443）有请求过来，并解析url路径
3.根据服务器的路由配置，返回相应信息（可以是 html 字串，也可以是 json 数据，图片等）4.浏览器根据数据包的`Content-Type`来决定如何解析数据

简单来说路由就是用来跟后端服务器进行交互的一种方式，通过不同的路径，来请求不同的资源

前端路由的出现要从 ajax 开始，为什么？


```



### 基础知识

```txt

实现url发生变化并且浏览器不向服务器发送请求的方式:
-> 加#欺骗浏览器
-> 利用H5中新增history的API
   - pushState
   - replaceState
   - 事件 popstate (window 对象的)
```



### hash实现

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        #main {
            width: 400px;
            height: 300px;
            border: 1px solid #000;
        }
    </style>
</head>

<body>
    <ul>
        <li><a href="#/red">红色</a></li>
        <li><a href="#/yellow">黄色</a></li>
        <li><a href="#/blue">蓝色</a></li>
    </ul>
    <div id="main"></div>
    <script>
        function Router() {
            // 记录当前url
            this.currentUrl = ''
                // 存储路由规则
            this.routers = {}
                // 初始化
            this.init()
        }
        // 初始化方法
        Router.prototype.init = function() {
                window.addEventListener('load', this.refresh.bind(this), false)
                window.addEventListener('hashchange', this.refresh.bind(this), false)
            }
            // 跟新页面
        Router.prototype.refresh = function() {
                this.currentUrl = location.hash.slice(1) || '/'
                this.routers[this.currentUrl]();
            }
            // 路由规则
        Router.prototype.router = function(path, cb) {
            this.routers[path] = cb || 11
        }
        var router = new Router()

        function changeColor(color) {
            var div = document.querySelector("#main");
            div.style.backgroundColor = color;
        }
        router.router('/', changeColor.bind(null, 'yellowgreen'))
        router.router('/red', changeColor.bind(null, 'red'))
        router.router('/yellow', changeColor.bind(null, 'yellow'))
        router.router('/blue', changeColor.bind(null, 'blue'))
    </script>
</body>

</html>
```

### H5新增API实现

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        #main {
            width: 400px;
            height: 300px;
            border: 1px solid #000;
        }
    </style>
</head>

<body>
    <ul>
        <li>red</li>
        <li>yellow</li>
        <li>blue</li>
    </ul>
    <div id="main"></div>
    <button id="btn">改变路由</button>
    <script>
        var lis = document.querySelectorAll('li');
        var main = document.querySelector('#main');
        lis.forEach(function(item) {
            item.onclick = function() {
                main.style.backgroundColor = this.innerHTML;
                history.pushState({
                    ctn: this.innerHTML
                }, null, "#/" + this.innerHTML)
            }
        })
        btn.onclick = function() {
            history.replaceState({
                ctn: 'purple'
            }, null, "#/" + 'purple')
        }
        window.onpopstate = function(e) {
            console.log(e)
            main.style.backgroundColor = e.state.ctn;
        }
    </script>
</body>

</html>
```

