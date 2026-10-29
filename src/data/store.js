// ============================================================
// BuildConnect - Centralized Mock Data Store
// This module provides a mutable data store for the demo.
// All service modules read from and write to this store.
// In production, replace with API calls to Spring Boot.
// ============================================================

import { engineers as engineersData } from './engineers.js';
import { projects as projectsData } from './projects.js';
import { services as servicesData } from './services.js';
import { customers as customersData, enquiries as enquiriesData, auditLogs as auditLogsData, websiteContent as websiteContentData, adminUser } from './customers.js';
import { states, districts, towns } from './locations.js';

// Deep clone initial data so we can mutate without affecting imports
const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

// Mutable store — acts as "database" for the demo session
const store = {
  engineers: deepClone(engineersData),
  projects: deepClone(projectsData),
  services: deepClone(servicesData),
  customers: deepClone(customersData),
  enquiries: deepClone(enquiriesData),
  auditLogs: deepClone(auditLogsData),
  websiteContent: deepClone(websiteContentData),
  states: deepClone(states),
  districts: deepClone(districts),
  towns: deepClone(towns),
  adminUser: deepClone(adminUser),
};

// ID generators
let nextEngineerId = 11;
let nextProjectId = 17;
let nextServiceId = 20;
let nextCustomerId = 4;
let nextEnquiryId = 7;
let nextLogId = 9;

export function generateId(prefix) {
  switch (prefix) {
    case 'eng': return `eng-${String(nextEngineerId++).padStart(3, '0')}`;
    case 'proj': return `proj-${String(nextProjectId++).padStart(3, '0')}`;
    case 'svc': return `svc-${String(nextServiceId++).padStart(3, '0')}`;
    case 'cust': return `cust-${String(nextCustomerId++).padStart(3, '0')}`;
    case 'enq': return `enq-${String(nextEnquiryId++).padStart(3, '0')}`;
    case 'log': return `log-${String(nextLogId++).padStart(3, '0')}`;
    default: return `${prefix}-${Date.now()}`;
  }
}

export default store;
