<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'

const selectedDistrict = ref<number | null>(null)
const showPopup = ref(false)

const currentAlerts = ref<string[]>([])
const currentActivities = ref<string[]>([])
const newAlert = ref("")

const fetchDistrictData = async (districtId: number) => {
  try {
    const res = await axios.get(`/api/districts/${districtId}`)
    currentAlerts.value = res.data.alerts || []
    currentActivities.value = res.data.activities || []
  } catch (error) {
    console.error("Erreur lors de la récupération du district :", error)
    currentAlerts.value = []
    currentActivities.value = []
  }
}

const handleDistrictClick = async (districtId: number) => {
  selectedDistrict.value = districtId
  await fetchDistrictData(districtId)
  showPopup.value = true
}

const closePopup = () => {
  showPopup.value = false
}

const addAlert = async () => {
  if (!newAlert.value.trim() || selectedDistrict.value === null) return

  try {
    await axios.post(`/api/districts/${selectedDistrict.value}/alerts`, {
      alert: newAlert.value
    })
    currentAlerts.value.push(newAlert.value)
    newAlert.value = ""
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'alerte :", error)
  }
}

// Données statiques de la carte
const districts = [
  { id: 1, path: "M320,190 L380,170 L400,210 L370,260 L320,250 Z", color: "#7BC142", labelX: 355, labelY: 215 },
  { id: 2, path: "M320,250 L370,260 L350,320 L300,330 L290,290 Z", color: "#7BC142", labelX: 330, labelY: 290 },
  { id: 3, path: "M400,210 L450,180 L480,240 L440,290 L400,280 L370,260 Z", color: "#29ABE2", labelX: 430, labelY: 235 },
  { id: 4, path: "M320,130 L380,170 L320,190 L280,170 Z", color: "#7BC142", labelX: 325, labelY: 165 },
  { id: 5, path: "M180,190 L280,170 L320,190 L320,250 L290,290 L240,280 L200,240 Z", color: "#F7941D", labelX: 250, labelY: 230 },
  { id: 6, path: "M450,180 L510,170 L520,230 L480,240 Z", color: "#29ABE2", labelX: 490, labelY: 205 },
  { id: 7, path: "M350,320 L400,280 L440,290 L430,360 L380,380 L350,350 Z", color: "#29ABE2", labelX: 400, labelY: 330 },
  { id: 8, path: "M430,360 L470,340 L510,380 L470,420 L380,380 Z", color: "#29ABE2", labelX: 455, labelY: 380 },
  { id: 9, path: "M130,160 L180,190 L200,240 L170,280 L120,240 Z", color: "#F7941D", labelX: 150, labelY: 220 }
]

const water = {
  path: "M370,260 L400,280 L350,320 L300,330 L290,290 L320,250 Z",
  color: "#B3E3F9"
}
</script>

<template>
  <div class="map-container">
    <svg viewBox="100 100 450 350" width="100%" height="100%">
      <!-- Zone d'eau -->
      <path :d="water.path" :fill="water.color" stroke="#fff" stroke-width="2" />

      <!-- Districts -->
      <g v-for="district in districts" :key="district.id">
        <path
            :d="district.path"
            :fill="district.color"
            stroke="#fff"
            stroke-width="2"
            :class="['district', { selected: selectedDistrict === district.id }]"
            @click="handleDistrictClick(district.id)"
        />
        <text :x="district.labelX" :y="district.labelY" fill="#fff" text-anchor="middle" class="district-number">
          {{ district.id }}
        </text>
      </g>
    </svg>

    <!-- Popup -->
    <div v-if="showPopup" class="popup-overlay" @click.self="closePopup">
      <div class="popup-content">
        <h2>District {{ selectedDistrict }}</h2>

        <h3>🚨 Alertes</h3>
        <ul>
          <li v-if="currentAlerts.length === 0">Aucune alerte</li>
          <li v-for="(alert, i) in currentAlerts" :key="'alert-' + i">{{ alert }}</li>
        </ul>

        <div class="add-alert">
          <input v-model="newAlert" placeholder="Nouvelle alerte..." />
          <button @click="addAlert">Ajouter</button>
        </div>

        <h3>🎯 Activités</h3>
        <ul>
          <li v-if="currentActivities.length === 0">Aucune activité</li>
          <li v-for="(activity, i) in currentActivities" :key="'activity-' + i">{{ activity }}</li>
        </ul>

        <button class="close-btn" @click="closePopup">Fermer</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.map-container {
  background-color: #f0f8ff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.1);
  width: 100%;
  height: 100%;
  position: relative;
}

.district {
  cursor: pointer;
  transition: opacity 0.2s ease;
}
.district:hover {
  opacity: 0.8;
}
.district.selected {
  stroke: #000;
  stroke-width: 3;
}
.district-number {
  font-size: 14px;
  font-weight: bold;
  user-select: none;
  pointer-events: none;
}

/* POPUP */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 50, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup-content {
  background: white;
  color: #003366;
  padding: 2rem;
  border-radius: 12px;
  width: 32vw;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}
.popup-content h2 {
  margin-bottom: 1rem;
  color: #007BFF;
}
.popup-content h3 {
  margin-top: 1.5rem;
  color: #0056b3;
}
.popup-content ul {
  padding-left: 1.2rem;
  margin-bottom: 1rem;
}

.add-alert {
  display: flex;
  margin-bottom: 1.5rem;
}
.add-alert input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #007BFF;
  border-radius: 6px;
  margin-right: 0.5rem;
}
.add-alert button {
  background: #007BFF;
  border: none;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}
.add-alert button:hover {
  background-color: #0056b3;
}

.close-btn {
  background-color: #dc3545;
  border: none;
  color: white;
  font-weight: bold;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
}
.close-btn:hover {
  background-color: #c82333;
}
</style>
