async function async1() {
    console.log('async1 start');
    // 这里相当于是中断了。一般来说迭代器是需要主动触发的。
    // async因为封装了。所以等promise resolve后会触发next。
    // 所以一般来说await后面的代码是需要等同步代码代码都执行完。
    // 执行到它的微任务promise后再执行next
    await async2();
    console.log('async1 end');
}

async function async2() {
    console.log('async2 start');
    return new Promise((resolve, reject) => {
        resolve();
        console.log('async2 promise');
    })
}

console.log('script start');
setTimeout(function () {
    console.log('setTimeout');
}, 0);

async1();

new Promise(function (resolve) {
    console.log('promise1');
    resolve();
}).then(function () {
    console.log('promise2');
}).then(function () {
    console.log('promise3');
});
console.log('script end');

/**
script start
'async1 start'
'async2 start'
'async2 promise'
promise1
script end
async1 end
promise2
promise3
setTimeout
 */


/**

stack       macro queue                       micro queue
            //script.js                       //promise1
            //console.log('setTimeout');        //promise2
                                          






 */