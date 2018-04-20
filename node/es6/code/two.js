/* 
    数组的结构赋值
*/
// let a = 1;
// let b = 2;
// let c = 3;

// let [a, b, c] = [1, 2, 3];

// let [foo, [
//     [bar], baz
// ]] = [1, [
//     [2], 3
// ]];
// console.log(foo)
// console.log(bar)
// console.log(baz)
// let [, , third] = ["foo", "bar", "baz"];
// console.log(third)
// let [x, , y] = [1, 2, 3];
// console.log(x)
// console.log(y)
// let [a, [b], d] = [1, [2, 3], 4];
// console.log(a)
// console.log(b)
// console.log(d)
/* 
    默认值
*/
// let [x, y = 'b'] = ['a'];
// let [x, y = 'b'] = ['a', undefined];

// let [x = 1] = [undefined];
// let [x = 1] = [null];

// function f() {
//     console.log('aaa');
// }
// let [x = f()] = [1];

// let [x = 1, y = x] = [];
// let [x = 1, y = x] = [2];
// let [x = 1, y = x] = [1, 2];
// let [x = y, y = 1] = [];

/* 
    对象的结构赋值
*/

/* let { foo, bar } = { foo: "aaa", bar: "bbb" };
console.log(foo)
console.log(bar) */

/* let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj
console.log(f)
console.log(l) */
// let obj = {
//     p: [
//         'Hello',
//         { y: 'World' }
//     ]
// };
// let { p: [x, { y }] } = obj;
// console.log(x)
// console.log(y)

// const node = {
//     loc: {
//         start: {
//             line: 1,
//             column: 5
//         }
//     }
// };
// let { loc, loc: { start }, loc: { start: { line } } } = node;
// line
// loc
// start

//默认值
/* var { x = 3 } = {};
x
var { x, y = 5 } = { x: 1 };
x
y
var { x: y = 3 } = {};
y
var { x: y = 3 } = { x: 5 };
y
var { message: msg = 'Something went wrong' } = {};
msg */
/* 
    字符串的结构赋值 
*/
// const [a, b, c, d, e] = 'hello';
// console.log(a)
// console.log(b)
// console.log(c)
// console.log(d)
// console.log(e)
// let { length } = "hello world"
// console.log(length)

/* 
    函数参数的结构赋值    
*/

/* function add([x, y]) {
    return x + y;
}
add([1, 2]);

function move({ x = 0, y = 0 } = {}) {
    return [x, y];
}
move({ x: 3, y: 8 });
move({ x: 3 });
move({});
move();

function move({ x, y } = { x: 0, y: 0 }) {
    return [x, y];
}
move({ x: 3, y: 8 });
move({ x: 3 });
move({});
move();

[1, undefined, 3].map((x = 'yes') => x); */