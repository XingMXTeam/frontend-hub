// Array
let list:number[] = [1,2, 3]
let list2: Array<number>= [1,2,3]


// Tuple
let x:[string, number];

x = ['hello', 10]

// enum
enum Color { Red=1, Green=2, Blue=4 }
let c: Color = Color.Green
let colorName:string = Color[2]

// any
let notSure: any = 3
notSure = '123'
let list3: any[] = [1, true, 'free']
list[1] = 100

// void
function warnUser():void {
    console.log(`This is my warning message`)
}
let unusable: void = undefined;// 只能null undefined

// never
function error(message:string):never {
    throw new Error(message)
}

// object
declare function create(o: object | null):void

create({ prop: 0})

// create(42)

// type assertion
let someValue: any = 'this is a string'
let strLength:number = (<string>someValue).length
let strLength2:number = (someValue as string).length

