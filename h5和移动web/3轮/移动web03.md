
# sass 安装、编译

### 安装

```text
1 sass基于Ruby语言开发而成，因此安装sass前需要安装Ruby。
（注:mac下自带Ruby无需在安装Ruby!）
window下安装SASS首先需要安装Ruby，先从官网下载Ruby并安装。

2 安装过程中请注意勾选Add Ruby executables to your PATH添加 
到系统环境变量。
3 安装完成之后需要测试安装有没有成功，运行CMD输入以下命令
ruby -v 如果成功会打印相应的版本
4 在 sublime中安装 scss、sass、sassbulid插件 ctrl + B 编译

```

### .sass 和 .scss 的区别

    1. Sass 和 Scss 文件拓展名不同，sass是以.sass为后缀名，而scss是以.scss为后缀名
    2. Sass 和 Scss 语法书写方式不同，sass 书写方式比较严格，不能够带大括号{}和分号; 而Scss 语法书写方式跟我们的css语法是类似的。


# sass语法

### 0 Sass

```text
Sass 是一款强化 CSS 的辅助工具，它在 CSS 语法的基础上增加了变量 (variables)、嵌套 (nested rules)、混合 (mixins)、导入 (inline imports) 等高级功能，这些拓展令 CSS 更加强大与优雅。使用 Sass 以及 Sass 的样式库（如 Compass）有助于更好地组织管理样式文件，以及更高效地开发项目。
```

### 1 注释

`/*注释*/`  会在编译后的css中显示

`//注释`   不会在编译后的css中显示

###  2 变量声明

- $+变量名+:+变量值+;

`$color:red;`

### 3 局部变量和全局变量

- 局部变量 : 在元素里面声明的变量
- 全局变量 : 在元素外面声明的变量
- 全局变量的影子 :  和全局变量名字相同的局部变量叫做全局变量的影子

```css
$color:red; 
$width:300px;

div {
    
    $color:blue; //全局变量的影子
    color:$color;// 调用的是局部变量
    a {
        width:$width;//调用的是全局变量
    }
}
```

### 4 sass 的嵌套

​   嵌套的功能避免了重复输入父选择器,而且令复杂的css结构易于管理

### 4.1 选择器嵌套

sass:

```css
header {
    nav {
        .left {
            color:red;
        }
        .right {
            color:red;
        }
    }
}
```

css:

```css
header nav .left {
  color: red; }
header nav .right {
  color: red; }
```

### 4.2 属性嵌套(有相同的属性前缀)

sass:

```css
div {
    padding: {
        left:10px;
        top:20px;
    }
}
```

css:

```css
div {
  padding-left: 10px;
  padding-top: 20px; }
```



### 4.3 伪类嵌套

sass:

```css
clearfix {
    &:before,
    &:after {
        position:absolute;
        left:30px;
    }
    &:after {
        top:30px;
    }
}
```

css:

```css
clearfix:before, clearfix:after {
  position: absolute;
  left: 30px; }
clearfix:after {
  top: 30px; }
```

```text
& :
1 可以用  &  代表嵌套规则外层的父选择器
2 如果含有多层嵌套, 最外层的父选择器会一层一层向下传递
3 & 作为选择器的第一个字符,其后可以跟随后缀生成复合的选择器
```

### 5 Sass 的混合宏

### 5.1 声明混合宏

```css
//声明混合宏
@mixin border-radius{
    -webkit-border-radius:20px;
    -moz-border-radius:20px;
    -ms-border-radius:20px;
    -o-border-radius:20px;
    border-radius:20px;
}
```



### 5.2 调用混合宏

```css
//调用混合宏
.box {
@include border-radius;
}
```



### 5.3 混合宏的参数

sass:

- 不带任何参数

```css
//声明混合宏
@mixin border-radius{
    -webkit-border-radius:20px;
    -moz-border-radius:20px;
    -ms-border-radius:20px;
    -o-border-radius:20px;
    border-radius:20px;
}
//调用混合宏
.box {
@include border-radius;
}
```

- 传一个带值参数（传入一个默认值)

sass:

```css
@mixin border-radius($radius:50%) {
    -webkit-border-radius:$radius;
    -moz-border-radius:$radius;
    -ms-border-radius:$radius;
    -o-border-radius:$radius;
    border-radius:$radius;
}

div {
    @include border-radius(10px);
}
```

css:

```css
div {
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;
  border-radius: 10px; }
```

- 传多个参数

sass:

```css
@mixin box($width,$height) {
    width:$width;
    height:$height;
}
div {
    @include box(200px,300px);
}
```

css:

```css
div {
  width: 200px;
  height: 300px; }
```

### 6 sass 继承

sass:

```css
div {
    width: 200px;
    height: 200px;
}
span {
    position: absolute;
    background-color: #fff;
    @extend div;
}
```

css:

```css
div, span {
  width: 200px;
  height: 200px; }

span {
  position: absolute;
  background-color: #fff; }
```

在scss 中的继承 可以继承类样式块中所有样式代码,而且编译出来的css 会将选择器合并在一起,形成并列选择器

### 7 sass 占位符%

- 用占位符 `%` 声明的代码,如果不被@extend调用就不会被编译
- 通过@extend 调用的占位符,编译出来的代码会将相同的代码合并在一起,代码十分简洁

sass:

```css
%mt10 {
    margin-top: 10px;
}

div {
    @extend %mt10;
}
span {
    @extend %mt10;
}
```



css:

```css
div, span {
  margin-top: 10px; }
```

### 9 sass 插值

sass:

```css
$properties:(margin,padding);
@mixin setValue($item,$value){
    @each $prop in $properties {  // $prop 对应的就是$properties 中的margin  padding
        #{$prop}-#{$item}:$value; // $prop   链接 参数中的 $item 值为 $value
    }
}

div {
    @include setValue(top,20px);  // 调用混合宏
}
```

css:

```css
div {
  margin-top: 20px;
  padding-top: 20px; }
```

- 可以在使用@extend时使用插值

sass:

```css
%mt-30 {
    margin-top: 30px;
}
.btn-left {
    width: 300px;
    height: 300px;
}
$num:30;
$left:left;
.btn2 {
    @extend %mt-#{$num};
    @extend .btn-#{$left};
}
```

css:

```css
.btn2 {
  margin-top: 30px; }

.btn-left, .btn2 {
  width: 300px;
  height: 300px; }
```

### 10 sass 的运算

- 变量或属性中都可以做加法 减法运算

  ```css
  $width: 30px+2in;

  div {
    width:$width;
    height:30px+2in;    
        height:(30px/2);\\除法需要加上()

  }
  ```

- sass 字符运算

  - 用“+”对字符串进行连接

  ```css
  div:after {
    content:foo + "foo";
    content:"foo" + foo;
  }

  div:after {
    content: foofoo;
    content: "foofoo"; }
  ```

  ​



