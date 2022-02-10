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
	plugins: createVitePlugins()
})
