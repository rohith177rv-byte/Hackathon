// ============================================================
// BuildConnect - Auth Service
// Mock authentication for demo. Replace with Spring Boot API.
// ============================================================

import store, { generateId } from '../data/store.js';

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

export const authService = {
  // POST /api/auth/login
  async login(email, password, role) {
    await delay();
    if (role === 'admin') {
      if (email === store.adminUser.email && password === store.adminUser.password) {
        return { success: true, user: { ...store.adminUser, role: 'admin' } };
      }
    } else if (role === 'engineer') {
      const eng = store.engineers.find(e => e.email === email && e.password === password);
      if (eng) return { success: true, user: { ...eng, role: 'engineer' } };
    } else {
      const cust = store.customers.find(c => c.email === email && c.password === password);
      if (cust) return { success: true, user: { ...cust, role: 'customer' } };
    }
    return { success: false, error: 'Invalid email or password.' };
  },

  // POST /api/auth/register/engineer
  async registerEngineer(data) {
    await delay(500);
    const existing = store.engineers.find(e => e.email === data.email);
    if (existing) return { success: false, error: 'An account with this email already exists.' };

    const newEngineer = {
      id: generateId('eng'),
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      profileImage: '',
      professionalTitle: data.professionalTitle || 'Civil Engineer',
      qualifications: data.qualifications || [],
      experience: data.experience || 0,
      specializations: data.specializations || [],
      introduction: data.introduction || '',
      website: data.website || '',
      registrationNumber: data.registrationNumber || '',
      serviceAreas: data.serviceAreas || [],
      approvalStatus: 'pending',
      isActive: true,
      isVerified: false,
      joinedDate: new Date().toISOString().split('T')[0],
      profileCompletion: 30
    };
    store.engineers.push(newEngineer);
    store.auditLogs.unshift({
      id: generateId('log'),
      action: 'Engineer Registered',
      performedBy: 'System',
      target: `${newEngineer.name} (${newEngineer.id})`,
      timestamp: new Date().toISOString(),
      description: 'New engineer registration submitted. Pending approval.'
    });
    return { success: true, user: { ...newEngineer, role: 'engineer' } };
  },

  // POST /api/auth/register/customer
  async registerCustomer(data) {
    await delay(500);
    const existing = store.customers.find(c => c.email === data.email);
    if (existing) return { success: false, error: 'An account with this email already exists.' };

    const newCustomer = {
      id: generateId('cust'),
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      joinedDate: new Date().toISOString().split('T')[0],
      isActive: true
    };
    store.customers.push(newCustomer);
    return { success: true, user: { ...newCustomer, role: 'customer' } };
  },

  // GET /api/auth/me
  async getCurrentUser() {
    await delay(100);
    return null; // In demo, managed via context
  }
};
