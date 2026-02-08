<template>
  <div class="home">
    <section class="hero">
      <canvas ref="particleCanvas" class="particle-bg"></canvas>
      <div class="hero-content">
        <h1>{{ heroTitle }}</h1>
        <p class="subtitle">{{ heroSubtitle }}</p>
        <div class="cta-buttons">
          <RouterLink to="/projects" class="cta">Projects</RouterLink>
          <RouterLink to="/people" class="cta">People</RouterLink>
          <RouterLink to="/publications" class="cta">Publications</RouterLink>
          <RouterLink to="/awards" class="cta">Awards</RouterLink>
        </div>
      </div>
    </section>

    <section class="highlights">
      <RouterLink v-for="h in highlights" :key="h.id" :to="`/projects/${h.id}`" class="card">
        <p>{{ h.title }}</p>
        <span class="arrow">→</span>
      </RouterLink>
    </section>

    <section class="news">
      <h2>Latest News</h2>
      <RouterLink v-for="n in news" :key="n.id" :to="`/news/${n.id}`" class="item">
        <span class="date">{{ n.date }}</span>
        <span class="title">{{ n.title }}</span>
        <span class="arrow">→</span>
      </RouterLink>
    </section>

    <footer class="footer">
      <p>{{ email }} · {{ address }}</p>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import homeConfig from '../configs/home.json'

const { heroTitle, heroSubtitle, highlights, news, email, address } = homeConfig

const particleCanvas = ref(null)
let animationId = null

onMounted(() => {
  const canvas = particleCanvas.value
  const ctx = canvas.getContext('2d')
  
  const resize = () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }
  resize()
  window.addEventListener('resize', resize)
  
  const particles = []
  const particleCount = 80
  const connectionDistance = 120
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.vx = (Math.random() - 0.5) * 0.5
      this.vy = (Math.random() - 0.5) * 0.5
      this.radius = Math.random() * 1.5 + 0.5
    }
    
    update() {
      this.x += this.vx
      this.y += this.vy
      
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1
    }
    
    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
      ctx.fill()
    }
  }
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }
  
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    particles.forEach(p => {
      p.update()
      p.draw()
    })
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.15
          ctx.beginPath()
          ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`
          ctx.lineWidth = 0.5
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }
    
    animationId = requestAnimationFrame(animate)
  }
  
  animate()
  
  onUnmounted(() => {
    window.removeEventListener('resize', resize)
    if (animationId) cancelAnimationFrame(animationId)
  })
})
</script>

<style scoped>
.home { max-width: 1200px; margin: 0 auto; padding: 0 32px; }
.hero { position: relative; padding: 120px 0 80px; text-align: center; }
.particle-bg { position: absolute; top: 0; left: -5%; width: 110%; height: 120%; z-index: 0; pointer-events: none; }
.hero-content { position: relative; z-index: 1; }
.hero h1 { font-size: 56px; font-weight: 300; letter-spacing: -1px; margin: 0 0 16px; }
.subtitle { font-size: 20px; color: #666; font-weight: 300; margin: 0 0 32px; }
.cta-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.cta { display: inline-block; border: 1px solid #000; background: #000; color: #fff; padding: 12px 28px; cursor: pointer; font-size: 14px; transition: all 0.2s; text-decoration: none; }
.cta:hover { background: #fff; color: #000; }

.highlights { position: relative; z-index: 2; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin: 80px 0; background: #fff; }
.card { border: 1px solid #e5e5e5; padding: 32px 24px; text-align: center; text-decoration: none; transition: all 0.3s; position: relative; overflow: hidden; cursor: pointer; }
.card:hover { border-color: #000; transform: translateY(-4px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
.card:hover .arrow { opacity: 1; transform: translateX(0); }
.card p { margin: 0; font-size: 15px; color: #333; transition: color 0.3s; }
.card:hover p { color: #000; }
.card .arrow { position: absolute; bottom: 16px; right: 16px; font-size: 18px; color: #000; opacity: 0; transform: translateX(-8px); transition: all 0.3s; }

.news { margin: 100px 0; }
.news h2 { font-size: 32px; font-weight: 300; text-align: center; margin: 0 0 32px; }
.item { display: flex; gap: 24px; padding: 16px 0; border-bottom: 1px solid #f0f0f0; text-decoration: none; transition: all 0.2s; position: relative; }
.item:hover { padding-left: 8px; background: #fafafa; }
.item:hover .arrow { opacity: 1; transform: translateX(0); }
.date { font-size: 13px; color: #999; min-width: 60px; }
.title { font-size: 14px; color: #333; flex: 1; }
.arrow { font-size: 14px; color: #999; opacity: 0; transform: translateX(-8px); transition: all 0.2s; }

.footer { padding: 60px 0 40px; text-align: center; border-top: 1px solid #f0f0f0; margin-top: 100px; }
.footer p { margin: 0; font-size: 13px; color: #999; }
</style>

