# 前端学科jquery 封装阶段二 第1次直播

### 一、直播名称：jquery 封装

### 二、直播时长：90分钟

### 三、直播目标：

#### 1. 强化面像对象编程思想

#### 2. 掌握jQuery库的基本原理

### 四、教学内容：

#### 1. 过度引入jQuery

#### 2. jQuery结构的封装

- 选择器模 (介绍了选择器模块)

```
Sizzle.js  jquery源码中的部分代码
```

- 选择器模块的封装 (通过选择器模块获取到元素对象并添加)

```
缺点: 创建的方法的所有方法为私有,浪费内存空间

```

```
   <script>
        function Sizzle(selector) {
            return document.querySelectorAll(selector);
        }

        function $(selector) {
            var doms = Sizzle(selector);
            doms.html = function () {
                console.log('html')
            }
            doms.css = function () {
                console.log('css')
            }
            return doms;
        }
        console.log(Sizzle('body'))
        $('body').html();
        $('body').css();
        var ele1 = $('body');
        var ele2 = $('body');
        console.log(ele1.html == ele2.html)
        // false -> 说明ele1 和 ele2 方法并不是同一块内存
        // $('body').html();
    </script>
```

- 框架结构-1 (引出DOM对象的构造函数)

```
缺点: 修改了原生js提供的构造函数(不推荐)

```

```
<script>
        function Sizzle(selector) {
            return document.querySelectorAll(selector);
        }
        function $(selector) {
            var doms = Sizzle(selector);

            return doms;
        }
        NodeList.prototype.html = function () {
            console.log('html');
        }
        NodeList.prototype.css = function () {
            console.log('css');
        }
        /* 
            共享 -> 原型
            函数有原型

            构造函数 实例对象 和 原型对象的关系
            1 所有的函数都有一个原型对象(prototype)
            2 原型对象上有一个constructor 属性指向该原型所属的构造函数
            3 实例对象上有一个__proto__ 属性(非标准,编程中不要使用),该属性指向创建该实例 的构造函数的原型
        */
        console.log($('body').__proto__);
        console.log($('body').html == $('body').html)
        // console.log([1, 2, 3].max());
        // Array.prototype.max = function () {
        //     return Math.max.apply(null, this);
        // }
        // console.log([1, 2, 3].max());
    </script>
```

- 框架结构-2 (用构造函数对DOM对象进行包装)

```
    <script>
        function Sizzle(selector) {
            return document.querySelectorAll(selector);
        }
        //1 获取dom元素
        function Fn(selector) {
            this.ele = Sizzle(selector);
        }
        //2 为元素添加的方法 
        // 原型的拓展
        // Fn.prototype.html = function () {
        //     console.log('html');
        // }
        // Fn.prototype.css = function () {
        //     console.log('css');
        // }
        // Fn.prototype.attr = function () {
        //     console.log('attr');
        // }
        // 替换原型
        Fn.prototype = {
            html: function () {
                console.log('html')
            },
            css: function () {
                console.log('css')
            },
            attr: function () {
                console.log('attr')
            }
        }
        //3 入口函数
        function $(selector) {
            return new Fn(selector);
        }
        console.log($('body').html == $('body').html)
    </script>
```

```
缺点: 全局变量增加,容易被污染

```

- 自执行函数(减少全局变量)

```
       //方法一
       var $ = (function () {
            function Sizzle(selector) {
                return document.querySelectorAll(selector);
            }
            //1 获取dom元素
            function Fn(selector) {
                this.ele = Sizzle(selector);
            }
            //2 为元素添加的方法 

            // 原型的拓展
            // Fn.prototype.html = function () {
            //     console.log('html');
            // }
            // Fn.prototype.css = function () {
            //     console.log('css');
            // }
            // Fn.prototype.attr = function () {
            //     console.log('attr');
            // }
            // 替换原型
            Fn.prototype = {
                html: function () {
                    console.log('html')
                },
                css: function () {
                    console.log('css')
                },
                attr: function () {
                    console.log('attr')
                }
            }
            //3 入口函数
            function $(selector) {
                return new Fn(selector);
            }
            return $;
        })() 
        // 方法二
        (function (window) {
            function Sizzle(selector) {
                return document.querySelectorAll(selector);
            }
            //1 获取dom元素
            function Fn(selector) {
                this.ele = Sizzle(selector);
            }
            //2 为元素添加的方法 
            // 原型的拓展
            // Fn.prototype.html = function () {
            //     console.log('html');
            // }
            // Fn.prototype.css = function () {
            //     console.log('css');
            // }
            // Fn.prototype.attr = function () {
            //     console.log('attr');
            // }
            // 替换原型
            Fn.prototype = {
                html: function () {
                    console.log('html')
                },
                css: function () {
                    console.log('css')
                },
                attr: function () {
                    console.log('attr')
                }
            }
            //3 入口函数
            function $(selector) {
                return new Fn(selector);
            }
            window.$ = window.jquery = $;
        })(window)
        console.log($('body').html == $('body').html)
```

```
缺点: 由于没有暴露构造函数的原型,无法添加插件

```

- 框架结构(将构造函数以及方法放到暴露的$的原型上)

```
    <script>
        (function (window) {
            function Sizzle(selector) {
                return document.querySelectorAll(selector);
            }
            //1 获取dom元素
            // function Fn(selector) {
            //     this.ele = Sizzle(selector);
            // }
            // 替换原型
            // Fn.prototype = {
            //     html: function () {
            //         console.log('html')
            //     },
            //     css: function () {
            //         console.log('css')
            //     },
            //     attr: function () {
            //         console.log('attr')
            //     }
            // }
            //3 入口函数
            function $(selector) {
                return new $.prototype.Fn(selector);
            }
            $.fn = $.prototype = {
                Fn: function (selector) {
                    this.ele = Sizzle(selector)
                },
                html: function () {
                    console.log('html')
                },
                css: function () {
                    console.log('css')
                },
                attr: function () {
                    console.log('attr')
                }
            }
            // 将Fn 的原型指向 $.prototype
            $.fn.Fn.prototype = $.fn;
            // 这样的实例可以访问到$.prototype上的方法了
            window.$ = window.jquery = $;
        })(window)
        $.prototype.log = function () {
            console.log('log')
        }
        $.fn.log();
        console.log($('body').html == $('body').html)
    </script>
```

- 整体思路

  ```js
  	01-选择器模块 (介绍了选择器模块) 
      02-选择器模块的封装 (通过选择器模块获取到元素拥有方法)
      缺点:  创建的所有元素的方法为私有的,浪费内存空间
      03-框架结构-1 (引出dom对象的构造函数)
      缺点: 修改了js原生的构造函数(不推荐)
      04-框架结构-2 (用构造函数对dom对象包装)
      缺点: 全局变量增加,容易被污染
      05-自执行函数(减少全局变量)
      缺点: 由于没有暴露构造函数的原型,所以无法给拓展插件
      06-框架结构(将构造函数以及方法放到暴露函数的原型上)
  ```

  ​

#### 五、授课流程

| 教学过程           |                           教师活动                           | 学生活动   |
| ------------------ | :----------------------------------------------------------: | ---------- |
| 形象化“案例”引入   |             引入：通过通过生活中的例子引出jquery             | 思考       |
| 知识讲解           | 知识讲解：  封装函数简单实现jQuery功能,根据缺点一步一步推出jQuery结构 | 思考       |
| 活动               |                    教师组织活动，活跃气氛                    | 学生参与活 |
| 归纳总结，畅谈收获 |                           归纳总结                           | 畅谈收获   |

