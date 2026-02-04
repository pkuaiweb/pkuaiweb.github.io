<template>
  <div class="app">
    <header class="header">
      <div class="left">
        <div class="logo">{{ logo }}</div>
        <span class="name">{{ labName }}</span>
      </div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/projects">Projects</RouterLink>
        <RouterLink to="/people">People</RouterLink>
        <RouterLink to="/publications">Publications</RouterLink>
        <RouterLink to="/awards">Awards</RouterLink>
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import appConfig from './configs/app.json'

const { logo, labName } = appConfig
</script>

<style scoped>
.app { min-height: 100vh; }
.header { display: flex; align-items: center; justify-content: space-between; padding: 20px 32px; border-bottom: 1px solid #f0f0f0; }
.left { display: flex; align-items: center; gap: 12px; }
.logo { width: 40px; height: 40px; border: 1px solid #000; display: grid; place-items: center; font-weight: 300; font-size: 18px; }
.name { font-size: 16px; font-weight: 400; }
nav { display: flex; gap: 32px; }
nav a { 
  position: relative;
  color: #666; 
  text-decoration: none; 
  font-size: 14px; 
  transition: color 0.3s;
  padding-bottom: 4px;
  user-select: none;
  -webkit-user-drag: none;
}
nav a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 1px;
  background: #000;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}
nav a:hover {
  color: #000;
  font-weight: 500;
}
nav a:hover::after {
  width: 100%;
}
nav a.router-link-active { 
  color: #000;
  font-weight: 500;
}
nav a.router-link-active::after {
  width: 100%;
}
</style>
