# 关键点

## <>

一个是模版 ```<T>```
一个是类型断言 ```(<any>varname)```

## ```:```

声明变量类型
声明返回值类型

## 类的readonly

必须在声明或者构造函数被初始化

## 声明和初始化放在一起

``` ts
constructor(readonly/public/private name: string){}
```

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

``` ts
type Name = string;
type NameResolver = ()=>string;
function getName(n: NameResolver): Name {  }
// 类型别名也可以是泛型
type Container<T> = { value: T }
type Tree<T> = {
    value: T;
    left: Tree<T>;
    right: Tree<T>;
}
type LinkedList<T> = T & { next: LinkedList<T> };
interface Person {
    name: string
}
var people: LinkeList<Person>;
var s=people.name;
var s=people.next.name;
// 类型别名不能出现在声明右侧的任何地方

```


