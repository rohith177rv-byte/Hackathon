// ============================================================
// BuildConnect - Customers & Enquiries Mock Data
// In production, this comes from the Spring Boot API.
// ============================================================

export const customers = [
  {
    id: 'cust-001',
    name: 'Ramesh Hegde',
    email: 'ramesh.hegde@demo.buildconnect.in',
    phone: '+91 98456 78901',
    password: 'demo123',
    joinedDate: '2024-06-01',
    isActive: true
  },
  {
    id: 'cust-002',
    name: 'Savitha B.',
    email: 'savitha.b@demo.buildconnect.in',
    phone: '+91 99876 54321',
    password: 'demo123',
    joinedDate: '2024-07-15',
    isActive: true
  },
  {
    id: 'cust-003',
    name: 'Prakash Reddy',
    email: 'prakash.r@demo.buildconnect.in',
    phone: '+91 94567 89012',
    password: 'demo123',
    joinedDate: '2024-08-20',
    isActive: true
  }
];

export const enquiries = [
  {
    id: 'enq-001',
    customerId: 'cust-001',
    engineerId: 'eng-001',
    projectId: null,
    customerName: 'Ramesh Hegde',
    customerEmail: 'ramesh.hegde@demo.buildconnect.in',
    customerPhone: '+91 98456 78901',
    projectCategory: 'residential',
    projectLocation: 'Ballari City, Ballari',
    projectDescription: 'I am looking to build a 3BHK independent house on my 30x40 site in Ballari. Want modern design with vastu compliance. Budget around 40-50 lakhs.',
    approximateBudget: '₹40,00,000 - ₹50,00,000',
    approximateArea: '1200 sq. ft.',
    expectedStartDate: '2025-03-01',
    preferredContact: 'phone',
    status: 'new',
    submittedDate: '2024-10-15',
    notes: ''
  },
  {
    id: 'enq-002',
    customerId: 'cust-002',
    engineerId: 'eng-003',
    projectId: 'proj-007',
    customerName: 'Savitha B.',
    customerEmail: 'savitha.b@demo.buildconnect.in',
    customerPhone: '+91 99876 54321',
    projectCategory: 'renovation',
    projectLocation: 'Hospete, Ballari',
    projectDescription: 'We want to renovate our 20-year-old house. Complete renovation including kitchen, bathrooms, flooring, and exterior painting. The house is approximately 1500 sq ft.',
    approximateBudget: '₹15,00,000 - ₹20,00,000',
    approximateArea: '1500 sq. ft.',
    expectedStartDate: '2025-01-15',
    preferredContact: 'email',
    status: 'contacted',
    submittedDate: '2024-10-10',
    notes: 'Called the customer on Oct 12. Site visit scheduled for Oct 18.'
  },
  {
    id: 'enq-003',
    customerId: 'cust-001',
    engineerId: 'eng-002',
    projectId: null,
    customerName: 'Ramesh Hegde',
    customerEmail: 'ramesh.hegde@demo.buildconnect.in',
    customerPhone: '+91 98456 78901',
    projectCategory: 'commercial',
    projectLocation: 'Ballari City, Ballari',
    projectDescription: 'Looking for an architect to design a small office building (ground + 2 floors) in a commercial area. Need modern design with good parking space.',
    approximateBudget: '₹1,50,00,000 - ₹2,00,00,000',
    approximateArea: '3000 sq. ft.',
    expectedStartDate: '2025-06-01',
    preferredContact: 'phone',
    status: 'in_discussion',
    submittedDate: '2024-09-20',
    notes: 'Multiple discussions held. Client is comparing designs.'
  },
  {
    id: 'enq-004',
    customerId: 'cust-003',
    engineerId: 'eng-005',
    projectId: null,
    customerName: 'Prakash Reddy',
    customerEmail: 'prakash.r@demo.buildconnect.in',
    customerPhone: '+91 94567 89012',
    projectCategory: 'residential',
    projectLocation: 'Siruguppa, Ballari',
    projectDescription: 'Want to construct a duplex house with modern amenities. Have a 40x50 site. Interested in premium construction.',
    approximateBudget: '₹60,00,000 - ₹80,00,000',
    approximateArea: '2000 sq. ft.',
    expectedStartDate: '2025-04-01',
    preferredContact: 'phone',
    status: 'quotation_sent',
    submittedDate: '2024-09-05',
    notes: 'Quotation sent on Sep 15. Awaiting customer response.'
  },
  {
    id: 'enq-005',
    customerId: 'cust-002',
    engineerId: 'eng-006',
    projectId: null,
    customerName: 'Savitha B.',
    customerEmail: 'savitha.b@demo.buildconnect.in',
    customerPhone: '+91 99876 54321',
    projectCategory: 'renovation',
    projectLocation: 'Ballari City, Ballari',
    projectDescription: 'Need complete kitchen renovation with modular kitchen, chimney, and granite countertop. Kitchen size is approximately 10x12 feet.',
    approximateBudget: '₹3,00,000 - ₹4,00,000',
    approximateArea: '120 sq. ft.',
    expectedStartDate: '2025-02-01',
    preferredContact: 'email',
    status: 'accepted',
    submittedDate: '2024-08-25',
    notes: 'Work scheduled to begin in February 2025.'
  },
  {
    id: 'enq-006',
    customerId: 'cust-003',
    engineerId: 'eng-001',
    projectId: null,
    customerName: 'Prakash Reddy',
    customerEmail: 'prakash.r@demo.buildconnect.in',
    customerPhone: '+91 94567 89012',
    projectCategory: 'residential',
    projectLocation: 'Hospete, Ballari',
    projectDescription: 'Interested in constructing a farmhouse on a 1-acre plot near Hospete. Looking for eco-friendly construction.',
    approximateBudget: '₹70,00,000+',
    approximateArea: '3000 sq. ft.',
    expectedStartDate: '2025-06-01',
    preferredContact: 'phone',
    status: 'declined',
    submittedDate: '2024-07-10',
    notes: 'Location too far from our operational area. Referred to another engineer.'
  }
];

export const enquiryStatuses = [
  { value: 'new', label: 'New', color: '#3b82f6' },
  { value: 'contacted', label: 'Contacted', color: '#8b5cf6' },
  { value: 'in_discussion', label: 'In Discussion', color: '#f59e0b' },
  { value: 'quotation_sent', label: 'Quotation Sent', color: '#6366f1' },
  { value: 'accepted', label: 'Accepted', color: '#22c55e' },
  { value: 'declined', label: 'Declined', color: '#ef4444' },
  { value: 'closed', label: 'Closed', color: '#6b7280' },
];

// Admin data
export const adminUser = {
  id: 'admin-001',
  name: 'Platform Admin',
  email: 'admin@demo.buildconnect.in',
  password: 'admin123',
  role: 'admin'
};

export const auditLogs = [
  { id: 'log-001', action: 'Engineer Approved', performedBy: 'Platform Admin', target: 'Rajesh Kumar Patil (eng-001)', timestamp: '2024-03-16T10:30:00', description: 'Approved engineer registration application.' },
  { id: 'log-002', action: 'Engineer Approved', performedBy: 'Platform Admin', target: 'Anitha Sharma (eng-002)', timestamp: '2024-05-23T14:15:00', description: 'Approved engineer registration application.' },
  { id: 'log-003', action: 'Project Published', performedBy: 'Platform Admin', target: 'Modern Villa in Ballari (proj-001)', timestamp: '2024-04-01T09:00:00', description: 'Approved and published project listing.' },
  { id: 'log-004', action: 'Engineer Rejected', performedBy: 'Platform Admin', target: 'Ravi Shankar M. (eng-009)', timestamp: '2024-09-20T11:45:00', description: 'Rejected application - incomplete documentation provided.' },
  { id: 'log-005', action: 'Project Reviewed', performedBy: 'Platform Admin', target: 'Community Hall Renovation (proj-016)', timestamp: '2024-10-25T16:00:00', description: 'Project submitted for review. Pending approval.' },
  { id: 'log-006', action: 'Location Added', performedBy: 'Platform Admin', target: 'Kamalapura, Ballari', timestamp: '2024-08-10T13:20:00', description: 'Added new town/village to Ballari district.' },
  { id: 'log-007', action: 'Engineer Approved', performedBy: 'Platform Admin', target: 'Mohammed Irfan (eng-003)', timestamp: '2024-01-12T08:30:00', description: 'Approved engineer registration application.' },
  { id: 'log-008', action: 'Enquiry Status Update', performedBy: 'System', target: 'Enquiry enq-005', timestamp: '2024-09-01T10:00:00', description: 'Status changed from In Discussion to Accepted.' },
];

// Website content for admin management
export const websiteContent = {
  heroHeadline: 'Find Trusted Civil Engineers Near You',
  heroSubtext: 'Explore professional portfolios, compare construction services, and connect with engineers across Karnataka.',
  announcement: '',
  aboutText: 'BuildConnect is a platform connecting customers with professional civil engineers across Karnataka. We help you discover, compare, and connect with the right engineering professionals for your construction projects.',
};
