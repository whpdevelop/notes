(function (window) {
    function Sizzle(selector) {
        return document.querySelectorAll(selector);
    }
    function $(selector) {
        return new $.prototype.Init(selector);
    }
    $.fn = $.prototype = {
        Init: function (selector) {
            this.ele = Sizzle(selector);

        },
        html: function () {
            console.log('html')
        },
        css: function () {
            console.log('css')
        },
    }
    // $.extend 方法 多个参数
    $.extend = function () {
        // 目标对象: 接受数据的对象
        var target = arguments[0];
        // 源对象: 提供数据的对象
        var sources = [];

        // 获取 数据
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            sources.push(source);
        }
        // 将所有的源对象中的属性和方法添加到目标对象
        sources.forEach(function (v) {
            // v : 每一个源对象
            // 将该源对象中的属性遍历给目标对象
            for (var key in v) {
                target[key] = v[key];
            }
        })
        return target;
    }
    //$.fn.extend 方法 单个参数
    $.fn.extend = function () {
        // 根据参数个数的不同 确定功能
        var len = arguments.length;
        var target, sources;
        if (len == 0) return;
        if (len == 1) {
            target = this;
            sources = [arguments[0]];
        } else {
            // 目标对象：接收数据的对象
            target = arguments[0];

            // 源对象：提供数据的对象
            sources = [];
            for (var i = 1; i < arguments.length; i++) {//从第二个实参遍历到最后一个实参
                var source = arguments[i];
                sources.push(source);
            }
        }

        //将所有的源对象中的属性和方法遍历的添加到目标对象中
        sources.forEach(function (v) {
            //v：每一个源对象
            //将该源对象中的属性遍历给目标对象
            for (var key in v) {
                //key：源对象中的属性名

                target[key] = v[key];
            }
        });
        return target;//用户可以根据需要获取拷贝之后的目标对象
    }


    // 添加each方法
    $.extend({
        // 遍历each 方法的实现
        each: function (array, callback) {
            var i;

            //遍历有2种情况，一种是对象：for...in；一种是数组、伪数组：for

            var isLikeArray = ("length" in array) && (typeof array.length === "number") && array.length >= 0;

            if (!isLikeArray) {
                //for...in循环
                for (i in array) {
                    var result = callback.call(array[i], i, array[i]);
                    if (result === false) {
                        break;
                    }
                }

            } else {
                for (i = 0; i < array.length; i++) {
                    //i：表示元素的索引
                    //array[i]：表示元素的值

                    var result = callback.call(array[i], i, array[i]);//通过上下文模式调用了callback函数，array[i]就决定了callback函数内部的this的值

                    if (result === false) {
                        break;
                    }
                }
            }
        }
    })

    $.fn.extend({
        //1、获取指定的样式：$("body").css("color")
        //2、设置所有的元素的指定的样式：$("body").css("color","red")
        //3、设置所有的元素的多个样式：$("body").css({color:"red",fontSize:"20px"})
        css: function (styleName, styleValue) {
            //判断参数的个数从而决定要实现什么功能？
            var len = arguments.length;
            if (len == 0) return this;
            if (len == 1) {
                if (jQuery.type(styleName) === "string") {
                    //1、获取第一个元素的指定的样式：
                    var firstDom = this.elements[0];
                    console.log(firstDom);
                    //2、获取该元素的指定样式？
                    var styleObj = window.getComputedStyle(firstDom, null);
                    return styleObj[styleName];
                } else {
                    //实现设置多个样式的功能：
                    //a、通过遍历this.elements获取到每一个DOM元素
                    //b、需要遍历参数：styleName这个参数获取到样式的名称和样式的值
                    for (var i = 0; i < this.ele.length; i++) {
                        var dom = this.ele[i];
                        for (var key in styleName) {
                            //key：样式的名称
                            //styleName[key]：样式的值
                            dom.style[key] = styleName[key];
                        }
                    }
                    //实现链式编程
                    return this;
                }
            } else {
                //设置指定样式：dom.style[样式名称]=样式值
                //1、遍历dom元素
                for (var i = 0; i < this.ele.length; i++) {
                    var dom = this.ele[i];
                    dom.style[styleName] = styleValue;
                }
                //2、实现链式编程
                return this;
            }
        }
    })


    $.fn.Init.prototype = $.fn;

    window.$ = $;
})(window)