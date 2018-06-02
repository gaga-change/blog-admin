import Vue from 'vue'
import Router from 'vue-router'
import AdminHome from '@/pages/AdminHome'
import test from '@/pages/test'
import PostCreate from '@/pages/content/PostCreate'
import PostList from '@/pages/content/PostList'
import WebSet from '@/pages/content/WebSet'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			component: AdminHome,
			children: [
				{
					path: '',
					name: 'PostCreate',
					component: PostCreate
				},
				{
					path: 'post_list',
					name: 'PostList',
					component: PostList
				},
				{
					path: 'web_set',
					name: 'WebSet',
					component: WebSet
				},
			]
		},
		{
			path: '/test',
			component: test,
			component: test
		}
	]
})
