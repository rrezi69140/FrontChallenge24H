<script setup>
import { useRouter } from 'vue-router'

const appTitle = "Lyon-Destruction";
const router = useRouter()

const goToPrediction = () => {
  router.push('/prediction')
}
</script>

<template>
  <header class="header">
    <div class="logo">
      <img src="https://img.icons8.com/ios-filled/50/ffffff/chat.png" alt="Logo" />
      <h1>{{ appTitle }}</h1>
    </div>
    <button class="prediction-btn" @click="goToPrediction">🔮 Prédiction</button>
  </header>
</template>

<style scoped>
.header {
  height: 60px;
  background-color: #007BFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo img {
  height: 32px;
}

.logo h1 {
  font-size: 1.4rem;
  font-weight: bold;
}

.prediction-btn {
  background-color: #fff;
  color: #007BFF;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.prediction-btn:hover {
  background-color: #e6f0ff;
}
</style>
