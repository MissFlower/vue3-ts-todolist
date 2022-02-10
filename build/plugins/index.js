import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import { configStyleImportPlugin } from './styleImport'

export function createVitePlugins() {
	const vitePlugins = [
		// 解析vue template组件
		vue(),
		WindiCSS()
	]

	// vite-plugin-style-import
	vitePlugins.push(configStyleImportPlugin())

	return vitePlugins
}
