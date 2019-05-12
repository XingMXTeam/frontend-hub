const order500 = function (orderType, pay, stock) {
    if (orderType == 1 && pay === true) {
        console.log(`500定金预购`)
    }
    else {
        return `next`
    }
}

const order200 = function (orderType, pay, stock) {
    if (orderType === 2 && pay == true) {
        console.log(`200定金预购`)
    }
    else {
        return `next`
    }
}

const order = function (orderType, pay, stock) {
    if (stock > 0) {
        console.log(`普通购买`)
    }
    else {
        console.log(`库存不足`)
    }
}


f