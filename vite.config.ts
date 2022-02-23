import { defineConfig } from 'vite'
import { resolve } from 'path'
import { createVitePlugins } from './build/plugins'

function pathResolve(dir) {
	return resolve(process.cwd(), '.', dir)
}
// https://vitejs.dev/config/
export default defineConfig({
	server: {
		host: true,
		open: true,
		port: 9999
	},
	base: '/todo-list/',
	resolve: {
		alias: [
			{
				find: /\/@\//,
				replacement: pathResolve('src') + '/'
			},
			{
				find: 'src/',
				replacement: pathResolve('src') + '/'
			},
			{
				find: /\/#\//,
				replacement: pathResolve('types') + '/'
			}
		]
	},
	build: {
		target: 'es2015',
		outDir: 'todo-list',
		terserOptions: {
			compress: {
				keep_infinity: true,
				// 生产环境删除console
				drop_console: true
			}
		},
		// 关闭brotliSize显示可以稍微缩短打包时间
		brotliSize: true,
		// chunk 大小警告的限制（以 kbs 为单位）默认500
		chunkSizeWarningLimit: 2000
	},
	plugins: createVitePlugins()
})
