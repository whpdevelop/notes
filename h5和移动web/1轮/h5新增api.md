# h5 新增API总结

### DOM 拓展

- 获取元素的方法

  ```js
  Javascript
  	document.getElementByClassName("class"） 通过类名获取元素
                                     
  HTML5
  	doument,querySelector("selector") 通过CSS选择器来获取元素
  	node,querySelectorAll("selector") 通过CSS选择器来获取元素，获取的元素是以伪数组的形式存在的。（node是一个节点，不见得就是document）
  ```

- 类名的操作

  ```js
  node. classList.add("class") 添加类名
  node. classList.remove("class")  移除类名
  node. classList.toggle("class")  切换class 
  node. classList.contains("class")  检测是否存在 class
  ```

- 自定义属性

  ```js
  data-box="我是自定义属性"

  node.dataset.box 获取自定义属性的属性值
  node.dataset['box'] 获取自定义属性的属性值新增API
  ```

### 新增API

- 全屏

  ```js
  node.requestFullscreen() 开启全屏
  node.cancelFullscreen( ) 关闭全屏
  ```

  ​

- 文件读取

  ```js
  通过FileReader对象可以读取本地的存储文件。
  ```

  ​

- 文件拖拽

  ```js
  拖拽元素
  	元素中设置 draggable ="true" ,还有img标签和a标签是默认可以被拖拽的。
  目标元素
  	页面中任何一个元素都可以成为目标元素
  事件监听
  	拖拽元素的事件监听
  		ondrag ，应用于拖拽元素的，整个拖拽过程都会调用
  		 ondragstart 应用于拖拽元素，当拖拽开始时调用
  		ondragleave 应用于拖拽元素，当鼠标离开拖拽元素是调用
  		ondragend 应用于拖拽元素，当拖拽结束是调用
  	目标元素的事件监听
  		ondragenter 应用于目标元素，当拖拽元素进入时调用
  		 ondragover 应用于目标元素，当停留在目标元素上时调用
  		ondrop 应用于目标元素，当在目标元素上松开鼠标时调用
  		ondragleave 应用于目标元素，当鼠标离开目标元素时调用
  ```

  ​

- 地理定位

  ```js
  获取当前的地理信息 window.navigator.geolocation.getCurrentPosition（successCallback, erroeCallback）
  	successCallback 当成功获取地理信息后，会调用successCallback，并返回一个包含位置信息的对象
  	erroeCallback  获取地理信息失败后，会调用erroeCallback，并返回一个包含错误信息的对象
  在现实开发中，一般用第三方API：比如百度地图，来实现地理定位信息
  ```

  ​

- Web存储

  ```js
  sessionStorage
  	关闭浏览器的时候就清除了
  	在同一个窗口下数据可以共享
  	容量是5M
  localStorage
  	永久生效，保存在电脑的一个文件当中，除非手动删除清除
  	可以在多个窗口当中共享
  	容量是20M
  getItem(key)  获取
  setItem(key,value)   设置
  removeItem(key)  删除
  clear() 清除
  cookie
  	大小4k
  	浏览器和服务器之间来回传递
  	可以设置有效期
  	同源窗口中都是共享的
  ```

  ### 登录记住密码案例

  ```js

          $(function () {
              $("#btn").on("click", function () {
                  if ($("input[type='checkbox']").prop("checked")) {
                      var name = $("#name").val();
                      var ps = $("#ps").val();
                      $.cookie("set", {
                          duration: 365,
                          name: 'name',
                          value: name
                      });
                      $.cookie("set", {
                          duration: 365,
                          name: 'ps',
                          value: ps
                      });
                  } else {
                      $.cookie("delete", {
                          name: 'name'
                      });
                      $.cookie("delete", {
                          name: 'ps'
                      });
                  }
              })

              $("#name").val($.cookie("exist", {
                  name: 'name'
              }) ? $.cookie("get", {
                  name: 'name'
              }) : '');
              $("#ps").val($.cookie("exist", {
                  name: 'ps'
              }) ? $.cookie("get", {
                  name: 'ps'
              }) : '');


          })
      
  ```

  ​





