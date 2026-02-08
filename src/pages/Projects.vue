<template>
  <div class="page">
    <h1 class="title">{{ title }}</h1>
    <div class="cards">
      <RouterLink v-for="(project, i) in projects" :key="i" :to="`/projects/${project.id}`" class="card">
        <div class="card-img" :style="{ backgroundImage: project.img ? `url(${project.img})` : '' }"></div>
        <h3>{{ project.title }}</h3>
        <p>{{ project.desc }}</p>
        <span class="link">Learn more →</span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import projectsConfig from '../configs/projects.json'

const { title, items: projects } = projectsConfig
</script>

<style scoped>
.page { max-width: 1200px; margin: 0 auto; padding: 80px 32px; }
.title { font-size: 48px; font-weight: 300; text-align: center; margin: 0 0 60px; }
.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
.card { border: 1px solid #e5e5e5; padding: 0; transition: all 0.3s; text-decoration: none; display: block; cursor: pointer; }
.card:hover { border-color: #000; transform: translateY(-4px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
.card-img { height: 200px; background: #f5f5f5; }
.card h3 { font-size: 20px; font-weight: 400; margin: 24px 24px 12px; color: #000; }
.card p { font-size: 14px; color: #666; line-height: 1.6; margin: 0 24px 16px; }
.card .link { display: inline-block; font-size: 13px; color: #000; margin: 0 24px 24px; transition: transform 0.2s; }
.card:hover .link { transform: translateX(4px); }
</style>


