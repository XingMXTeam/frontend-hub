const RulePlugin = {
    // 构造方法
    install(Vue) {
        // Vue.directive('my-directive', {=
        // })
        // Vue.
        // Vue.prototype.$myMethod
        // 添加给全局组件选项
        Vue.mixin({
            created() {
                if (this.$options.rules) {
                    Object.keys(this.$options.rules).forEach(key => {
                        const rule = this.$options.rules[key]
                        this.$watch(key, newValue => {
                            if (!rule.validate(newValue)) {
                                console.log(rule.message)
                            }
                        })
                    })
                }
            }
        })
    }
}