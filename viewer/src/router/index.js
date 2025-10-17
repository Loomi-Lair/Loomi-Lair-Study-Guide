import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MarkdownViewer from '../views/MarkdownViewer.vue'

// 路由路径使用 kebab-case，名称保持简洁易懂
const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/guide/:id', name: 'guide', component: MarkdownViewer },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
