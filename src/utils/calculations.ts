import type { UserData } from '../types/user';

// 1. Menghitung jumlah kebangsaan unik (Different Nationality)
export function calculateDifferentNationalities(users: UserData[]): number {
  const nationalities = users.map(user => user.nat);
  return new Set(nationalities).size; // Set otomatis menghapus duplikasi
}

// 2. Mencari gender terbanyak (Most Gender)
export function calculateMostGender(users: UserData[]): 'female' | 'male' | 'Equal' {
  if (users.length === 0) return 'Equal';
  const femaleCount = users.filter(u => u.gender === 'female').length;
  const maleCount = users.filter(u => u.gender === 'male').length;

  if (femaleCount > maleCount) return 'female';
  if (maleCount > femaleCount) return 'male';
  return 'Equal';
}

// 3. Menghitung rata-rata umur (Average Age) bulat tanpa desimal
export function calculateAverageAge(users: UserData[]): number {
  if (users.length === 0) return 0;
  const totalAge = users.reduce((sum, user) => sum + user.dob.age, 0);
  return Math.round(totalAge / users.length);
}

// 4. Menghitung rata-rata lama membership (Average Membership) bulat tanpa desimal
export function calculateAverageMembership(users: UserData[]): number {
  if (users.length === 0) return 0;
  
  const currentYear = new Date().getFullYear(); // Tahun berjalan saat ini
  
  const totalYears = users.reduce((sum, user) => {
    const registrationYear = new Date(user.registered.date).getFullYear();
    const durationInYears = currentYear - registrationYear;
    return sum + durationInYears;
  }, 0);

  return Math.round(totalYears / users.length);
}