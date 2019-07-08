// 解构并声明类型
let o = {a:'dsas',b:123}
let { a, b }: { a: string, b: number } = o;

// 参数声明类型
function keepWholeObject(wholeObject: { a: string, b?: number }) {
    let { a, b = 1001 } = wholeObject;
}

type C = { a: string, b?: number }
function f({ a="", b=0 }: C): void {
    // ...
}

// 带着默认值
function f2({ a="", b=0 } = { a:'' }): void {
    // ...
}

f2({ a: "yes" }); // ok, default b = 0
f2(); // ok, default to { a: "" }, which then defaults b = 0
f2({}); // error, 'a' is required if you supply an argument

// 只能继承可枚举属性
class C2 {
    p = 12;
    m() {
    }
}
let c2 = new C2();
let clone = { ...c2 };
clone.p; // ok
clone.m(); // error!

