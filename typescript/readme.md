# 关键点

## 关键字interface

## declare 

## <>

一个是模版 ```<T>```
一个是类型断言 ```(<any>varname)```

## ```:```

声明变量类型
声明返回值类型

## 类的readonly

必须在声明或者构造函数被初始化

``` ts
class Test {
    readonly name: string = 1;
    constructor(readonly name: string) {} //声明的同时初始化
}

interface Test {
    readonly name: string;
}
```

const 必须初始化

readonly和const的区别：
const是一个编译期常量， readonly是一个运行时常量</li>
const只能声明基元类型，枚举类型，字符串类型。readonly则无限制
const天生为静态数据，无需再添加static标识
readonly是运行时变量，只能赋值一次。特例是可以定义时赋值一次，构造函数中再赋值一次

## 交叉类型

``` ts
function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
        (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
        }
    }
    return result;
}
```

## |

联合类型，能确定的是，它肯定有共有的成员。

如何区分类型：

``` ts
interface Bird {
    fly();
    layEggs();
}

interface Fish {
    swim();
    layEggs();
}

function getSmallPet(): Fish | Bird {
    // ...
}

let pet = getSmallPet();

// 必须多次采用断言
if ((<Fish>pet).swim) {
    (<Fish>pet).swim();
}
else {
    (<Bird>pet).fly();
}

// 自定义的类型保护
function isFish(pet: Fish | Bird): pet is Fish {
    return (<Fish>pet).swim !== undefined;
}
if (isFish(pet)) {
    pet.swim();
}
else {
    pet.fly();
}

// 或者instanceOf typeOf
```

## 类型断言手动去除null和undefined的类型提示

``` ts
function broken(name: string | null): string {
  function postfix(epithet: string) {
    return name.charAt(0) + '.  the ' + epithet; // error, 'name' is possibly null
  }
  name = name || "Bob";
  return postfix("great");
}

function fixed(name: string | null): string {
  function postfix(epithet: string) {
    return name!.charAt(0) + '.  the ' + epithet; // ok
  }
  name = name || "Bob";
  return postfix("great");
}
```

## 类型别名

type 
应该尽量使用接口，而不是别名。软件对于扩展是开放的，对于修改是封闭的。

## never

``` ts
function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
        default: return assertNever(s); // error here if there are missing cases
    }
}
```

## keyof

``` ts
function plunk(o, name) {
    return names.map(n => o[n])
}
// 索引类型查询:keyof T => 'name' | 'age'
// 索引访问: T[K]

// 会帮你检查是否是有的属性名
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map(n=>o[n])
}

function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
    return o[name]; // o[name] is of type T[K]
}

// 索引类型和字符串索引签名
interface Map<T> {
    [key: string]: T
}

let keys: keyof Map<number>;
let value: Map<number>['foo']; 
```

## 