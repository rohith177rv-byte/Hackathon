// ============================================================
// BuildConnect - Location Data (Karnataka)
// This file contains location hierarchy data for Karnataka.
// In production, this will be loaded from the Spring Boot API.
// ============================================================

export const states = [
  { id: 'KA', name: 'Karnataka' }
];

export const districts = [
  { id: 'ballari', name: 'Ballari', stateId: 'KA' },
  { id: 'bengaluru-urban', name: 'Bengaluru Urban', stateId: 'KA' },
  { id: 'bengaluru-rural', name: 'Bengaluru Rural', stateId: 'KA' },
  { id: 'mysuru', name: 'Mysuru', stateId: 'KA' },
  { id: 'mangaluru', name: 'Dakshina Kannada', stateId: 'KA' },
  { id: 'hubli-dharwad', name: 'Dharwad', stateId: 'KA' },
  { id: 'belagavi', name: 'Belagavi', stateId: 'KA' },
  { id: 'kalaburagi', name: 'Kalaburagi', stateId: 'KA' },
  { id: 'tumakuru', name: 'Tumakuru', stateId: 'KA' },
  { id: 'shivamogga', name: 'Shivamogga', stateId: 'KA' },
  { id: 'raichur', name: 'Raichur', stateId: 'KA' },
  { id: 'davanagere', name: 'Davanagere', stateId: 'KA' },
  { id: 'hassan', name: 'Hassan', stateId: 'KA' },
  { id: 'udupi', name: 'Udupi', stateId: 'KA' },
  { id: 'chitradurga', name: 'Chitradurga', stateId: 'KA' },
  { id: 'mandya', name: 'Mandya', stateId: 'KA' },
  { id: 'chikkamagaluru', name: 'Chikkamagaluru', stateId: 'KA' },
  { id: 'kodagu', name: 'Kodagu', stateId: 'KA' },
  { id: 'ramanagara', name: 'Ramanagara', stateId: 'KA' },
  { id: 'vijayapura', name: 'Vijayapura', stateId: 'KA' },
  { id: 'bagalkot', name: 'Bagalkot', stateId: 'KA' },
  { id: 'gadag', name: 'Gadag', stateId: 'KA' },
  { id: 'haveri', name: 'Haveri', stateId: 'KA' },
  { id: 'uttara-kannada', name: 'Uttara Kannada', stateId: 'KA' },
  { id: 'chamarajanagar', name: 'Chamarajanagar', stateId: 'KA' },
  { id: 'chikkaballapur', name: 'Chikkaballapur', stateId: 'KA' },
  { id: 'koppal', name: 'Koppal', stateId: 'KA' },
  { id: 'yadgir', name: 'Yadgir', stateId: 'KA' },
  { id: 'bidar', name: 'Bidar', stateId: 'KA' },
  { id: 'kolar', name: 'Kolar', stateId: 'KA' },
  { id: 'vijayanagara', name: 'Vijayanagara', stateId: 'KA' }
];

// Sample towns/villages — Ballari district is detailed, others have representative entries.
// NOTE: This is NOT an exhaustive list. In production, locations load from the backend.
export const towns = [
  // Ballari District — detailed sample
  { id: 'ballari-city', name: 'Ballari City', districtId: 'ballari' },
  { id: 'hospete', name: 'Hosapete (Hospet)', districtId: 'ballari' },
  { id: 'siruguppa', name: 'Siruguppa', districtId: 'ballari' },
  { id: 'kudligi', name: 'Kudligi', districtId: 'ballari' },
  { id: 'sandur', name: 'Sandur', districtId: 'ballari' },
  { id: 'kampli', name: 'Kampli', districtId: 'ballari' },
  { id: 'hadagali', name: 'Hadagali', districtId: 'ballari' },
  { id: 'hagaribommanahalli', name: 'Hagaribommanahalli', districtId: 'ballari' },
  { id: 'kotturu', name: 'Kotturu', districtId: 'ballari' },
  { id: 'tekkalakote', name: 'Tekkalakote', districtId: 'ballari' },
  { id: 'emmiganur', name: 'Emmiganur', districtId: 'ballari' },
  { id: 'kudatini', name: 'Kudatini', districtId: 'ballari' },
  { id: 'bellary-cantonment', name: 'Bellary Cantonment', districtId: 'ballari' },
  { id: 'tornagallu', name: 'Tornagallu', districtId: 'ballari' },
  { id: 'kamalapura', name: 'Kamalapura', districtId: 'ballari' },

  // Bengaluru Urban
  { id: 'bengaluru', name: 'Bengaluru', districtId: 'bengaluru-urban' },
  { id: 'yelahanka', name: 'Yelahanka', districtId: 'bengaluru-urban' },
  { id: 'whitefield', name: 'Whitefield', districtId: 'bengaluru-urban' },
  { id: 'electronic-city', name: 'Electronic City', districtId: 'bengaluru-urban' },

  // Mysuru
  { id: 'mysuru-city', name: 'Mysuru City', districtId: 'mysuru' },
  { id: 'nanjangud', name: 'Nanjangud', districtId: 'mysuru' },

  // Dharwad
  { id: 'hubli', name: 'Hubli', districtId: 'hubli-dharwad' },
  { id: 'dharwad', name: 'Dharwad', districtId: 'hubli-dharwad' },

  // Dakshina Kannada
  { id: 'mangaluru-city', name: 'Mangaluru', districtId: 'mangaluru' },

  // Davanagere
  { id: 'davanagere-city', name: 'Davanagere City', districtId: 'davanagere' },

  // Belagavi
  { id: 'belagavi-city', name: 'Belagavi City', districtId: 'belagavi' },
];

export function getDistrictsByState(stateId) {
  return districts.filter(d => d.stateId === stateId);
}

export function getTownsByDistrict(districtId) {
  return towns.filter(t => t.districtId === districtId);
}

export function getDistrictById(districtId) {
  return districts.find(d => d.id === districtId) || null;
}

export function getTownById(townId) {
  return towns.find(t => t.id === townId) || null;
}

export function getLocationLabel(districtId, townId) {
  const district = getDistrictById(districtId);
  const town = getTownById(townId);
  if (town && district) return `${town.name}, ${district.name}`;
  if (district) return district.name;
  return 'Karnataka';
}
