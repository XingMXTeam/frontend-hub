
function identity1<T>(arg: T): T {
    return arg;
}
let ouput = identity1<string>('sdf')

let myIdentity2: <T>(arg: T) => T = identity1;
let myIdentity3: {<T>(arg: T): T} = identity1;

function identity2<T>(arg: Array<T>): Array<T> {
    return arg
}

function identity3<T>(arg: T[]): T[] {
    return arg
}


