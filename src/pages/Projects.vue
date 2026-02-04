<template>
  <div class="page">
    <h1 class="title">{{ title }}</h1>
    <div class="cards">
      <div v-for="(project, i) in projects" :key="i" class="card">
        <div class="card-img" :style="{ backgroundImage: project.img ? `url(${project.img})` : '' }"></div>
        <h3>{{ project.title }}</h3>
        <p>{{ project.desc }}</p>
        <a :href="project.link">Learn more →</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import projectsConfig from '../configs/projects.json'

const { title, items: projects } = projectsConfig
</script>

<style scoped>
.page { max-width: 1200px; margin: 0 auto; padding: 80px 32px; }
.title { font-size: 48px; font-weight: 300; text-align: center; margin: 0 0 60px; }
.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
.card { border: 1px solid #e5e5e5; padding: 0; transition: all 0.3s; }
.card:hover { border-color: #000; transform: translateY(-4px); }
.card-img { height: 200px; background: #f5f5f5; }
.card h3 { font-size: 20px; font-weight: 400; margin: 24px 24px 12px; }
.card p { font-size: 14px; color: #666; line-height: 1.6; margin: 0 24px 16px; }
.card a { display: inline-block; font-size: 13px; color: #000; text-decoration: none; margin: 0 24px 24px; transition: transform 0.2s; }
.card a:hover { transform: translateX(4px); }
</style>


