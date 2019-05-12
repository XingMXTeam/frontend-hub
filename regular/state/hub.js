import Regular from './node_modules/regularjs/dist/regular'

const eventMethodKeys = ['$emit', '$on', '$off', '$once']

const pick = function (keys, notFound) {
    return ''
}

const merge = function (data) {
    return Object.assign(this.data, data)
}

const set = function () {

}

const get = function (key) {
    if (this.data.hasOwnProperty(key)) {
        return this.data[key]
    }
}

const baseMethods = {
    merge,
    pick,
    get,
    set
}

export default function ({ name, events = [], data = {}, methods = {} }) {
    // regular组件代理了所有的数据和事件
    const hub = new Regular({
        name,
        data,
        methods,
        events
    })

    // 本身是没有data, events...
    const hubProxy = {}

    //通过Regular组件代理事件。$emit $on $off $once
    eventMethodKeys.forEach(it => {
        hub[it] = e => {
            const valid = events.includes(e)
            if (!valid) {

            }
            return hub[it].apply(hub, [...arguments])
        }
    })

    // set/get/merge/pick
    Object.keys(baseMethods).forEach(name => {
        hubProxy[name] = nil => {
            // 上下文是regular组件作为代理。
            const result = baseMethods[name].apply(hub, [...arguments])
            // 调用同步数据到其他组件
            return result
        }
    })

    // methods
    Object.keys(methods).forEach(name => {
        hubProxy[name] = nil => {
            // 上下文是hubProxy
            return methods[name].apply(hubProxy, [...arguments])
        }
    })

    hubProxy.destroy = function () {
        return hub.destroy()
    }

    // hub数据同步到其他组件
    /**
     * @param {Object} 组件实例
     */
    hubProxy.sync = function (comp, immet) {
        joinList.push(comp)
        if (immet) {
            for (let key in hub.data) {
                if (hub.data.hasOwnProperty(key) &&
                    comp.data.hasOwnProperty(key)) {
                    // 数据同步到comp
                    comp.data[key] = hub.data[key]
                    comp.$update()
                }
            }
        }
    }

    return hubProxy
}