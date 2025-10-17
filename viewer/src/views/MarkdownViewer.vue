<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

// ===== 路由与状态 =====
const route = useRoute()
const router = useRouter()

const content = ref('')
const loading = ref(true)
const guides = ref([])
const currentGuide = ref(null)
const showSidebar = ref(false)

// ===== 第三方库配置 =====
// 说明: 启用 GFM/换行/标题 ID 等, 以提升 Markdown 渲染质量
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: true,
})

// ===== 数据获取 =====
onMounted(async () => {
  try {
    const response = await fetch('/markdown/index.json')
    guides.value = await response.json()
    await loadMarkdown()
  } catch (error) {
    console.error('加载指南索引失败:', error)
    loading.value = false
  }
})

// 当路由参数变化时, 重新加载对应 Markdown
watch(() => route.params.id, () => {
  loadMarkdown()
})

// ===== 方法: 加载 Markdown =====
const loadMarkdown = async () => {
  loading.value = true
  const guideId = route.params.id
  
  currentGuide.value = guides.value.find(g => g.id === guideId)
  
  if (!currentGuide.value) {
    content.value = '# 未找到文档\n\n请求的指南不存在。'
    loading.value = false
    return
  }

  try {
    const response = await fetch(`/markdown/${currentGuide.value.file}`)
    const text = await response.text()
    content.value = text
  } catch (error) {
    console.error('加载 markdown 失败:', error)
    content.value = '# 加载失败\n\n无法加载该文档内容。'
  } finally {
    loading.value = false
  }
}

// ===== 计算属性：渲染 HTML =====
const renderedMarkdown = computed(() => {
  const unsafeHtml = marked(content.value)
  return DOMPurify.sanitize(unsafeHtml)
})

// ===== 事件处理 =====
const goHome = () => {
  router.push('/')
}

const selectGuide = (id) => {
  router.push(`/guide/${id}`)
  showSidebar.value = false
}

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}
</script>

<template>
  <div class="markdown-viewer">
    <nav class="navbar">
      <button @click="goHome" class="nav-button home-button">
        🏠 首页
      </button>
      <h1 class="nav-title">{{ currentGuide?.title || '学习指南' }}</h1>
      <button @click="toggleSidebar" class="nav-button menu-button">
        ☰ 目录
      </button>
    </nav>

    <div class="layout">
      <aside :class="['sidebar', { 'sidebar-open': showSidebar }]">
        <div class="sidebar-header">
          <h2>全部指南</h2>
          <button @click="toggleSidebar" class="close-button">✕</button>
        </div>
        <ul class="guide-list">
          <li 
            v-for="guide in guides" 
            :key="guide.id"
            :class="['guide-item', { active: guide.id === route.params.id }]"
            @click="selectGuide(guide.id)"
          >
            <span class="guide-item-title">{{ guide.title }}</span>
          </li>
        </ul>
      </aside>

      <div v-if="showSidebar" class="sidebar-overlay" @click="toggleSidebar"></div>

      <main class="content">
        <div v-if="loading" class="loading">
          <div class="spinner"></div>
          <p>正在加载文档...</p>
        </div>
        <article v-else class="markdown-content" v-html="renderedMarkdown"></article>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* ===== 页面布局与导航样式 ===== */
.markdown-viewer {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background: #2c3e50;
  color: white;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-title {
  margin: 0;
  font-size: 1.2rem;
  flex: 1;
  text-align: center;
  padding: 0 1rem;
}

.nav-button {
  background: #42b883;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: background 0.3s;
}

.nav-button:hover {
  background: #35a372;
}

.menu-button {
  background: transparent;
  border: 1px solid white;
}

.menu-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.layout {
  display: flex;
  flex: 1;
  position: relative;
}

.sidebar {
  width: 280px;
  background: #f8f9fa;
  border-right: 1px solid #e0e0e0;
  padding: 1.5rem;
  overflow-y: auto;
  position: sticky;
  top: 60px;
  height: calc(100vh - 60px);
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 1.2rem;
  color: #2c3e50;
}

.close-button {
  display: none;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #7f8c8d;
}

.guide-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.guide-item {
  padding: 0.8rem;
  margin-bottom: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
  color: #2c3e50;
}

.guide-item:hover {
  background: #e0e0e0;
}

.guide-item.active {
  background: #42b883;
  color: white;
  font-weight: 600;
}

.guide-item-title {
  display: block;
}

.sidebar-overlay {
  display: none;
}

.content {
  flex: 1;
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}

.loading {
  text-align: center;
  padding: 3rem;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b883;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Mobile responsive */
@media (max-width: 768px) {
  .nav-title {
    font-size: 1rem;
  }

  .home-button {
    padding: 0.6rem 0.8rem;
    font-size: 0.8rem;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: -100%;
    width: 80%;
    max-width: 300px;
    height: 100vh;
    z-index: 200;
    transition: left 0.3s ease;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  }

  .sidebar-open {
    left: 0;
  }

  .sidebar-header {
    padding-top: 1rem;
  }

  .close-button {
    display: block;
  }

  .sidebar-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 150;
  }

  .sidebar-open ~ .sidebar-overlay {
    display: block;
  }

  .content {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .navbar {
    padding: 0.8rem;
  }

  .nav-title {
    font-size: 0.9rem;
  }

  .content {
    padding: 0.5rem;
  }
}
</style>
