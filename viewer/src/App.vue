<template>
  <!-- 页面仅负责渲染路由出口，遵循“一个文件只干一件事”的职责原则 -->
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style>
/* 将通用样式上移到全局样式文件，避免在根组件重复定义 */
</style>
