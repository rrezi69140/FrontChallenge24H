<script setup>
const appTitle = "Lyon-Destruction";
</script>

<template>
  <header class="header">
    <div class="logo">
      <!-- Remplace l’URL par ton logo si besoin -->
      <img src="https://img.icons8.com/ios-filled/50/ffffff/chat.png" alt="Logo" />
      <h1>{{ appTitle }}</h1>
    </div>
  </header>
</template>

<style scoped>
.header {
  height: 60px;
  background-color: #007BFF;
  color: white;
  display: flex;
  align-items: center;
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
</style>
