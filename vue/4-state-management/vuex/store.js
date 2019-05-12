import Vuex from 'vuex'
import Vue from 'vue'

// 插件
Vue.use(Vuex)

// Vuex.Store 创建了Vue的实例
// Vue实例挂载了commit,dispatch等方法
export default new Vuex.Store({
    state: {
        totalTvCount: 10,
        isLarryHappy: true,
        isJennyHappy: true
    },
    // 暴露给对外的接口。一般都是获取。
    getters: {
        happyStaff: state => {
            return state.isJennyHappy && state.isLarryHappy
        }
    },
    // 修改state
    mutations: {
        removeTv(state, amount) {
            state.totalTvCount -= amount
        }
    },
    // 触发动作
    actions: {
        removeTv(context, amount) {
            if (context.state.totalTvCount >= amount) {
                // 调用store的commit方法，本质上调用的是mutations里面的方法
                context.commit('removeTv', amount)
            }
        }
    }
})