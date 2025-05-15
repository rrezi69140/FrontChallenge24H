<script setup lang="ts">
import { ref } from 'vue';

const selectedDistrict = ref<number | null>(null);

// Données des districts avec les coordonnées des chemins, couleurs et positions des étiquettes
const districts = [
  {
    id: 1,
    path: "M320,190 L380,170 L400,210 L370,260 L320,250 Z",
    color: "#7BC142", // Vert
    labelX: 355,
    labelY: 215
  },
  {
    id: 2,
    path: "M320,250 L370,260 L350,320 L300,330 L290,290 Z",
    color: "#7BC142", // Vert
    labelX: 330,
    labelY: 290
  },
  {
    id: 3,
    path: "M400,210 L450,180 L480,240 L440,290 L400,280 L370,260 Z",
    color: "#29ABE2", // Bleu
    labelX: 430,
    labelY: 235
  },
  {
    id: 4,
    path: "M320,130 L380,170 L320,190 L280,170 Z",
    color: "#7BC142", // Vert
    labelX: 325,
    labelY: 165
  },
  {
    id: 5,
    path: "M180,190 L280,170 L320,190 L320,250 L290,290 L240,280 L200,240 Z",
    color: "#F7941D", // Orange
    labelX: 250,
    labelY: 230
  },
  {
    id: 6,
    path: "M450,180 L510,170 L520,230 L480,240 Z",
    color: "#29ABE2", // Bleu
    labelX: 490,
    labelY: 205
  },
  {
    id: 7,
    path: "M350,320 L400,280 L440,290 L430,360 L380,380 L350,350 Z",
    color: "#29ABE2", // Bleu
    labelX: 400,
    labelY: 330
  },
  {
    id: 8,
    path: "M430,360 L470,340 L510,380 L470,420 L380,380 Z",
    color: "#29ABE2", // Bleu
    labelX: 455,
    labelY: 380
  },
  {
    id: 9,
    path: "M130,160 L180,190 L200,240 L170,280 L120,240 Z",
    color: "#F7941D", // Orange
    labelX: 150,
    labelY: 220
  }
];

// Zone d'eau
const water = {
  path: "M370,260 L400,280 L350,320 L300,330 L290,290 L320,250 Z",
  color: "#B3E3F9" // Bleu clair
};

const handleDistrictClick = (districtId: number) => {
  selectedDistrict.value = districtId;
};
</script>

<template>
  <div class="map-container">
    <svg viewBox="100 100 450 350" width="100%" height="100%">
      <!-- Zone d'eau -->
      <path
          :d="water.path"
          :fill="water.color"
          stroke="#fff"
          stroke-width="2"
      />

      <!-- Districts -->
      <g v-for="district in districts" :key="district.id">
        <path
            :d="district.path"
            :fill="district.color"
            stroke="#fff"
            stroke-width="2"
            :class="['district', { selected: selectedDistrict === district.id }]"
            @click="handleDistrictClick(district.id)"
            :data-district-id="district.id"
        />
        <text
            :x="district.labelX"
            :y="district.labelY"
            fill="#fff"
            text-anchor="middle"
            class="district-number"
        >
          {{ district.id }}
        </text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
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

.map-container {
  background-color: #f0f8ff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.1);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>