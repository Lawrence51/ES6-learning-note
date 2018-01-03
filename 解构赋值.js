一、ES6允许按照一定的模式，丛数组和对象中提取值，对变量进行赋值，这被称为结构赋值。
eg：let [a, b, c] = [1, 2, 3];

本质上，只要等号两边的模式相同，左边的变量就会被赋予对应的值。

除此外还有不完全解构，例如下：
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [, , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []

如果解构不成功，变量的值就等于undefined。还有如下：
let [foo] = [];
let [bar, foo] = [1];



另一种情况是不完全解构，等号左右不匹配，但是人就可以成功。
let [x, y] = [1, 2, 3];
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4

以上两个都是
如果等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错。
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
对于set结构，也可以使用数组的解构赋值
let [x, y, z] = new Set(['a', 'b', 'c']);
x // "a"

事实上，只要某种数据结构具有iterator接口，都可以采用数组形式的
function* fibs() {
    let a = 0;
    let b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

let [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5

默认值
解构复制允许指定默认值
let [foo = true] = [];
foo // true
let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
ES6内部使用“===”用来判断一个位置是否有值，所以一个数组成员不严格等于undefined，默认值不会生效（类似null等）。
默认值可以引用解构赋值的其他变量，但该变量必须已经声明。
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError

上面最后一个表达式之所以会报错，是因为x用到默认值y时，y还没有声明。

2、对象的解构赋值
解构赋值可以用于数组和对象
let { foo, bar } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"
但是数组是按照位置来取，对象没有次序，变量名与属性同名，才能取到正确的值。如果变量名不同于属性名，则需要写成这样：
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };

也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者

3、字符串的解构赋值
字符串也可以解构赋值，因为这个时候，字符串转换为了一个类似数组的对象
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
let { length: len } = 'hello';
len // 5

5、函数参数的解构赋值
函数的参数也可以使用解构赋值。
function add([x, y]) {
    return x + y;
}
add([1, 2]); // 3

上面代码中，函数add的参数表面上是一个数组，但在传入参数的那一刻，数组参数就被解构成变量x和y。对于函数内部的代码来说，它们能感受到的参数就是x和y。例如：
[[1, 2], [3, 4]].map(([a, b]) => a + b);// [ 3, 7 ]

6、圆括号问题
解构赋值虽然很方便，但是解析起来并不容易。对于编译器来说，一个式子到底是模式，还是表达式，没有办法从一开始就知道，必须解析到（或解析不到）等号才能知道。
由此带来的问题是，如果模式中出现圆括号怎么处理。ES6 的规则是，只要有可能导致解构的歧义，就不得使用圆括号。

7、用途
1）交换变量的值
不再需要中间变量 let x = 1; let y = 2;[x, y] = [y, x];




