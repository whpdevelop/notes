# es6语法备课

### 1. let和const声明变量

- 声明的变量在同一个作用域是不能重复定义的

  ```js
  let a = 10;
  let a = 20; // 报错

  {
      let a = 10; 
      {
          let a = 20;
          console.log(a)
      }
  } // 正常
  var a = 10;
  var a = 20; // 正常
  ```

- let 声明的变量，只在let命令所在的代码块内有效。

  ```js
  {
      let a = 10;
      var b = 1;
  }
  console.log(a)
  console.log(b)

  // 应用
  var a = [];
  for (var i = 0; i < 10; i++) {
    a[i] = function () {
      console.log(i);
    };
  }
  a[6](); // 10
  // 此处的i是一个全局变量
  var a = [];
  for (let i = 0; i < 10; i++) {
    a[i] = function () {
      console.log(i);
    };
  }
  a[6](); // 6
  // 变量i是let声明的，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，所以最后输出的是6。
  ```

- 不存在变量提升

  ```js
  console.log(a)
  var a = 10;
  let a = 10;
  ```

- 暂时性死区

  ```js
  var n = 10;
  if (true) {
      n = 20;
      let n;
  }
  ```

- 块级作用域与函数声明

  ```js
  fn() // 报错未定义
  {
      function fn() {
          console.log(1)
      }
  }
  fn() // 正常
  // 拓展
  function f() { console.log('I am outside!'); }
  (function() {
      if (false) {
          // 重复声明一次函数f
          function f() { 
              console.log('I am inside!'); 		
          }
      }
      f(); //报错
  }());
  ```

  ​

### 2. 变量的结构赋值

- 数组的结构赋值

  ```js
  let a = 1;
  let b = 2;
  let c = 3;

  let [a, b, c] = [1, 2, 3];

  let [foo, [[bar], baz]] = [1, [[2], 3]];
  foo // 1
  bar // 2
  baz // 3
  let [ , , third] = ["foo", "bar", "baz"];
  third // "baz"
  let [x, , y] = [1, 2, 3];
  x // 1
  y // 3
  let [a, [b], d] = [1, [2, 3], 4];
  a // 1
  b // 2
  d // 4
  let [head, ...tail] = [1, 2, 3, 4];
  head // 1
  tail // [2, 3, 4]
  let [x, y, ...z] = ['a'];
  x // "a"
  y // undefined
  z // []

  如果解构不成功，变量的值就等于undefined。

  默认值
  let [foo = true] = [];
  foo // true

  let [x, y = 'b'] = ['a']; // x='a', y='b'
  let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
  取默认值的条件是使用严格相等运算符,判断一个位置是否有值.所以
  当一个数组成员严格等于undefined,默认值才会生效
  let [x = 1] = [undefined];
  x // 1
  let [x = 1] = [null];
  x // null

  如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。

  function f() {
    console.log('aaa');
  }
  let [x = f()] = [1];

  默认值可以引用解构赋值的其他变量，但该变量必须已经声明。
  let [x = 1, y = x] = [];     // x=1; y=1
  let [x = 1, y = x] = [2];    // x=2; y=2
  let [x = 1, y = x] = [1, 2]; // x=1; y=2
  let [x = y, y = 1] = [];     // ReferenceError: y is not defined
  上面最后一个表达式之所以会报错，是因为x用y做默认值时，y还没有声明。
  ```

- 对象的结构赋值

  ```js
  解构不仅可以用于数组，还可以用于对象。

  对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

  let { foo, bar } = { foo: "aaa", bar: "bbb" };
  foo // "aaa"
  bar // "bbb"

  let obj = { first: 'hello', last: 'world' };
  let { first: f, last: l } = obj

  let obj = {
    p: [
      'Hello',
      { y: 'World' }
    ]
  };
  let { p: [x, { y }] } = obj;
  x // "Hello"
  y // "World"

  const node = {
    loc: {
      start: {
        line: 1,
        column: 5
      }
    }
  };
  let { loc, loc: { start }, loc: { start: { line }} } = node;
  line // 1
  loc  // Object {start: Object}
  start // Object {line: 1, column: 5}

  //默认值
  var {x = 3} = {};
  x // 3
  var {x, y = 5} = {x: 1};
  x // 1
  y // 5
  var {x: y = 3} = {};
  y // 3
  var {x: y = 3} = {x: 5};
  y // 5
  var { message: msg = 'Something went wrong' } = {};
  msg // "Something went wrong"

  ```

- 字符串的结构赋值

  ```js
  字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。
  const [a, b, c, d, e,length] = 'hello';
  a // "h"
  b // "e"
  c // "l"
  d // "l"
  e // "o"

  ```

- 函数参数的结构赋值

  ```js
  function add([x, y]){
    return x + y;
  }
  add([1, 2]); // 3

  function move({x = 0, y = 0} = {}) {
    return [x, y];
  }
  move({x: 3, y: 8}); // [3, 8]
  move({x: 3}); // [3, 0]
  move({}); // [0, 0]
  move(); // [0, 0]

  function move({x, y} = { x: 0, y: 0 }) {
    return [x, y];
  }
  move({x: 3, y: 8}); // [3, 8]
  move({x: 3}); // [3, undefined]
  move({}); // [undefined, undefined]
  move(); // [0, 0]

  [1, undefined, 3].map((x = 'yes') => x);
  // [ 1, 'yes', 3 ]

  ```

- 用途

  ```js
  -> 交换变量的值
  let x = 1;
  let y = 2;

  [x, y] = [y, x];
  -> 从函数返回多个值
  // 返回一个数组

  function example() {
    return [1, 2, 3];
  }
  let [a, b, c] = example();
  // 返回一个对象
  function example() {
    return {
      foo: 1,
      bar: 2
    };
  }
  let { foo, bar } = example();
  -> 函数参数的定义
  // 参数是一组有次序的值
  function f([x, y, z]) { ... }
  f([1, 2, 3]);
  // 参数是一组无次序的值
  function f({x, y, z}) { ... }
  f({z: 3, y: 2, x: 1});
  -> 函数参数的默认值
  function ajax(obj){
  	var options = 
          {
              type:'get',
              async:true
          }
  }  
  -> import {mapStates,mapMutations,mapActions} from 'vuex';
  ```

  ​