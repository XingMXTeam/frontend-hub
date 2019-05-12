import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

// 如果需要多个Store怎么办？？
new Vue({
    store,//将store对象（本质上是vue对象）挂载到入口Vue
    render: h => h(App)
}).$mount('#app')
