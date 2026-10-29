// ============================================================
// BuildConnect - Projects Mock Data
// Multiple projects per engineer, different categories/statuses.
// In production, this comes from the Spring Boot API.
// ============================================================

export const projects = [
  // === Engineer eng-001 (Rajesh Kumar Patil) projects ===
  {
    id: 'proj-001',
    engineerId: 'eng-001',
    title: 'Modern Villa in Ballari',
    category: 'residential',
    type: 'Independent House',
    description: 'A contemporary 3BHK independent villa featuring modern architecture with open floor plans, large windows for natural lighting, and a landscaped garden. Built with premium materials including vitrified flooring, modular kitchen, and energy-efficient design.',
    location: { districtId: 'ballari', townId: 'ballari-city' },
    startYear: 2023,
    completionYear: 2024,
    status: 'completed',
    plotArea: '2400 sq. ft.',
    builtUpArea: '1800 sq. ft.',
    floors: 2,
    budget: '₹45,00,000',
    coverImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    images: [
      { url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop', caption: 'Front elevation view' },
      { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop', caption: 'Living room interior' },
      { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop', caption: 'Kitchen area' },
      { url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7c5a38?w=800&h=600&fit=crop', caption: 'Garden and entrance' }
    ],
    publicationStatus: 'published'
  },
  {
    id: 'proj-002',
    engineerId: 'eng-001',
    title: 'Residential Complex - Sunrise Homes',
    category: 'residential',
    type: 'Apartment Building',
    description: 'A 12-unit residential apartment complex with modern amenities including covered parking, children\'s play area, and 24/7 water supply. Each unit features 2BHK configuration with balcony and cross ventilation.',
    location: { districtId: 'ballari', townId: 'hospete' },
    startYear: 2022,
    completionYear: 2024,
    status: 'completed',
    plotArea: '6000 sq. ft.',
    builtUpArea: '12000 sq. ft.',
    floors: 4,
    budget: '₹2,50,00,000',
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    images: [
      { url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop', caption: 'Building exterior' },
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', caption: 'Sample apartment interior' },
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop', caption: 'Balcony view' }
    ],
    publicationStatus: 'published'
  },
  {
    id: 'proj-003',
    engineerId: 'eng-001',
    title: 'Eco-Friendly Farmhouse',
    category: 'residential',
    type: 'Farmhouse',
    description: 'An eco-friendly farmhouse built with sustainable materials, rainwater harvesting system, solar panels, and organic garden integration. Designed for comfortable rural living with modern amenities.',
    location: { districtId: 'ballari', townId: 'siruguppa' },
    startYear: 2024,
    completionYear: null,
    status: 'ongoing',
    plotArea: '5000 sq. ft.',
    builtUpArea: '2200 sq. ft.',
    floors: 1,
    budget: '₹55,00,000',
    coverImage: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop',
    images: [
      { url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop', caption: 'Design rendering' },
      { url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop', caption: 'Foundation work in progress' }
    ],
    publicationStatus: 'published'
  },

  // === Engineer eng-002 (Anitha Sharma) projects ===
  {
    id: 'proj-004',
    engineerId: 'eng-002',
    title: 'Sapphire Commercial Complex',
    category: 'commercial',
    type: 'Shopping Complex',
    description: 'A modern commercial complex with 24 retail units, centralized air conditioning, escalators, ample parking, and contemporary facade design. Located in the commercial hub of Ballari city.',
    location: { districtId: 'ballari', townId: 'ballari-city' },
    startYear: 2022,
    completionYear: 2024,
    status: 'completed',
    plotArea: '10000 sq. ft.',
    builtUpArea: '25000 sq. ft.',
    floors: 3,
    budget: '₹4,50,00,000',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    images: [
      { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop', caption: 'Exterior view' },
      { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', caption: 'Interior common area' },
      { url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop', caption: 'Office space design' }
    ],
    publicationStatus: 'published'
  },
  {
    id: 'proj-005',
    engineerId: 'eng-002',
    title: 'Luxury Penthouse Interior',
    category: 'renovation',
    type: 'Interior Renovation',
    description: 'Complete interior renovation of a 3000 sq. ft. penthouse including custom furniture, Italian marble flooring, smart home integration, designer lighting, and modern kitchen with premium appliances.',
    location: { districtId: 'ballari', townId: 'hospete' },
    startYear: 2024,
    completionYear: 2024,
    status: 'completed',
    plotArea: '',
    builtUpArea: '3000 sq. ft.',
    floors: 1,
    budget: '₹35,00,000',
    coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop',
    images: [
      { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop', caption: 'Living area after renovation' },
      { url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop', caption: 'Modern kitchen design' },
      { url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop', caption: 'Master bedroom' }
    ],
    publicationStatus: 'published'
  },

  // === Engineer eng-003 (Mohammed Irfan) projects ===
  {
    id: 'proj-006',
    engineerId: 'eng-003',
    title: 'Budget-Friendly 2BHK Home',
    category: 'residential',
    type: 'Independent House',
    description: 'An affordable 2BHK house designed for a young family. Features include a compact yet functional layout, quality construction with locally sourced materials, rainwater harvesting, and a small garden area.',
    location: { districtId: 'ballari', townId: 'kampli' },
    startYear: 2023,
    completionYear: 2024,
    status: 'completed',
    plotArea: '1200 sq. ft.',
    builtUpArea: '900 sq. ft.',
    floors: 1,
    budget: '₹18,00,000',
    coverImage: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
    images: [
      { url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop', caption: 'Completed house front view' },
      { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop', caption: 'Interior hall' }
    ],
    publicationStatus: 'published'
  },
  {
    id: 'proj-007',
    engineerId: 'eng-003',
    title: 'Complete Home Renovation - Heritage Style',
    category: 'renovation',
    type: 'Full Renovation',
    description: 'Transformation of a 30-year-old house into a modern living space while preserving the heritage stone exterior. Included structural reinforcement, new electrical wiring, plumbing upgrade, modern bathrooms, and open kitchen.',
    location: { districtId: 'ballari', townId: 'ballari-city' },
    startYear: 2024,
    completionYear: 2024,
    status: 'completed',
    plotArea: '1800 sq. ft.',
    builtUpArea: '1500 sq. ft.',
    floors: 2,
    budget: '₹22,00,000',
    coverImage: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&h=600&fit=crop',
    images: [
      { url: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&h=600&fit=crop', caption: 'After renovation exterior' },
      { url: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop', caption: 'Renovated entrance' },
      { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop', caption: 'Modern bathroom after renovation' }
    ],
    publicationStatus: 'published'
  },
  {
    id: 'proj-008',
    engineerId: 'eng-003',
    title: 'Duplex House with Terrace Garden',
    category: 'residential',
    type: 'Duplex House',
    description: 'A spacious duplex house featuring a rooftop terrace garden, modular kitchen, and premium finishes. Designed for a joint family with separate living areas on each floor.',
    location: { districtId: 'ballari', townId: 'hospete' },
    startYear: 2024,
    completionYear: null,
    status: 'ongoing',
    plotArea: '2000 sq. ft.',
    builtUpArea: '2800 sq. ft.',
    floors: 2,
    budget: '₹52,00,000',
    coverImage: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop',
    images: [
      { url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop', caption: '3D rendered design' },
      { url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop', caption: 'Construction progress' }
    ],
    publicationStatus: 'published'
  },

  // === Engineer eng-004 (Priya Desai) projects ===
  {
    id: 'proj-009',
    engineerId: 'eng-004',
    title: 'Modern Minimalist Residence',
    category: 'residential',
    type: 'Independent House',
    description: 'A minimalist 3BHK residence with clean lines, open spaces, and sustainable design elements. Features include passive cooling, double-height living room, and a private courtyard.',
    location: { districtId: 'ballari', townId: 'ballari-city' },
    startYear: 2024,
    completionYear: 2024,
    status: 'completed',
    plotArea: '1600 sq. ft.',
    builtUpArea: '1400 sq. ft.',
    floors: 2,
    budget: '₹38,00,000',
    coverImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
    images: [
      { url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop', caption: 'Front elevation' },
      { url: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop', caption: 'Double-height living room' }
    ],
    publicationStatus: 'published'
  },

  // === Engineer eng-005 (Venkatesh Gowda) projects ===
  {
    id: 'proj-010',
    engineerId: 'eng-005',
    title: 'Gowda Business Center',
    category: 'commercial',
    type: 'Office Building',
    description: 'A 5-story commercial office building with modern amenities, high-speed elevators, 100 KW power backup, fire safety systems, and CCTV surveillance. Designed for IT and professional services companies.',
    location: { districtId: 'ballari', townId: 'ballari-city' },
    startYear: 2021,
    completionYear: 2023,
    status: 'completed',
    plotArea: '8000 sq. ft.',
    builtUpArea: '30000 sq. ft.',
    floors: 5,
    budget: '₹6,00,00,000',
    coverImage: 'https://images.unsplash.com/photo-1554435493-93422e8220c8?w=800&h=600&fit=crop',
    images: [
      { url: 'https://images.unsplash.com/photo-1554435493-93422e8220c8?w=800&h=600&fit=crop', caption: 'Building exterior' },
      { url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop', caption: 'Office interior' },
      { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', caption: 'Lobby area' }
    ],
    publicationStatus: 'published'
  },
  {
    id: 'proj-011',
    engineerId: 'eng-005',
    title: 'Premium Row Houses - Palm Meadows',
    category: 'residential',
    type: 'Row Houses',
    description: 'A cluster of 8 premium row houses in a gated community. Each unit features 3BHK with private parking, small garden, and shared community amenities like a clubhouse and swimming pool.',
    location: { districtId: 'ballari', townId: 'hospete' },
    startYear: 2023,
    completionYear: null,
    status: 'ongoing',
    plotArea: '1500 sq. ft. each',
    builtUpArea: '1800 sq. ft. each',
    floors: 2,
    budget: '₹3,20,00,000 (total)',
    coverImage: 'https://images.unsplash.com/photo-1625602812206-5ec545ca1231?w=800&h=600&fit=crop',
    images: [
      { url: 'https://images.unsplash.com/photo-1625602812206-5ec545ca1231?w=800&h=600&fit=crop', caption: 'Row houses design' },
      { url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop', caption: 'Construction site' }
    ],
    publicationStatus: 'published'
  },

  // === Engineer eng-006 (Suresh Naik) projects ===
  {
    id: 'proj-012',
    engineerId: 'eng-006',
    title: 'Kitchen & Bathroom Remodel',
    category: 'renovation',
    type: 'Partial Renovation',
    description: 'Complete kitchen and bathroom renovation for a 15-year-old apartment. Included modern modular kitchen, designer tiles, new plumbing fixtures, waterproofing, and ventilation improvements.',
    location: { districtId: 'ballari', townId: 'ballari-city' },
    startYear: 2024,
    completionYear: 2024,
    status: 'completed',
    plotArea: '',
    builtUpArea: '350 sq. ft.',
    floors: 0,
    budget: '₹6,50,000',
    coverImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
    images: [
      { url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop', caption: 'Renovated kitchen' },
      { url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop', caption: 'Modern bathroom' }
    ],
    publicationStatus: 'published'
  },
  {
    id: 'proj-013',
    engineerId: 'eng-006',
    title: 'Office Space Interior Design',
    category: 'renovation',
    type: 'Interior Renovation',
    description: 'Transformed a bare office space into a modern, functional workplace. Open-plan layout with dedicated meeting rooms, breakout areas, and ergonomic workstations.',
    location: { districtId: 'ballari', townId: 'hospete' },
    startYear: 2024,
    completionYear: null,
    status: 'ongoing',
    plotArea: '',
    builtUpArea: '2000 sq. ft.',
    floors: 1,
    budget: '₹15,00,000',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    images: [
      { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', caption: 'Design concept' }
    ],
    publicationStatus: 'published'
  },

  // === Engineer eng-007 (Lakshmi Devi) projects ===
  {
    id: 'proj-014',
    engineerId: 'eng-007',
    title: 'Affordable Housing Project',
    category: 'residential',
    type: 'Apartment Building',
    description: 'A 20-unit affordable housing project with efficient space utilization. Each 1BHK and 2BHK unit designed for maximum functionality within a compact footprint. Community facilities included.',
    location: { districtId: 'ballari', townId: 'siruguppa' },
    startYear: 2023,
    completionYear: 2024,
    status: 'completed',
    plotArea: '5000 sq. ft.',
    builtUpArea: '15000 sq. ft.',
    floors: 4,
    budget: '₹1,80,00,000',
    coverImage: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800&h=600&fit=crop',
    images: [
      { url: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800&h=600&fit=crop', caption: 'Completed building' },
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', caption: 'Sample unit interior' }
    ],
    publicationStatus: 'published'
  },

  // A draft project for testing admin moderation
  {
    id: 'proj-015',
    engineerId: 'eng-001',
    title: 'New Commercial Plaza (Draft)',
    category: 'commercial',
    type: 'Shopping Plaza',
    description: 'Upcoming commercial project in Ballari city center. Currently in planning phase.',
    location: { districtId: 'ballari', townId: 'ballari-city' },
    startYear: 2025,
    completionYear: null,
    status: 'ongoing',
    plotArea: '12000 sq. ft.',
    builtUpArea: '',
    floors: 4,
    budget: '',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    images: [],
    publicationStatus: 'draft'
  },
  {
    id: 'proj-016',
    engineerId: 'eng-003',
    title: 'Community Hall Renovation',
    category: 'renovation',
    type: 'Public Building Renovation',
    description: 'Renovation of a community hall with upgraded seating, modern stage, acoustic treatment, and new electrical installations.',
    location: { districtId: 'ballari', townId: 'kudligi' },
    startYear: 2024,
    completionYear: null,
    status: 'ongoing',
    plotArea: '4000 sq. ft.',
    builtUpArea: '3500 sq. ft.',
    floors: 1,
    budget: '₹28,00,000',
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop',
    images: [
      { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop', caption: 'Before renovation' }
    ],
    publicationStatus: 'pending_review'
  }
];
