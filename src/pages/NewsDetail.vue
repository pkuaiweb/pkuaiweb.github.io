<template>
  <div class="page" v-if="newsItem">
    <div class="breadcrumb">
      <RouterLink to="/">Home</RouterLink>
      <span class="separator">/</span>
      <span>News</span>
    </div>

    <article class="news-article">
      <div class="meta">
        <span class="date">{{ newsItem.date }}</span>
      </div>

      <h1 class="title">{{ newsItem.title }}</h1>

      <div class="content" v-html="renderedContent"></div>

      <div class="back-link">
        <RouterLink to="/">← Back to Home</RouterLink>
      </div>
    </article>
  </div>

  <div class="page" v-else>
    <h1>News Not Found</h1>
    <p>The news article you're looking for doesn't exist.</p>
    <RouterLink to="/">← Back to Home</RouterLink>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import newsData from '../configs/news.json'

const route = useRoute()
const newsId = computed(() => route.params.id)

const newsItem = computed(() => {
  return newsData.find(item => item.id === newsId.value)
})

// Simple markdown-to-HTML renderer
const renderedContent = computed(() => {
  if (!newsItem.value?.content) return ''

  let html = newsItem.value.content

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

  // Lists
  html = html.replace(/^\- (.*$)/gim, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')

  // Paragraphs
  html = html.split('\n\n').map(para => {
    if (para.startsWith('<h') || para.startsWith('<ul') || para.startsWith('<li')) {
      return para
    }
    if (para.trim() === '') return ''
    return `<p>${para}</p>`
  }).join('\n')

  return html
})
</script>

<style scoped>
.page {
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 32px;
}

.breadcrumb {
  font-size: 14px;
  color: #666;
  margin-bottom: 40px;
}

.breadcrumb a {
  color: #000;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

.breadcrumb a:hover {
  border-bottom-color: #000;
}

.separator {
  margin: 0 8px;
  color: #ccc;
}

.news-article {
  background: #fff;
}

.meta {
  margin-bottom: 16px;
}

.date {
  font-size: 14px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.title {
  font-size: 48px;
  font-weight: 300;
  line-height: 1.2;
  margin: 0 0 40px;
  color: #000;
}

.content {
  font-size: 16px;
  line-height: 1.8;
  color: #333;
}

.content :deep(h1) {
  font-size: 36px;
  font-weight: 400;
  margin: 40px 0 20px;
}

.content :deep(h2) {
  font-size: 28px;
  font-weight: 400;
  margin: 32px 0 16px;
}

.content :deep(h3) {
  font-size: 22px;
  font-weight: 400;
  margin: 24px 0 12px;
}

.content :deep(p) {
  margin: 0 0 20px;
}

.content :deep(ul) {
  margin: 20px 0;
  padding-left: 0;
  list-style: none;
}

.content :deep(li) {
  margin: 8px 0;
  padding-left: 24px;
  position: relative;
}

.content :deep(li)::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #666;
  font-weight: bold;
}

.content :deep(strong) {
  font-weight: 500;
  color: #000;
}

.back-link {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid #f0f0f0;
}

.back-link a {
  font-size: 14px;
  color: #666;
  text-decoration: none;
  transition: color 0.2s;
}

.back-link a:hover {
  color: #000;
}
</style>
