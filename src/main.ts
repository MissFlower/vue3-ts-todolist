import { createApp } from 'vue'
import { router } from 'src/router'
import App from './App.vue'
import 'virtual:windi.css'

createApp(App).use(router).mount('#app')
