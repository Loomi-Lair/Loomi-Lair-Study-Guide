import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 说明：基础 Vite 配置，启用 Vue 插件。更多配置可按需扩展。
export default defineConfig({
  plugins: [vue()],
})
