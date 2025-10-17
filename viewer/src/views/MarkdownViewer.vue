<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const route = useRoute();
const router = useRouter();

const content = ref('');
const loading = ref(true);
const guides = ref([]);
const currentGuide = ref(null);
const showSidebar = ref(false);

// Configure marked for better rendering
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: true,
});

onMounted(async () => {
  try {
    const response = await fetch('/markdown/index.json');
    guides.value = await response.json();
    await loadMarkdown();
  } catch (error) {
    console.error('Failed to load guides:', error);
    loading.value = false;
  }
});

watch(() => route.params.id, () => {
  loadMarkdown();
});

const loadMarkdown = async () => {
  loading.value = true;
  const guideId = route.params.id;
  
  currentGuide.value = guides.value.find(g => g.id === guideId);
  
  if (!currentGuide.value) {
    content.value = '# Guide not found\n\nThe requested guide could not be found.';
    loading.value = false;
    return;
  }

  try {
    const response = await fetch(`/markdown/${currentGuide.value.file}`);
    const text = await response.text();
    content.value = text;
  } catch (error) {
    console.error('Failed to load markdown:', error);
    content.value = '# Error loading guide\n\nFailed to load the markdown content.';
  } finally {
    loading.value = false;
  }
};

const renderedMarkdown = computed(() => {
  const unsafeHtml = marked(content.value);
  return DOMPurify.sanitize(unsafeHtml);
});

const goHome = () => {
  router.push('/');
};

const selectGuide = (id) => {
  router.push(`/guide/${id}`);
  showSidebar.value = false;
};

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};
</script>

<template>
  <div class="markdown-viewer">
    <nav class="navbar">
      <button @click="goHome" class="nav-button home-button">
        🏠 Home
      </button>
      <h1 class="nav-title">{{ currentGuide?.title || 'Study Guide' }}</h1>
      <button @click="toggleSidebar" class="nav-button menu-button">
        ☰ Menu
      </button>
    </nav>

    <div class="layout">
      <aside :class="['sidebar', { 'sidebar-open': showSidebar }]">
        <div class="sidebar-header">
          <h2>All Guides</h2>
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
          <p>Loading guide...</p>
        </div>
        <article v-else class="markdown-content" v-html="renderedMarkdown"></article>
      </main>
    </div>
  </div>
</template>

<style scoped>
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

<style>
/* Global styles for rendered markdown */
.markdown-content {
  line-height: 1.8;
  color: #2c3e50;
}

.markdown-content h1 {
  font-size: 2.5rem;
  margin-top: 0;
  margin-bottom: 1rem;
  color: #2c3e50;
  border-bottom: 2px solid #42b883;
  padding-bottom: 0.5rem;
}

.markdown-content h2 {
  font-size: 2rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.markdown-content h3 {
  font-size: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 0.8rem;
  color: #2c3e50;
}

.markdown-content p {
  margin-bottom: 1rem;
  line-height: 1.8;
}

.markdown-content ul,
.markdown-content ol {
  margin-bottom: 1rem;
  padding-left: 2rem;
}

.markdown-content li {
  margin-bottom: 0.5rem;
}

.markdown-content code {
  background: #f4f4f4;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  color: #e83e8c;
}

.markdown-content pre {
  background: #2c3e50;
  color: #f8f8f2;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.markdown-content pre code {
  background: none;
  padding: 0;
  color: inherit;
  font-size: 0.9rem;
}

.markdown-content blockquote {
  border-left: 4px solid #42b883;
  padding-left: 1rem;
  margin-left: 0;
  color: #7f8c8d;
  font-style: italic;
}

.markdown-content a {
  color: #42b883;
  text-decoration: none;
}

.markdown-content a:hover {
  text-decoration: underline;
}

.markdown-content hr {
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 2rem 0;
}

.markdown-content table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.markdown-content th,
.markdown-content td {
  border: 1px solid #e0e0e0;
  padding: 0.8rem;
  text-align: left;
}

.markdown-content th {
  background: #f8f9fa;
  font-weight: 600;
}

.markdown-content img {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
}

/* Mobile responsive for markdown content */
@media (max-width: 768px) {
  .markdown-content h1 {
    font-size: 2rem;
  }

  .markdown-content h2 {
    font-size: 1.5rem;
  }

  .markdown-content h3 {
    font-size: 1.2rem;
  }

  .markdown-content pre {
    padding: 0.8rem;
    font-size: 0.85rem;
  }

  .markdown-content ul,
  .markdown-content ol {
    padding-left: 1.5rem;
  }
}

@media (max-width: 480px) {
  .markdown-content h1 {
    font-size: 1.5rem;
  }

  .markdown-content h2 {
    font-size: 1.3rem;
  }

  .markdown-content h3 {
    font-size: 1.1rem;
  }

  .markdown-content pre {
    padding: 0.6rem;
    font-size: 0.8rem;
  }
}
</style>
