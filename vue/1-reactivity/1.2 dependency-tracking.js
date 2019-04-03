class Dep {
    constructor() {
        this.subscribers = new Set()
    }
    depend() {
        if(activeUpdate) {
            // register the subscriber
            this.subscribers.add(activeUpdate)
        }
    }
    notify() {
        // run all the subscribers
        this.subscribers.forEach(sub => sub())
    }
}

let activeUpdate

const autorun = function (update) {
    // wrapper update aimed to rerun it in notify method of Dep class
    function wrapperUpdate() {
        activeUpdate = wrapperUpdate
        update()
        activeUpdate = null
    }
    wrapperUpdate()
}