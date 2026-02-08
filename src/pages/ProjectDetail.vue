<template>
  <div class="page" v-if="project">
    <div class="breadcrumb">
      <RouterLink to="/">Home</RouterLink>
      <span class="separator">/</span>
      <RouterLink to="/projects">Projects</RouterLink>
      <span class="separator">/</span>
      <span>{{ project.title }}</span>
    </div>

    <article class="project-article">
      <h1 class="title">{{ project.title }}</h1>

      <div class="meta">
        <div class="tags">
          <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>

      <div class="description">{{ project.description }}</div>

      <div class="content" v-html="renderedContent"></div>

      <div class="back-link">
        <RouterLink to="/projects">← Back to Projects</RouterLink>
      </div>
    </article>
  </div>

  <div class="page" v-else>
    <h1>Project Not Found</h1>
    <p>The project you're looking for doesn't exist.</p>
    <RouterLink to="/projects">← Back to Projects</RouterLink>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import projectsData from '../configs/projects-detail.json'

const route = useRoute()
const projectId = computed(() => route.params.id)

const project = computed(() => {
  return projectsData.find(item => item.id === projectId.value)
})

// Simple markdown-to-HTML renderer
const renderedContent = computed(() => {
  if (!project.value?.content) return ''

  let html = project.value.content

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
  max-width: 900px;
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

.project-article {
  background: #fff;
}

.title {
  font-size: 48px;
  font-weight: 300;
  line-height: 1.2;
  margin: 0 0 24px;
  color: #000;
}

.meta {
  margin-bottom: 24px;
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  padding: 4px 12px;
  background: #f5f5f5;
  border: 1px solid #e5e5e5;
  font-size: 13px;
  color: #666;
  border-radius: 3px;
}

.description {
  font-size: 18px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid #f0f0f0;
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
