import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
	{
		path: '/login',
		name: 'login',
		component: () => import(/* webpackChunkName: 'login' */ '@/views/Login.vue')
	},
	{
		path: '/reg',
		name: 'reg',
		component: () => import(/* webpackChunkName: 'register' */ '@/views/Reg.vue')
	},
	{
		path: '/forget',
		name: 'forget',
		component: () => import(/* webpackChunkName: 'forget' */ '@/views/Forget.vue')
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
