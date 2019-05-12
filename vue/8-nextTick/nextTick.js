const callbacks = []
let pending = false
// 执行所有回调
const flushCallbacks = function () {
    pending = false
    const copies = callbacks.slice(0)
    copies.forEach(copy => {
        copy()
    })
}

let timerFunc
if (typeof Promise !== 'undefined') {
    // 将所有callbacks的执行放到Promise微任务中
    const p = Promise.resolve()
    timerFunc = () => {
        p.then(flushCallbacks)
    }
}
// else if (typeof MutationObserver != 'undefined') {
//     let counter = 1
//     // 加入微任务
//     const observer = new MutationObserver(flushCallbacks)
//     const textNode = document.createTextNode(String(counter))
//     observer.observe(textNode, {
//         characterData: true
//     })
//     timerFunc = () => {
//         counter = (counter + 1) % 2
//         // 修改数据
//         textNode.data = String(counter)
//     }
// }
// setImmediate
// setTimeout


export default function nextTick(cb, ctx) {
    let _resolve
    // 收集所有回调
    callbacks.push(() => {
        if (cb) {
            try {
                cb.call(ctx)
            } catch (e) {
                console.log(`error`)
            }
        }
        else if (_resolve) {
            _resolve(ctx)
        }
    })
    // 执行微任务
    if (!pending) {
        pending = true
        timerFunc()
    }
    if (!cb && tpypeOf Promise !== 'undefined') {
        return new Promise(resolve => {
            _resolve = resolve
        })
    }
};