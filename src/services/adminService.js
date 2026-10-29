// ============================================================
// BuildConnect - Admin Service
// Mock admin operations. Replace with Spring Boot API.
// ============================================================

import store from '../data/store.js';

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

export const adminService = {
  // GET /api/admin/stats
  async getStats() {
    await delay();
    const engineers = store.engineers;
    const projects = store.projects;
    return {
      success: true,
      data: {
        totalEngineers: engineers.length,
        pendingApplications: engineers.filter(e => e.approvalStatus === 'pending').length,
        approvedEngineers: engineers.filter(e => e.approvalStatus === 'approved').length,
        rejectedEngineers: engineers.filter(e => e.approvalStatus === 'rejected').length,
        suspendedEngineers: engineers.filter(e => e.approvalStatus === 'approved' && !e.isActive).length,
        totalCustomers: store.customers.length,
        totalProjects: projects.length,
        pendingProjects: projects.filter(p => p.publicationStatus === 'pending_review').length,
        publishedProjects: projects.filter(p => p.publicationStatus === 'published').length,
        totalEnquiries: store.enquiries.length,
        newEnquiries: store.enquiries.filter(e => e.status === 'new').length
      }
    };
  },

  // GET /api/admin/audit-logs
  async getAuditLogs() {
    await delay();
    return { success: true, data: store.auditLogs };
  },

  // GET /api/admin/customers
  async getCustomers() {
    await delay();
    return { success: true, data: store.customers };
  },

  // PUT /api/admin/customers/:id/status
  async toggleCustomerStatus(id) {
    await delay(400);
    const idx = store.customers.findIndex(c => c.id === id);
    if (idx === -1) return { success: false, error: 'Customer not found.' };
    store.customers[idx].isActive = !store.customers[idx].isActive;
    return { success: true, data: store.customers[idx] };
  },

  // Website content
  async getWebsiteContent() {
    await delay();
    return { success: true, data: store.websiteContent };
  },

  async updateWebsiteContent(updates) {
    await delay(400);
    store.websiteContent = { ...store.websiteContent, ...updates };
    return { success: true, data: store.websiteContent };
  }
};
