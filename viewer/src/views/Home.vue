<template>
  <div class="home">
    <header class="header">
      <h1>📚 Loomi Lair Study Guide</h1>
      <p class="subtitle">前端学习与知识库（示例页面）</p>
    </header>

    <div class="search-container">
      <input 
        v-model="searchQuery"
        type="text" 
        placeholder="🔍 搜索指南..." 
        class="search-input"
      />
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>正在加载指南...</p>
    </div>

    <div v-else class="guides-grid">
      <div 
        v-for="guide in filteredGuides()" 
        :key="guide.id"
        class="guide-card"
        @click="openGuide(guide.id)"
      >
        <h2 class="guide-title">{{ guide.title }}</h2>
        <p class="guide-description">{{ guide.description }}</p>
        <div class="guide-footer">
          <span class="read-more">阅读更多 →</span>
        </div>
      </div>
    </div>

    <div v-if="!loading && filteredGuides().length === 0" class="no-results">
      <p>未找到与 "{{ searchQuery }}" 匹配的指南</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// ===== 路由与状态 =====
const router = useRouter()
const guides = ref([])
const searchQuery = ref('')
const loading = ref(true)

// ===== 数据获取 =====
// 说明: 页面初始化时从静态 JSON 中读取指南索引
onMounted(async () => {
  try {
    const response = await fetch('/markdown/index.json')
    guides.value = await response.json()
  // 失败时仅记录日志, 不阻断渲染
  } catch (error) {
    console.error('加载指南索引失败:', error)
  } finally {
    loading.value = false
  }
})

// ===== 过滤逻辑 =====
const filteredGuides = () => {
  if (!searchQuery.value) return guides.value
  const query = searchQuery.value.toLowerCase()
  return guides.value.filter(guide => 
    guide.title.toLowerCase().includes(query) || 
    guide.description.toLowerCase().includes(query)
  )
}

// ===== 事件处理 =====
const openGuide = (id) => {
  router.push(`/guide/${id}`)
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem 1rem;
}

.header h1 {
  font-size: 2.5rem;
  margin: 0;
  color: #2c3e50;
}

.subtitle {
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-top: 0.5rem;
}

.search-container {
  max-width: 600px;
  margin: 0 auto 2rem;
  padding: 0 1rem;
}

.search-input {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #42b883;
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

.guides-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 0 1rem;
}

.guide-card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.guide-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-color: #42b883;
}

.guide-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  color: #2c3e50;
}

.guide-description {
  color: #7f8c8d;
  margin: 0 0 1rem 0;
  line-height: 1.5;
}

.guide-footer {
  display: flex;
  justify-content: flex-end;
}

.read-more {
  color: #42b883;
  font-weight: 600;
}

.no-results {
  text-align: center;
  padding: 3rem;
  color: #7f8c8d;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .guides-grid {
    grid-template-columns: 1fr;
    padding: 0 0.5rem;
  }

  .home {
    padding: 0.5rem;
  }
}

@media (max-width: 480px) {
  .header h1 {
    font-size: 1.5rem;
  }

  .guide-card {
    padding: 1rem;
  }

  .guide-title {
    font-size: 1.25rem;
  }
}
</style>
