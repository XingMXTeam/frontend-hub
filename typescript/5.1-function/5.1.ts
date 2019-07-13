// 声明类型
function buildName(firstName: string, lastName: string) {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // error, too few parameters

let myAdd: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };

function buildName(firstName: string, lastName?: string) {}

function buildName(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob"); // works correctly now, returns "Bob Smith"

