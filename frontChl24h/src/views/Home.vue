<script setup>
import ChatUtilisateur from "../components/userChat.vue";
import DistrictMap from "../components/DiscrictMap.vue";
import HeaderBar from "../components/HeaderBar.vue";
</script>

<template>
  <div class="app-container">
    <HeaderBar />

    <div class="layout-container">
      <div class="map-wrapper">
        <DistrictMap />
      </div>

      <div class="chat-wrapper">
        <ChatUtilisateur />
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(to right, #eaf4ff, #f7fbff);
}

/* Layout principal sous le header */
.layout-container {
  flex: 1;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

/* Carte */
.map-wrapper {
  width: 65%;
  padding: 2rem;
  background-color: white;
  box-shadow: inset -2px 0 5px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Chat */
.chat-wrapper {
  width: 35%;
  padding: 2rem;
  background-color: #ffffff;
  box-shadow: inset 2px 0 5px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
