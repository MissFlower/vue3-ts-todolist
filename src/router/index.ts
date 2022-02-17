import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/all'
	},
	{
		path: '/all',
		name: 'All',
		component: () => import('src/views/todo-list/index.vue')
	},
	{
		path: '/active',
		name: 'Active',
		component: () => import('src/views/todo-list/index.vue')
	},
	{
		path: '/completed',
		name: 'Completed',
		component: () => import('src/views/todo-list/index.vue')
	},
	{
		path: '/:pathMatch(.*)*',
		name: '404',
		redirect: '/all'
	}
]

// router
export const router = createRouter({
	history: createWebHashHistory(),
	routes,
	scrollBehavior: () => ({
		left: 0,
		top: 0
	})
	// strict: true
})
