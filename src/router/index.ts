import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const todoView = import('src/views/todo-list/index.vue')

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/all'
	},
	{
		path: '/all',
		name: 'All',
		component: () => todoView
	},
	{
		path: '/active',
		name: 'Active',
		component: () => todoView
	},
	{
		path: '/completed',
		name: 'Completed',
		component: () => todoView
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
