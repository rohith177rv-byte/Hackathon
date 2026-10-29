// ============================================================
// BuildConnect - Location Service
// Mock location operations. Replace with Spring Boot API.
// ============================================================

import store, { generateId } from '../data/store.js';

const delay = (ms = 200) => new Promise(r => setTimeout(r, ms));

export const locationService = {
  async getStates() {
    await delay();
    return { success: true, data: store.states };
  },

  async getDistricts(stateId) {
    await delay();
    const results = store.districts.filter(d => d.stateId === stateId);
    return { success: true, data: results };
  },

  async getTowns(districtId) {
    await delay();
    const results = store.towns.filter(t => t.districtId === districtId);
    return { success: true, data: results };
  },

  async addDistrict(data) {
    await delay(400);
    const newDistrict = { id: data.id || `dist-${Date.now()}`, name: data.name, stateId: data.stateId || 'KA' };
    store.districts.push(newDistrict);
    return { success: true, data: newDistrict };
  },

  async addTown(data) {
    await delay(400);
    const newTown = { id: data.id || `town-${Date.now()}`, name: data.name, districtId: data.districtId };
    store.towns.push(newTown);
    return { success: true, data: newTown };
  },

  async deleteLocation(type, id) {
    await delay(400);
    if (type === 'district') {
      // Check if referenced
      const hasEngineers = store.engineers.some(e => e.serviceAreas.some(sa => sa.districtId === id));
      if (hasEngineers) return { success: false, error: 'Cannot delete: district is referenced by engineers.' };
      store.districts = store.districts.filter(d => d.id !== id);
      store.towns = store.towns.filter(t => t.districtId !== id);
    } else {
      const hasEngineers = store.engineers.some(e => e.serviceAreas.some(sa => sa.townIds.includes(id)));
      if (hasEngineers) return { success: false, error: 'Cannot delete: town is referenced by engineers.' };
      store.towns = store.towns.filter(t => t.id !== id);
    }
    return { success: true };
  }
};
