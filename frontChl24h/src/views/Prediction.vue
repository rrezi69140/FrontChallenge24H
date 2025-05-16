<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const temperature = ref(0)
const humidite = ref(0)
const pluie_totale = ref(0)
const pluie_intensite_max = ref(0)
const force_vent = ref(0)
const sismicite = ref(0)
const concentration_gaz = ref(0)
const jour = ref(1)
const mois = ref('janvier')
const quartier = ref('Zone 1')

const lastPrediction = ref(null)

const moisOptions = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
const quartierOptions = ['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5']

const moisMap = {
  janvier: 1,
  février: 2,
  mars: 3,
  avril: 4,
  mai: 5,
  juin: 6,
  juillet: 7,
  août: 8,
  septembre: 9,
  octobre: 10,
  novembre: 11,
  décembre: 12
}

const envoyerPrediction = async () => {
  try {
    const response = await axios.post('http://localhost:8000/predict', {
      temperature: parseFloat(temperature.value),
      humidite: parseFloat(humidite.value),
      pluie_totale: parseFloat(pluie_totale.value),
      pluie_intensite_max: parseFloat(pluie_intensite_max.value),
      force_moyenne_du_vecteur_de_vent: parseFloat(force_vent.value),
      sismicite: parseFloat(sismicite.value),
      concentration_gaz: parseFloat(concentration_gaz.value),
      jour: parseInt(jour.value) || 1,
      mois: moisMap[mois.value.toLowerCase()] || 1,
      quartier: quartier.value
    })
    await fetchLastPrediction()
    alert('Prédiction envoyée avec succès !')
  } catch (error) {
    alert('Erreur lors de l’envoi de la prédiction.')
    console.error(error)
  }
}

const fetchLastPrediction = async () => {
  try {
    const response = await axios.get('http://localhost:8000/last-prediction')
    lastPrediction.value = response.data
  } catch (error) {
    console.error('Erreur récupération dernière prédiction:', error)
  }
}

onMounted(() => {
  fetchLastPrediction()
})
</script>

<template>
  <div class="container-prediction">
    <section class="form-section">
      <h2>🌪️ Prédiction Catastrophes Climatiques</h2>

      <label>🌡️ Température (°C)
        <input type="number" step="0.01" v-model="temperature" />
      </label>

      <label>💧 Humidité (%)
        <input type="number" step="0.01" v-model="humidite" />
      </label>

      <label>☔ Pluie totale (mm)
        <input type="number" step="0.01" v-model="pluie_totale" />
      </label>

      <label>🌧️ Pluie max (mm/h)
        <input type="number" step="0.01" v-model="pluie_intensite_max" />
      </label>

      <label>💨 Vent moyen
        <input type="number" step="0.01" v-model="force_vent" />
      </label>

      <label>🌍 Sismicité
        <input type="number" step="0.01" v-model="sismicite" />
      </label>

      <label>🧪 Concentration gaz
        <input type="number" step="0.01" v-model="concentration_gaz" />
      </label>

      <label>📆 Jour
        <input type="number" min="1" max="31" v-model="jour" />
      </label>

      <label>🗓️ Mois
        <select v-model="mois">
          <option v-for="m in moisOptions" :key="m" :value="m">{{ m }}</option>
        </select>
      </label>

      <label>🏘️ Quartier
        <select v-model="quartier">
          <option v-for="q in quartierOptions" :key="q" :value="q">{{ q }}</option>
        </select>
      </label>

      <button @click="envoyerPrediction">Envoyer la prédiction</button>
    </section>

    <section class="last-prediction-section">
      <h2>Dernière prédiction</h2>
      <div v-if="lastPrediction">
        <p><strong>Quartier:</strong> {{ lastPrediction.quartier }}</p>
        <p><strong>Catastrophe prédite:</strong> {{ lastPrediction.catastrophe_predite }}</p>
      </div>
      <div v-else>
        <p>Aucune prédiction disponible.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.container-prediction {
  display: flex;
  gap: 2rem;
  padding: 1rem;
  max-width: 900px;
  margin: auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #003366;
}

.form-section, .last-prediction-section {
  background: #f0f8ff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  display: flex;
  flex-direction: column;
  font-weight: 600;
  font-size: 1rem;
  color: #004085;
}

input, select {
  margin-top: 0.3rem;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #007bff;
  font-size: 1rem;
  color: #003366;
  outline: none;
  transition: border-color 0.3s ease;
}

input:focus, select:focus {
  border-color: #0056b3;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.6);
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  padding: 0.75rem;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

h2 {
  color: #004085;
  margin-bottom: 1rem;
}
</style>
