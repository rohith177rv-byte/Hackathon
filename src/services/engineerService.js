// ============================================================
// BuildConnect - Engineer Service
// Mock engineer operations. Replace with Spring Boot API.
// ============================================================

import store from '../data/store.js';

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

export const engineerService = {
  // Alias for getPublicEngineers
  async getEngineers(filters = {}) {
    return this.getPublicEngineers(filters);
  },

  // GET /api/engineers — public listing (only approved & active)
  async getPublicEngineers(filters = {}) {
    await delay();
    let results = store.engineers.filter(e =>
      e.approvalStatus === 'approved' && e.isActive
    );

    // Location filter
    if (filters.districtId) {
      results = results.filter(eng =>
        eng.serviceAreas.some(sa => sa.districtId === filters.districtId)
      );
    }
    if (filters.townId) {
      results = results.filter(eng =>
        eng.serviceAreas.some(sa =>
          sa.districtId === filters.districtId &&
          (sa.townIds.length === 0 || sa.townIds.includes(filters.townId))
        )
      );
    }

    // Specialization filter
    if (filters.specialization) {
      results = results.filter(eng =>
        eng.specializations.some(s =>
          s.toLowerCase().includes(filters.specialization.toLowerCase())
        )
      );
    }

    // Category filter (maps to service categories)
    if (filters.category) {
      const engIdsWithCategory = store.services
        .filter(s => s.category === filters.category && s.isActive)
        .map(s => s.engineerId);
      results = results.filter(eng => engIdsWithCategory.includes(eng.id));
    }

    // Experience filter
    if (filters.minExperience) {
      results = results.filter(eng => eng.experience >= parseInt(filters.minExperience));
    }

    // Verified filter
    if (filters.verified === true) {
      results = results.filter(eng => eng.isVerified);
    }

    // Search text
    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(eng =>
        eng.name.toLowerCase().includes(q) ||
        eng.professionalTitle.toLowerCase().includes(q) ||
        eng.specializations.some(s => s.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'experience':
          results.sort((a, b) => b.experience - a.experience);
          break;
        case 'projects': {
          const projCount = (id) => store.projects.filter(p => p.engineerId === id && p.publicationStatus === 'published').length;
          results.sort((a, b) => projCount(b.id) - projCount(a.id));
          break;
        }
        case 'price_low': {
          const getMinRate = (id) => {
            const rates = store.services.filter(s => s.engineerId === id && s.pricingMethod === 'per_sqft' && s.isActive).map(s => s.rate);
            return rates.length > 0 ? Math.min(...rates) : Infinity;
          };
          results.sort((a, b) => getMinRate(a.id) - getMinRate(b.id));
          break;
        }
        case 'price_high': {
          const getMaxRate = (id) => {
            const rates = store.services.filter(s => s.engineerId === id && s.pricingMethod === 'per_sqft' && s.isActive).map(s => s.rate);
            return rates.length > 0 ? Math.max(...rates) : 0;
          };
          results.sort((a, b) => getMaxRate(b.id) - getMaxRate(a.id));
          break;
        }
        default:
          break;
      }
    }

    return { success: true, data: results, total: results.length };
  },

  // GET /api/engineers/:id — public profile
  async getEngineerById(id) {
    await delay();
    const eng = store.engineers.find(e => e.id === id);
    if (!eng) return { success: false, error: 'Engineer not found.' };
    return { success: true, data: eng };
  },

  // PUT /api/engineers/:id — update profile
  async updateEngineer(id, updates) {
    await delay(400);
    const idx = store.engineers.findIndex(e => e.id === id);
    if (idx === -1) return { success: false, error: 'Engineer not found.' };
    store.engineers[idx] = { ...store.engineers[idx], ...updates };
    return { success: true, data: store.engineers[idx] };
  },

  // Get project count for an engineer
  getProjectCount(engineerId) {
    return store.projects.filter(p => p.engineerId === engineerId && p.publicationStatus === 'published').length;
  },

  // Get starting rate for an engineer
  getStartingRate(engineerId) {
    const sqftServices = store.services.filter(
      s => s.engineerId === engineerId && s.pricingMethod === 'per_sqft' && s.isActive
    );
    if (sqftServices.length === 0) return null;
    return Math.min(...sqftServices.map(s => s.rate));
  },

  // Get all engineers (admin)
  async getAllEngineers() {
    await delay();
    return { success: true, data: store.engineers };
  },

  // Approve engineer
  async approveEngineer(id) {
    await delay(400);
    const idx = store.engineers.findIndex(e => e.id === id);
    if (idx === -1) return { success: false, error: 'Engineer not found.' };
    store.engineers[idx].approvalStatus = 'approved';
    store.auditLogs.unshift({
      id: `log-${Date.now()}`,
      action: 'Engineer Approved',
      performedBy: 'Platform Admin',
      target: `${store.engineers[idx].name} (${id})`,
      timestamp: new Date().toISOString(),
      description: 'Approved engineer registration application.'
    });
    return { success: true, data: store.engineers[idx] };
  },

  // Reject engineer
  async rejectEngineer(id, reason = '') {
    await delay(400);
    const idx = store.engineers.findIndex(e => e.id === id);
    if (idx === -1) return { success: false, error: 'Engineer not found.' };
    store.engineers[idx].approvalStatus = 'rejected';
    store.engineers[idx].isActive = false;
    store.auditLogs.unshift({
      id: `log-${Date.now()}`,
      action: 'Engineer Rejected',
      performedBy: 'Platform Admin',
      target: `${store.engineers[idx].name} (${id})`,
      timestamp: new Date().toISOString(),
      description: reason || 'Application rejected.'
    });
    return { success: true, data: store.engineers[idx] };
  },

  // Suspend/activate
  async toggleEngineerStatus(id) {
    await delay(400);
    const idx = store.engineers.findIndex(e => e.id === id);
    if (idx === -1) return { success: false, error: 'Engineer not found.' };
    store.engineers[idx].isActive = !store.engineers[idx].isActive;
    return { success: true, data: store.engineers[idx] };
  }
};
