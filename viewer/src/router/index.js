import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import MarkdownViewer from '../views/MarkdownViewer.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/guide/:id',
    name: 'Guide',
    component: MarkdownViewer
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
