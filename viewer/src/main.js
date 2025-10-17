import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 全局样式: 字体、背景与文字颜色等基础样式
import './assets/global.css'
// Markdown 内容的全局样式 (渲染文章使用)
import './assets/markdown.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
