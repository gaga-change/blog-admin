// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'simplemde/dist/simplemde.min.css'
import api from './api'

Vue.use(ElementUI)
Vue.use(VueRouter)

Vue.config.productionTip = false

Vue.prototype.$API = api.call(new Vue()) // 全局配置api


// 全局路由钩子
router.beforeEach(async (to, from, next) => {
    if (to.name == 'UserLogin') return next()
    let vm = new Vue()
    let body = await vm.$API.user()
    if (body.data) {
        next()
    } else {
        next({name: 'UserLogin'})
    }
})
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
