<script setup>
import { ref } from 'vue'
import axios from 'axios'

const selectedDistrict = ref(null)
const showPopup = ref(false)

const allAlerts = ref([])
const allActivities = ref([])

const filteredAlerts = ref([])
const filteredActivities = ref([])

const newAlertDescription = ref("")
const newActivityTitle = ref("")
const newActivityDescription = ref("")

const fetchData = async () => {
  try {
    const alertsRes = await axios.get("http://localhost:8081/api/signal/")
    const activitiesRes = await axios.get("http://localhost:8081/api/propActivity/")
    allAlerts.value = alertsRes.data
    allActivities.value = activitiesRes.data
    filterData()
  } catch (err) {
    console.error("❌ Erreur récupération :", err)
    allAlerts.value = []
    allActivities.value = []
  }
}

const filterData = () => {
  if (!selectedDistrict.value) return
  const zone = String(selectedDistrict.value)
  filteredAlerts.value = allAlerts.value.filter(item => item.quartier === zone)
  filteredActivities.value = allActivities.value.filter(item => item.quartier === zone)
}

const handleDistrictClick = async (districtId) => {
  selectedDistrict.value = districtId
  await fetchData()
  showPopup.value = true
}

const closePopup = () => {
  showPopup.value = false
}

const addAlert = async () => {
  if (!newAlertDescription.value.trim() || selectedDistrict.value === null) return
  try {
    await axios.post("http://localhost:8081/api/signal/", {
      description: newAlertDescription.value,
      quartier: String(selectedDistrict.value)
    })
    newAlertDescription.value = ""
    await fetchData()
  } catch (err) {
    console.error("❌ Erreur ajout alerte :", err)
  }
}

const addActivity = async () => {
  if (!newActivityTitle.value.trim() || !newActivityDescription.value.trim() || selectedDistrict.value === null) return
  try {
    await axios.post("http://localhost:8081/api/propActivity/", {
      titre: newActivityTitle.value,
      description: newActivityDescription.value,
      quartier: String(selectedDistrict.value)
    })
    newActivityTitle.value = ""
    newActivityDescription.value = ""
    await fetchData()
  } catch (err) {
    console.error("❌ Erreur ajout activité :", err)
  }
}

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
      <path :d="water.path" :fill="water.color" stroke="#fff" stroke-width="2" />
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
          <li v-if="filteredAlerts.length === 0">Aucune alerte</li>
          <li v-for="(alert, i) in filteredAlerts" :key="'alert-' + i">{{ alert.description }}</li>
        </ul>
        <div class="add-block">
          <input v-model="newAlertDescription" placeholder="Nouvelle alerte..." />
          <button @click="addAlert">Ajouter</button>
        </div>

        <h3>🎯 Activités</h3>
        <ul>
          <li v-if="filteredActivities.length === 0">Aucune activité</li>
          <li v-for="(act, i) in filteredActivities" :key="'act-' + i">
            <strong>{{ act.titre }}</strong><br />
            {{ act.description }}
          </li>
        </ul>
        <div class="add-block">
          <input v-model="newActivityTitle" placeholder="Titre activité" />
          <input v-model="newActivityDescription" placeholder="Description..." />
          <button @click="addActivity">Ajouter</button>
        </div>

        <button class="close-btn" @click="closePopup">Fermer</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.map-container {
  background: #f8fbff;
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  width: 100%;
  height: 100%;
  position: relative;
}

.district {
  cursor: pointer;
  transition: opacity 0.25s ease, stroke-width 0.25s ease;
}
.district:hover {
  opacity: 0.9;
}
.district.selected {
  stroke: #003366;
  stroke-width: 3;
}
.district-number {
  font-size: 14px;
  font-weight: 600;
  user-select: none;
  pointer-events: none;
}

/* Popup overlay */
.popup-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex; justify-content: center; align-items: center;
  z-index: 1000;
}

/* Popup content */
.popup-content {
  background: #ffffff;
  color: #1a1a1a;
  padding: 2rem;
  border-radius: 16px;
  width: 400px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  animation: popup-fade 0.3s ease;
}
@keyframes popup-fade {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Titles */
.popup-content h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #007bff;
}
.popup-content h3 {
  font-size: 1.1rem;
  margin-top: 1.5rem;
  color: #0056b3;
}

/* List & alert/activity blocks */
.popup-content ul {
  padding-left: 1.2rem;
  margin-bottom: 1rem;
}
.popup-content ul li {
  padding: 0.4rem 0;
  border-bottom: 1px solid #f0f0f0;
}

/* Add form blocks */
.add-block {
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.add-block input {
  padding: 0.6rem;
  border: 1.5px solid #ced4da;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: border-color 0.2s ease;
}
.add-block input:focus {
  border-color: #007bff;
  outline: none;
}
.add-block button {
  background-color: #007bff;
  color: white;
  font-weight: 600;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.25s ease;
}
.add-block button:hover {
  background-color: #0056b3;
}

/* Close button */
.close-btn {
  background-color: #dc3545;
  color: white;
  font-weight: 600;
  padding: 0.6rem 1rem;
  margin-top: 1.5rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.25s ease;
}
.close-btn:hover {
  background-color: #c82333;
}
</style>
