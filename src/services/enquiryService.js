// ============================================================
// BuildConnect - Enquiry Service
// Mock enquiry operations. Replace with Spring Boot API.
// ============================================================

import store, { generateId } from '../data/store.js';

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

export const enquiryService = {
  // POST /api/enquiries
  async submitEnquiry(data) {
    await delay(500);
    const newEnquiry = {
      id: generateId('enq'),
      customerId: data.customerId || null,
      engineerId: data.engineerId,
      projectId: data.projectId || null,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      projectCategory: data.projectCategory,
      projectLocation: data.projectLocation,
      projectDescription: data.projectDescription,
      approximateBudget: data.approximateBudget || '',
      approximateArea: data.approximateArea || '',
      expectedStartDate: data.expectedStartDate || '',
      preferredContact: data.preferredContact || 'phone',
      status: 'new',
      submittedDate: new Date().toISOString().split('T')[0],
      notes: ''
    };
    store.enquiries.push(newEnquiry);
    return { success: true, data: newEnquiry };
  },

  // GET /api/engineers/:id/enquiries
  async getEngineerEnquiries(engineerId) {
    await delay();
    const results = store.enquiries.filter(e => e.engineerId === engineerId);
    return { success: true, data: results };
  },

  // GET /api/customers/:id/enquiries
  async getCustomerEnquiries(customerId) {
    await delay();
    const results = store.enquiries.filter(e => e.customerId === customerId);
    return { success: true, data: results };
  },

  // PUT /api/enquiries/:id/status
  async updateEnquiryStatus(id, status, notes = '') {
    await delay(400);
    const idx = store.enquiries.findIndex(e => e.id === id);
    if (idx === -1) return { success: false, error: 'Enquiry not found.' };
    store.enquiries[idx].status = status;
    if (notes) store.enquiries[idx].notes = notes;
    return { success: true, data: store.enquiries[idx] };
  },

  // Admin: get all enquiries
  async getAllEnquiries() {
    await delay();
    return { success: true, data: store.enquiries };
  }
};
