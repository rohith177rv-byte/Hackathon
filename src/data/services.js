// ============================================================
// BuildConnect - Services & Pricing Mock Data
// Different engineers have different services and pricing methods.
// In production, this comes from the Spring Boot API.
// ============================================================

export const services = [
  // === Engineer eng-001 (Rajesh) ===
  {
    id: 'svc-001', engineerId: 'eng-001', name: 'Residential Building Construction',
    description: 'Complete residential construction including foundation, structure, finishing, and handover.',
    category: 'residential', pricingMethod: 'per_sqft', rate: 1850, unit: 'sq. ft.',
    minArea: '800 sq. ft.', maxArea: '', notes: 'Rate varies based on specifications and materials chosen. Basic rate includes standard finishes.',
    isActive: true
  },
  {
    id: 'svc-002', engineerId: 'eng-001', name: 'Building Planning & Design',
    description: 'Architectural planning, structural design, and approval drawings for residential buildings.',
    category: 'planning', pricingMethod: 'fixed', rate: 15000, unit: 'per plan',
    minArea: '', maxArea: '', notes: 'Includes 2 revisions. Additional revisions charged separately.',
    isActive: true
  },
  {
    id: 'svc-003', engineerId: 'eng-001', name: 'Structural Design Consultation',
    description: 'Structural analysis and design for residential and small commercial buildings.',
    category: 'planning', pricingMethod: 'percentage', rate: 3, unit: '% of project cost',
    minArea: '', maxArea: '', notes: 'Applicable for projects above ₹20 lakhs.',
    isActive: true
  },

  // === Engineer eng-002 (Anitha) ===
  {
    id: 'svc-004', engineerId: 'eng-002', name: 'Commercial Building Construction',
    description: 'End-to-end commercial construction including office spaces, retail units, and mixed-use buildings.',
    category: 'commercial', pricingMethod: 'per_sqft', rate: 2200, unit: 'sq. ft.',
    minArea: '2000 sq. ft.', maxArea: '', notes: 'Includes structural design. Interior finishing quoted separately.',
    isActive: true
  },
  {
    id: 'svc-005', engineerId: 'eng-002', name: 'Interior Design & Execution',
    description: 'Complete interior design including modular furniture, lighting design, flooring, and decor.',
    category: 'interior', pricingMethod: 'per_sqft', rate: 800, unit: 'sq. ft.',
    minArea: '500 sq. ft.', maxArea: '', notes: 'Includes design consultation, 3D visualization, and execution.',
    isActive: true
  },
  {
    id: 'svc-006', engineerId: 'eng-002', name: 'Architectural Planning',
    description: 'Custom architectural design with 3D visualization and approval-ready drawings.',
    category: 'planning', pricingMethod: 'fixed', rate: 25000, unit: 'per project',
    minArea: '', maxArea: '', notes: 'Includes 3D rendering and 3 revision rounds.',
    isActive: true
  },

  // === Engineer eng-003 (Irfan) ===
  {
    id: 'svc-007', engineerId: 'eng-003', name: 'Residential Construction',
    description: 'Affordable residential construction with quality materials and on-time delivery.',
    category: 'residential', pricingMethod: 'per_sqft', rate: 1600, unit: 'sq. ft.',
    minArea: '600 sq. ft.', maxArea: '', notes: 'Most affordable rates in Ballari. 15+ years of trust.',
    isActive: true
  },
  {
    id: 'svc-008', engineerId: 'eng-003', name: 'Home Renovation',
    description: 'Complete or partial home renovation including structural repairs, modernization, and finishing.',
    category: 'renovation', pricingMethod: 'custom', rate: 0, unit: '',
    minArea: '', maxArea: '', notes: 'Contact for a custom quote based on renovation scope and requirements.',
    isActive: true
  },
  {
    id: 'svc-009', engineerId: 'eng-003', name: 'Construction Consultation',
    description: 'Expert consultation for construction planning, material selection, and cost estimation.',
    category: 'consultation', pricingMethod: 'hourly', rate: 1500, unit: 'per hour',
    minArea: '', maxArea: '', notes: 'Minimum 2 hours per consultation session.',
    isActive: true
  },

  // === Engineer eng-004 (Priya) ===
  {
    id: 'svc-010', engineerId: 'eng-004', name: 'Structural Design',
    description: 'Advanced structural analysis and design using modern software tools.',
    category: 'planning', pricingMethod: 'percentage', rate: 4, unit: '% of project cost',
    minArea: '', maxArea: '', notes: 'Includes soil analysis report and foundation design.',
    isActive: true
  },
  {
    id: 'svc-011', engineerId: 'eng-004', name: 'Quantity Estimation',
    description: 'Detailed quantity surveying and cost estimation for construction projects.',
    category: 'consultation', pricingMethod: 'fixed', rate: 10000, unit: 'per project',
    minArea: '', maxArea: '', notes: 'Detailed BOQ with material and labour breakup.',
    isActive: true
  },

  // === Engineer eng-005 (Venkatesh) ===
  {
    id: 'svc-012', engineerId: 'eng-005', name: 'Commercial Construction',
    description: 'Large-scale commercial and industrial construction projects.',
    category: 'commercial', pricingMethod: 'per_sqft', rate: 2400, unit: 'sq. ft.',
    minArea: '5000 sq. ft.', maxArea: '', notes: 'Suitable for office buildings, warehouses, and retail complexes.',
    isActive: true
  },
  {
    id: 'svc-013', engineerId: 'eng-005', name: 'Residential Construction',
    description: 'Premium residential construction with high-quality finishes.',
    category: 'residential', pricingMethod: 'per_sqft', rate: 2100, unit: 'sq. ft.',
    minArea: '1000 sq. ft.', maxArea: '', notes: 'Premium packages include imported fittings and designer finishes.',
    isActive: true
  },
  {
    id: 'svc-014', engineerId: 'eng-005', name: 'Site Supervision',
    description: 'Professional site supervision to ensure quality construction.',
    category: 'consultation', pricingMethod: 'daily', rate: 3000, unit: 'per day',
    minArea: '', maxArea: '', notes: 'Includes daily progress reports and quality checks.',
    isActive: true
  },

  // === Engineer eng-006 (Suresh) ===
  {
    id: 'svc-015', engineerId: 'eng-006', name: 'Kitchen Renovation',
    description: 'Complete kitchen remodeling with modular kitchen installation.',
    category: 'renovation', pricingMethod: 'fixed', rate: 250000, unit: 'per kitchen',
    minArea: '', maxArea: '', notes: 'Starting price. Varies based on size and material selection.',
    isActive: true
  },
  {
    id: 'svc-016', engineerId: 'eng-006', name: 'Bathroom Renovation',
    description: 'Modern bathroom renovation with waterproofing and premium fixtures.',
    category: 'renovation', pricingMethod: 'fixed', rate: 150000, unit: 'per bathroom',
    minArea: '', maxArea: '', notes: 'Includes waterproofing, tiling, and fixture installation.',
    isActive: true
  },
  {
    id: 'svc-017', engineerId: 'eng-006', name: 'Complete Home Renovation',
    description: 'Full home renovation from structural changes to finishing touches.',
    category: 'renovation', pricingMethod: 'per_sqft', rate: 950, unit: 'sq. ft.',
    minArea: '500 sq. ft.', maxArea: '', notes: 'Includes demolition, structural work, electrical, plumbing, and finishing.',
    isActive: true
  },

  // === Engineer eng-007 (Lakshmi) ===
  {
    id: 'svc-018', engineerId: 'eng-007', name: 'Residential Construction',
    description: 'Cost-effective residential construction with detailed project estimation.',
    category: 'residential', pricingMethod: 'per_sqft', rate: 1750, unit: 'sq. ft.',
    minArea: '700 sq. ft.', maxArea: '', notes: 'Includes detailed estimation before construction begins.',
    isActive: true
  },
  {
    id: 'svc-019', engineerId: 'eng-007', name: 'Project Estimation & Consultation',
    description: 'Detailed project cost estimation, BOQ preparation, and construction consultation.',
    category: 'consultation', pricingMethod: 'fixed', rate: 8000, unit: 'per project',
    minArea: '', maxArea: '', notes: 'Covers material estimation, labour costs, and timeline planning.',
    isActive: true
  },
];

// Categories for service browsing
export const serviceCategories = [
  { id: 'residential', name: 'Residential Construction', icon: 'Home', description: 'Build your dream home with expert engineers' },
  { id: 'commercial', name: 'Commercial Construction', icon: 'Building2', description: 'Office buildings, retail spaces, and commercial complexes' },
  { id: 'renovation', name: 'Home Renovation', icon: 'Hammer', description: 'Transform and modernize your existing space' },
  { id: 'interior', name: 'Interior Work', icon: 'Palette', description: 'Professional interior design and execution' },
  { id: 'planning', name: 'Structural Design', icon: 'Ruler', description: 'Expert structural analysis and building design' },
  { id: 'planning', name: 'Building Planning', icon: 'FileText', description: 'Architectural planning and approval drawings' },
  { id: 'consultation', name: 'Construction Consultation', icon: 'MessageSquare', description: 'Expert advice on construction projects' },
  { id: 'consultation', name: 'Project Estimation', icon: 'Calculator', description: 'Accurate cost estimation and BOQ preparation' },
];
