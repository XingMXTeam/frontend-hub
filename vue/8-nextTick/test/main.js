import Vue from 'vue'
import Test from './Test.vue'

Vue.config.productionTip = false

// 如果需要多个Store怎么办？？
new Vue({
    render: h => h(Test)
}).$mount('#app')
