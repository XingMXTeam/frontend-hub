# async

async本质上是promise和generator的语法糖，它返回一个promise。
内部会自动执行generator。

用foreach处理async await要注意

csrf 跨域一定程度上能解决 但是如果表单提交的话 没办法。
csrf 一般会在网站上给你一个token，然后请求的时候带上表明是你的站点请求。但是token也
有可能被拿到对吧。referer请求头。或者通过setcookie： same-site 保证是同一个站点过来的
请求。

304表明是协商缓存命中。 etag结合last-modifed头。 优先是etag。

每一个对象都有一个__proto__属性 指向原型对象。 也就是构造函数的prototype
__proto_将原型对象练习起来

new:
create(Con):

// 创建一个对象
let obj = {}
// 增加__proto__属性 
obj.__proto__ = Con.prototype
// 执行构造函数
let result = Con.call(obj, arguments)

nextTick:

用一个队列缓存所有回调。通过Promise创建一个微任务。
然后当微任务执行的时候。依次执行回调函数。所以nextTick是异步的，并且这样
不会频繁更新DOM。



npx执行一个命令如果不在环境变量中，它会自动安装，并且运行，然后不影响全局命令。

视频方案有多种：基于rem的等比缩放策略； 一种是基于vm vh的方式。






