// example.js 
console.log('script start');
setTimeout(function () {
    console.log('setTimeout');//加入Macro Task
}, 0);

Promise.resolve().then(function () {
    console.log('promise1');//加入Micro Task
}).then(function () {
    console.log('promise2');//加入Micro Task
});
console.log('script end');