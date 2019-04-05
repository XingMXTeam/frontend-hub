const RulePlugin = {
    install(Vue) {
        Vue.mixin({
            created() {
                if(this.$options.rules) {
                    Object.keys(this.$options.rules).forEach(key => {
                        const rule = this.$options.rules[key]
                        this.$watch(key, newValue => {
                            if(!rule.validate(newValue)) {
                                console.log(rule.message)
                            }
                        })
                    })
                }
            }
        })
    }
}