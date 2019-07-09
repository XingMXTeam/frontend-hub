// 声明对象

// 检查至少有一个label属性
// function printLabel(labeObject:{label:string}) {
//     console.log(labeObject.label)
// }

// let myObj = {size:10, label:'Size 10 Object'}
// printLabel(myObj)

interface LabelValue {
    label: string
}

function printLabel(labeObject: LabelValue) {
    console.log(labeObject.label)
}

// 可选属性
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = {color: "white", area: 100};
    if (config.clor) {
        // Error: Property 'clor' does not exist on type 'SquareConfig'
        newSquare.color = config.clor;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let squareConfig = {colour: 'red' }
let mySquare = createSquare(squareConfig);

// 只读属性
interface Point {
    readonly x: number
    readonly y: number
}

let p1: Point = {x:10,y:10}
p1.x = 5

let a2: number[] = [1,2,3,4]
let ro2: ReadonlyArray<number> = a2
ro2[0] = 12

// readonly 用于属性 const用于变量

// 函数
interface SearchFunc {
    (source: string, subString:string):boolean
}
let mySearch:SearchFunc
mySearch = function(src, sub) {
    let result = src.search(sub)
    return result > -1
}

// indexable types
interface StringArray {
    [index: number]: string
}

let myArray: StringArray
myArray = ['bob']
let myStr: string = myArray[0]

interface NumberDictionary {
    [index: string]: number;
    length: number;    // ok, length is a number
    name: string;      // error, the type of 'name' is not a subtype of the indexer
}

interface NumberOrStringDictionary {
    readonly [index: number]: number | string;
    // length: number;    // ok, length is a number
    // name: string;      // ok, name is a string
}

let myArray22: NumberOrStringDictionary = ['Alice', 'Bob']
myArray22[2]  = 'asf'

// class types
// interface ClockInterface  {
//     currentTime: Date
//     setTime(d:Date): void
// }

// class Clock implements ClockInterface {
//     currentTime: Date = new Date()
//     constructor(h:number, m:number) {}
//     setTime(d:Date) { this.currentTime=d}
// }

// interface ClockConstructor {
//     new (hour: number, minute: number);
// }

// class Clock implements ClockConstructor {
//     currentTime: Date;
//     constructor(h: number, m: number) { }
// }

// 构造器
interface ClockConstructor {
    new (hour: number, minute: number);
}

interface ClockInterface {
    tick();
}

const Clock: ClockConstructor = class Clock implements ClockInterface {
constructor(h: number, m: number) {}
    tick() {
        console.log("beep beep");
    }
}
  
// 继承接口
interface Shape {
    color: string
}

interface PenStroke {
    penWidth: number
}

interface Square extends Shape, PenStroke {
    sideLength: number
}

let square = {} as Square
square.color = 'red'
square.sideLength = 123

// 定义多个类型的接口
interface Counter {
    (start: number): string
    interval: number
    reset():void
}

function getCounter(): Counter {
    let counter = (function(start:number){}) as Counter
    counter.interval = 123
    counter.reset = function() {}
    return counter
}

class Control {
    private state: any
}

interface SelectableControl extends Control {
    select(): void
}

class Button extends Control implements SelectableControl {
    select() {}
}

class TextButton extends Control {
    select() {}
}

class Image2 extends Control implements SelectableControl {
    select() {}
}