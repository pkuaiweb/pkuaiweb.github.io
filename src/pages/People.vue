<template>
  <div class="page">
    <h1 class="title">{{ title }}</h1>
    
    <section class="section">
      <h2>{{ principalInvestigatorTitle }}</h2>
      <div class="people-cards">
        <div class="person-card">
          <div class="avatar" :style="{ backgroundImage: pi.avatar ? `url(${pi.avatar})` : '' }"></div>
          <h3>{{ pi.name }}</h3>
          <p class="role">{{ pi.role }}</p>
          <p class="bio">{{ pi.bio }}</p>
          <div class="links">
            <a :href="pi.email">Email</a>
            <a :href="pi.website">Website</a>
          </div>
        </div>
      </div>
    </section>

    <section v-for="(section, i) in sections" :key="i" class="section">
      <h2>{{ section.title }}</h2>
      <div class="people-grid">
        <div v-for="(person, j) in section.people" :key="j" class="person-card-small">
          <div class="avatar-small" :style="{ backgroundImage: person.avatar ? `url(${person.avatar})` : '' }"></div>
          <h4>{{ person.name }}</h4>
          <p>{{ person.role }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import peopleConfig from '../configs/people.json'

const { title, principalInvestigatorTitle, principalInvestigator: pi, sections } = peopleConfig
</script>

<style scoped>
.page { max-width: 1200px; margin: 0 auto; padding: 80px 32px; }
.title { font-size: 48px; font-weight: 300; text-align: center; margin: 0 0 80px; }
.section { margin-bottom: 80px; }
.section h2 { font-size: 28px; font-weight: 300; margin: 0 0 32px; }
.people-cards { display: flex; justify-content: center; }
.person-card { max-width: 400px; text-align: center; padding: 32px; border: 1px solid #e5e5e5; }
.avatar { width: 120px; height: 120px; border-radius: 50%; background: #f0f0f0 center/cover no-repeat; margin: 0 auto 20px; }
.person-card h3 { font-size: 24px; font-weight: 400; margin: 0 0 8px; }
.role { font-size: 14px; color: #666; margin: 0 0 16px; }
.bio { font-size: 14px; color: #666; line-height: 1.6; margin: 0 0 20px; }
.links { display: flex; gap: 16px; justify-content: center; }
.links a { font-size: 13px; color: #000; text-decoration: none; border-bottom: 1px solid #000; }
.people-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; }
.person-card-small { text-align: center; padding: 24px; border: 1px solid #e5e5e5; transition: border-color 0.2s; }
.person-card-small:hover { border-color: #000; }
.avatar-small { width: 80px; height: 80px; border-radius: 50%; background: #f0f0f0 center/cover no-repeat; margin: 0 auto 16px; }
.person-card-small h4 { font-size: 16px; font-weight: 400; margin: 0 0 8px; }
.person-card-small p { font-size: 13px; color: #666; margin: 0; }
</style>

