import Vue from 'vue'
import Router from 'vue-router'
import AdminHome from '@/pages/AdminHome'
import Default from '@/pages/content/Default'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: AdminHome,
      children: [
        {
          path: '',
          name: 'Default',
          component: Default
        }
      ]
    }
  ]
})
