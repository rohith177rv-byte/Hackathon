// ============================================================
// BuildConnect - Project Service
// Mock project operations. Replace with Spring Boot API.
// ============================================================

import store, { generateId } from '../data/store.js';

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

export const projectService = {
  // Alias for getPublicProjects
  async getProjects(filters = {}) {
    return this.getPublicProjects(filters);
  },

  // GET /api/projects — public (published only, from approved engineers)
  async getPublicProjects(filters = {}) {
    await delay();
    const approvedEngIds = store.engineers
      .filter(e => e.approvalStatus === 'approved' && e.isActive)
      .map(e => e.id);

    let results = store.projects.filter(p =>
      p.publicationStatus === 'published' && approvedEngIds.includes(p.engineerId)
    );

    if (filters.category) {
      results = results.filter(p => p.category === filters.category);
    }
    if (filters.status) {
      results = results.filter(p => p.status === filters.status);
    }
    if (filters.engineerId) {
      results = results.filter(p => p.engineerId === filters.engineerId);
    }
    return { success: true, data: results };
  },

  // GET /api/projects/:id
  async getProjectById(id) {
    await delay();
    const proj = store.projects.find(p => p.id === id);
    if (!proj) return { success: false, error: 'Project not found.' };
    return { success: true, data: proj };
  },

  // GET /api/engineers/:id/projects
  async getEngineerProjects(engineerId, publicOnly = false) {
    await delay();
    let results = store.projects.filter(p => p.engineerId === engineerId);
    if (publicOnly) {
      results = results.filter(p => p.publicationStatus === 'published');
    }
    return { success: true, data: results };
  },

  // POST /api/projects
  async createProject(data) {
    await delay(500);
    const newProject = {
      id: generateId('proj'),
      engineerId: data.engineerId,
      title: data.title,
      category: data.category,
      type: data.type || '',
      description: data.description || '',
      location: data.location || { districtId: '', townId: '' },
      startYear: data.startYear || new Date().getFullYear(),
      completionYear: data.completionYear || null,
      status: data.status || 'ongoing',
      plotArea: data.plotArea || '',
      builtUpArea: data.builtUpArea || '',
      floors: data.floors || 0,
      budget: data.budget || '',
      coverImage: data.coverImage || '',
      images: data.images || [],
      publicationStatus: 'published' // Auto-publish for demo
    };
    store.projects.push(newProject);
    return { success: true, data: newProject };
  },

  // PUT /api/projects/:id
  async updateProject(id, updates) {
    await delay(400);
    const idx = store.projects.findIndex(p => p.id === id);
    if (idx === -1) return { success: false, error: 'Project not found.' };
    store.projects[idx] = { ...store.projects[idx], ...updates };
    return { success: true, data: store.projects[idx] };
  },

  // DELETE /api/projects/:id
  async deleteProject(id) {
    await delay(400);
    const idx = store.projects.findIndex(p => p.id === id);
    if (idx === -1) return { success: false, error: 'Project not found.' };
    store.projects.splice(idx, 1);
    return { success: true };
  },

  // Admin: get all projects
  async getAllProjects() {
    await delay();
    return { success: true, data: store.projects };
  },

  // Admin: update publication status
  async updatePublicationStatus(id, status) {
    await delay(400);
    const idx = store.projects.findIndex(p => p.id === id);
    if (idx === -1) return { success: false, error: 'Project not found.' };
    store.projects[idx].publicationStatus = status;
    store.auditLogs.unshift({
      id: `log-${Date.now()}`,
      action: `Project ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      performedBy: 'Platform Admin',
      target: `${store.projects[idx].title} (${id})`,
      timestamp: new Date().toISOString(),
      description: `Project publication status changed to ${status}.`
    });
    return { success: true, data: store.projects[idx] };
  }
};
