<script setup>
import { ref } from 'vue'
import axios from 'axios'

const temperature = ref(20.0)
const humidity = ref(60.0)
const totalRain = ref(5.0)
const maxRain = ref(2.0)
const avgWind = ref(3.0)
const seismicity = ref(0.5)
const gasConcentration = ref(100.0)
const day = ref(1)
const month = ref('janvier')
const quartier = ref('zone 1')

const predictionResult = ref(null)
const loading = ref(false)
const errorMsg = ref(null)

const months = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
]

const quartiers = ['zone 1', 'zone 2', 'zone 3', 'zone 4']

const submitPrediction = async () => {
  loading.value = true
  errorMsg.value = null
  predictionResult.value = null
  try {
    const payload = {
      temperature: temperature.value,
      humidity: humidity.value,
      total_rain: totalRain.value,
      max_rain: maxRain.value,
      avg_wind: avgWind.value,
      seismicity: seismicity.value,
      gas_concentration: gasConcentration.value,
      day: day.value,
      month: month.value,
      quartier: quartier.value,
    }
    const res = await axios.post('http://localhost:8081/api/prediction', payload)
    predictionResult.value = res.data
  } catch (err) {
    errorMsg.value = 'Erreur lors de la requête de prédiction.'
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="prediction-container">
    <h1>🌪️ Prédiction Catastrophes Climatiques</h1>

    <form @submit.prevent="submitPrediction" class="prediction-form">
      <label>🌡️ Température (°C)
        <input type="number" v-model.number="temperature" step="0.01" min="-50" max="60" />
      </label>

      <label>💧 Humidité (%)
        <input type="number" v-model.number="humidity" step="0.01" min="0" max="100" />
      </label>

      <label>☔ Pluie totale (mm)
        <input type="number" v-model.number="totalRain" step="0.01" min="0" />
      </label>

      <label>🌧️ Pluie max (mm/h)
        <input type="number" v-model.number="maxRain" step="0.01" min="0" />
      </label>

      <label>💨 Vent moyen
        <input type="number" v-model.number="avgWind" step="0.01" min="0" />
      </label>

      <label>🌍 Sismicité
        <input type="number" v-model.number="seismicity" step="0.01" min="0" />
      </label>

      <label>🧪 Concentration gaz
        <input type="number" v-model.number="gasConcentration" step="0.01" min="0" />
      </label>

      <label>📆 Jour
        <input type="number" v-model.number="day" min="1" max="31" />
      </label>

      <label>🗓️ Mois
        <select v-model="month">
          <option v-for="m in months" :key="m" :value="m">{{ m }}</option>
        </select>
      </label>

      <label>🏘️ Quartier
        <select v-model="quartier">
          <option v-for="q in quartiers" :key="q" :value="q">{{ q }}</option>
        </select>
      </label>

      <button type="submit" :disabled="loading">{{ loading ? 'Chargement...' : 'Prédire' }}</button>
    </form>

    <div v-if="errorMsg" class="error-msg">{{ errorMsg }}</div>

    <div v-if="predictionResult" class="result">
      <h2>Résultat de la prédiction :</h2>
      <pre>{{ JSON.stringify(predictionResult, null, 2) }}</pre>
    </div>
  </div>
</template>

<style scoped>
.prediction-container {
  max-width: 480px;
  margin: 2rem auto;
  background: #f0f8ff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 6px 18px rgba(0, 123, 255, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #003366;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #007BFF;
}

.prediction-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.prediction-form label {
  display: flex;
  flex-direction: column;
  font-weight: 600;
  font-size: 1rem;
}

.prediction-form input,
.prediction-form select {
  margin-top: 0.25rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1.5px solid #007BFF;
  border-radius: 6px;
  color: #003366;
  outline: none;
  transition: border-color 0.3s ease;
}

.prediction-form input:focus,
.prediction-form select:focus {
  border-color: #0056b3;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.4);
}

button[type="submit"] {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 0.7rem;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

button[type="submit"]:disabled {
  background-color: #99c2ff;
  cursor: not-allowed;
}

.error-msg {
  margin-top: 1rem;
  color: #dc3545;
  font-weight: 600;
  text-align: center;
}

.result {
  margin-top: 2rem;
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 6px 18px rgba(0, 123, 255, 0.15);
  white-space: pre-wrap;
  font-family: monospace;
  font-size: 0.95rem;
}
</style>
