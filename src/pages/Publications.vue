<template>
  <div class="page">
    <h1 class="title">{{ title }}</h1>
    
    <div class="filter-groups">
      <div class="filter-group">
        <span class="filter-label">Year:</span>
        <div class="filters">
          <button
            v-for="year in years"
            :key="year"
            :class="['filter', { active: selectedYear === year }]"
            @click="selectedYear = year"
          >
            {{ year }}
          </button>
        </div>
      </div>
      
      <div class="filter-group">
        <span class="filter-label">Area:</span>
        <div class="filters">
          <button
            v-for="area in areas"
            :key="area"
            :class="['filter', { active: selectedArea === area }]"
            @click="selectedArea = area"
          >
            {{ area }}
          </button>
        </div>
      </div>
    </div>

    <div class="publications">
      <div v-for="(pub, i) in filteredItems" :key="i" class="pub">
        <div class="thumbnail" :style="{ backgroundImage: pub.img ? `url(${pub.img})` : '' }"></div>
        <div class="content">
          <div class="header">
            <div>
              <h3>{{ pub.title }}</h3>
              <p class="authors">{{ pub.authors }}</p>
              <p class="venue">{{ pub.venue }}</p>
            </div>
            <span class="area-tag">{{ pub.area }}</span>
          </div>
          <div class="actions">
            <a v-if="pub.links && pub.links.paper" :href="pub.links.paper">Paper</a>
            <a v-if="pub.links && pub.links.code" :href="pub.links.code">Code</a>
            <a v-if="pub.links && pub.links.project" :href="pub.links.project">Project</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import publicationsConfig from '../configs/publications.json'

const { title, years, areas, items } = publicationsConfig
const selectedYear = ref('All')
const selectedArea = ref('All')

const filteredItems = computed(() => {
  return items.filter(item => {
    const yearOk = selectedYear.value === 'All' || item.year === selectedYear.value
    const areaOk = selectedArea.value === 'All' || item.area === selectedArea.value
    return yearOk && areaOk
  })
})
</script>

<style scoped>
.page { max-width: 1200px; margin: 0 auto; padding: 80px 32px; }
.title { font-size: 48px; font-weight: 300; text-align: center; margin: 0 0 40px; }
.filter-groups { display: flex; flex-direction: column; gap: 24px; margin-bottom: 60px; }
.filter-group { display: flex; align-items: center; justify-content: center; gap: 16px; }
.filter-label { font-size: 14px; color: #666; font-weight: 400; }
.filters { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
.filter { background: none; border: 1px solid #e5e5e5; padding: 8px 24px; font-size: 14px; color: #666; transition: all 0.2s; cursor: pointer; }
.filter:hover { border-color: #000; color: #000; }
.filter.active { border-color: #000; background: #000; color: #fff; }
.publications { display: flex; flex-direction: column; gap: 32px; }
.pub { display: flex; gap: 24px; padding: 24px; border: 1px solid #e5e5e5; transition: border-color 0.2s; }
.pub:hover { border-color: #000; }
.thumbnail { min-width: 120px; width: 120px; height: 120px; border: 1px solid #000; background: #fafafa center/cover no-repeat; }
.content { flex: 1; display: flex; flex-direction: column; gap: 16px; }
.header { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
.pub h3 { font-size: 18px; font-weight: 400; margin: 0 0 12px; }
.authors { font-size: 14px; color: #666; margin: 0 0 8px; }
.venue { font-size: 14px; color: #999; font-style: italic; margin: 0; }
.area-tag { font-size: 12px; padding: 6px 12px; border: 1px solid #000; color: #000; white-space: nowrap; }
.actions { display: flex; gap: 16px; }
.actions a { font-size: 13px; color: #000; text-decoration: none; border-bottom: 1px solid #000; transition: opacity 0.2s; }
.actions a:hover { opacity: 0.6; }
</style>

