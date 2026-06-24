<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import type { UserData } from './types/user';
import {
  calculateDifferentNationalities,
  calculateMostGender,
  calculateAverageAge,
  calculateAverageMembership
} from './utils/calculations';

const users = ref<UserData[]>([]);
const loading = ref<boolean>(true);

// Mengambil 25 data user dari API saat halaman dimuat
onMounted(async () => {
  try {
    const response = await axios.get('https://randomuser.me/api/?results=25');
    users.value = response.data.results;
  } catch (error) {
    console.error('Gagal mengambil data:', error);
  } finally {
    loading.value = false;
  }
});

// Computed property agar statistik otomatis terupdate secara reaktif
const diffNat = computed(() => calculateDifferentNationalities(users.value));
const mostGender = computed(() => calculateMostGender(users.value));
const avgAge = computed(() => calculateAverageAge(users.value));
const avgMembership = computed(() => calculateAverageMembership(users.value));
</script>

<template>
  <div class="dashboard-container">
    <h1 class="dashboard-title">Member Dashboard</h1>

    <div v-if="loading" class="loading-text">
      Memuat data dari API...
    </div>

    <div v-else>
      <div class="stats-grid">
        <div class="stat-card">
          <div>
            <h2>{{ diffNat }}</h2>
            <p>Different Nationality</p>
          </div>
          <div class="stat-icon">🏴</div>
        </div>

        <div class="stat-card">
          <div>
            <h2 class="capitalize-text">{{ mostGender }}</h2>
            <p>Most Gender</p>
          </div>
          <div class="stat-icon font-bold">
            <span v-if="mostGender === 'Female'">♀</span>
            <span v-else-if="mostGender === 'Male'">♂</span>
            <span v-else>👥</span>
          </div>
        </div>

        <div class="stat-card">
          <div>
            <h2>~{{ avgAge }}</h2>
            <p>Average Age</p>
          </div>
          <div class="stat-icon">🏃</div>
        </div>

        <div class="stat-card">
          <div>
            <h2>~{{ avgMembership }} year</h2>
            <p>Average Membership</p>
          </div>
          <div class="stat-icon">👥</div>
        </div>
      </div>

      <div class="table-wrapper">
        <table class="user-table">
          <tbody>
            <tr v-for="(user, idx) in users" :key="idx">
              <td class="col-user">
                <img :src="user.picture.medium" :alt="user.name.first" />
                <div>
                  <strong>{{ user.name.first }} {{ user.name.last }}</strong>
                  <span>{{ user.email }}</span>
                </div>
              </td>
              
              <td class="col-age">{{ user.dob.age }}</td>
              
              <td class="col-gender-bar">
                <div 
                  class="gender-badge" 
                  :class="user.gender === 'female' ? 'badge-pink' : 'badge-blue'"
                >
                  {{ user.gender }}
                </div>
              </td>
              
              <td class="col-nat">
                <img 
                  :src="`https://flagcdn.com/w40/${user.nat.toLowerCase()}.png`" 
                  :alt="user.nat"
                  class="flag-img"
                />
              </td>
              
              <td class="col-address">
                {{ user.location.street.number }} {{ user.location.street.name }}, {{ user.location.city }}, {{ user.location.country }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* CONTAINER UTAMA */
.dashboard-container {
  width: 100%;
  max-width: 950px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 40px;
  margin: auto;
}
.dashboard-title {
  font-size: 16px;
  color: #1f2937;
  margin-bottom: 24px;
  font-weight: 700;
}
.loading-text {
  text-align: center;
  padding: 40px;
  color: #9ca3af;
}
.capitalize-text {
  text-transform: capitalize;
}

/* CARDS STATISTIK */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}
.stat-card {
  background-color: #ffffff;
  border: 1px solid #f3f4f6;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}
.stat-card h2 {
  font-size: 28px;
  color: #1f2937;
  font-weight: 700;
}
.stat-card p {
  font-size: 11px;
  color: #9ca3af;
  margin-top: 2px;
}
.stat-icon {
  font-size: 32px;
  color: #1f2937;
}
.font-bold {
  font-weight: bold;
}

/* LAYOUT TABEL */
.table-wrapper {
  width: 100%;
  max-height: 500px;
  overflow-y: auto;
}
.user-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 13px;
}
.user-table tr {
  border-bottom: 1px solid #f9fafb;
}
.user-table tr:hover {
  background-color: #fafafa;
}
.user-table td {
  padding: 14px 10px;
  vertical-align: middle;
}

/* DETAIL KOLOM TABEL */
.col-user {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 250px;
}
.col-user img {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
}
.col-user div {
  display: flex;
  flex-direction: column;
}
.col-user strong {
  color: #374151;
  font-size: 14px;
}
.col-user span {
  font-size: 11px;
  color: #9ca3af;
}
.col-age {
  font-weight: 500;
  color: #4b5563;
  width: 60px;
}
.col-gender-bar {
  width: 100px;
}
.gender-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 600;
  text-transform: lowercase;
  text-align: center;
  min-width: 65px;
}
.badge-pink {
  background-color: #fce7f3;
  color: #ec4899;
}
.badge-blue {
  background-color: #e0f2fe;
  color: #0ea5e9;
}
.col-nat {
  width: 60px;
}
.flag-img {
  width: 20px;
  height: auto;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  display: block;
}
.col-address {
  color: #4b5563;
  font-size: 13px;
}
</style>