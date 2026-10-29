// ============================================================
// BuildConnect - Pricing Service
// Mock pricing/services operations. Replace with Spring Boot API.
// ============================================================

import store, { generateId } from '../data/store.js';

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

export const pricingService = {
  // GET /api/engineers/:id/services
  async getEngineerServices(engineerId) {
    await delay();
    const results = store.services.filter(s => s.engineerId === engineerId);
    return { success: true, data: results };
  },

  // POST /api/services
  async createService(data) {
    await delay(400);
    const newService = {
      id: generateId('svc'),
      engineerId: data.engineerId,
      name: data.name,
      description: data.description || '',
      category: data.category || 'residential',
      pricingMethod: data.pricingMethod || 'per_sqft',
      rate: data.rate || 0,
      unit: data.unit || '',
      minArea: data.minArea || '',
      maxArea: data.maxArea || '',
      notes: data.notes || '',
      isActive: true
    };
    store.services.push(newService);
    return { success: true, data: newService };
  },

  // PUT /api/services/:id
  async updateService(id, updates) {
    await delay(400);
    const idx = store.services.findIndex(s => s.id === id);
    if (idx === -1) return { success: false, error: 'Service not found.' };
    store.services[idx] = { ...store.services[idx], ...updates };
    return { success: true, data: store.services[idx] };
  },

  // DELETE /api/services/:id
  async deleteService(id) {
    await delay(400);
    const idx = store.services.findIndex(s => s.id === id);
    if (idx === -1) return { success: false, error: 'Service not found.' };
    store.services.splice(idx, 1);
    return { success: true };
  },

  // Admin: get all services
  async getAllServices() {
    await delay();
    return { success: true, data: store.services };
  },

  // Format pricing for display
  formatPrice(service) {
    if (!service) return 'Contact for Quote';
    switch (service.pricingMethod) {
      case 'per_sqft':
        return `₹${service.rate.toLocaleString('en-IN')}/${service.unit}`;
      case 'fixed':
        return `₹${service.rate.toLocaleString('en-IN')} ${service.unit}`;
      case 'percentage':
        return `${service.rate}% ${service.unit}`;
      case 'hourly':
        return `₹${service.rate.toLocaleString('en-IN')}/${service.unit}`;
      case 'daily':
        return `₹${service.rate.toLocaleString('en-IN')}/${service.unit}`;
      case 'custom':
        return 'Contact for Custom Quote';
      default:
        return 'Contact for Quote';
    }
  },

  getPricingMethodLabel(method) {
    const labels = {
      per_sqft: 'Per Square Foot',
      fixed: 'Fixed Price',
      percentage: 'Percentage of Project Cost',
      hourly: 'Hourly Rate',
      daily: 'Daily Rate',
      custom: 'Custom Quotation'
    };
    return labels[method] || method;
  }
};
