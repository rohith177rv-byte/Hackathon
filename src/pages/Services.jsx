import { Link } from 'react-router-dom';
import {
  HardHat, Compass, Home as HomeIcon, Hammer, Ruler,
  FileText, ShieldCheck, ArrowRight, CheckCircle2, Layers
} from 'lucide-react';

export default function Services() {
  const serviceCategories = [
    {
      id: 'structural',
      title: 'Structural Engineering & RCC Design',
      icon: <HardHat size={32} />,
      tagline: 'Seismic resilience, load transfer calculations, and robust foundations',
      benchmarkRate: '₹12 - ₹28 / sq.ft',
      specialtyQuery: 'Structural Engineering',
      deliverables: [
        'Soil bearing capacity analysis & foundation layout',
        'Column, plinth beam & tie-beam reinforcement schedules',
        'Slab thickness & bar bending schedules (BBS)',
        'Earthquake Zone II/III compliance certification',
        'Stability audits for additional floor expansions'
      ],
      suitableFor: 'New residential villas, apartment complexes, commercial towers, warehouses'
    },
    {
      id: 'architecture',
      title: 'Architectural Design & Planning',
      icon: <Compass size={32} />,
      tagline: 'Contemporary elevations, Vaastu adherence, and municipal sanctions',
      benchmarkRate: '₹20 - ₹50 / sq.ft',
      specialtyQuery: 'Architectural Design',
      deliverables: [
        'Complete floor plans with spatial flow optimization',
        'Photorealistic 3D external facades and night lighting renders',
        'Municipal authority sanction blueprints (BBMP/BDA/City Corp)',
        'Electrical & plumbing duct route layouts',
        'Door/window joinery & finishing schedules'
      ],
      suitableFor: 'Modern duplex homes, luxury farmhouses, commercial retail outlets'
    },
    {
      id: 'contracting',
      title: 'Turnkey Civil Construction',
      icon: <Hammer size={32} />,
      tagline: 'End-to-end building execution from excavation to key handover',
      benchmarkRate: '₹1,850 - ₹2,750 / sq.ft',
      specialtyQuery: 'Civil Contracting',
      deliverables: [
        'Stage-wise site excavation, PCC, RCC column casting',
        'Solid concrete block/red brick masonry execution',
        'Internal & external double-coat plastering',
        'Material procurement with grade-A cement & 550D TMT steel',
        'On-site senior engineer supervision & milestone logs'
      ],
      suitableFor: 'Property owners seeking hassle-free turnkey home construction'
    },
    {
      id: 'interior',
      title: 'Interior Architecture & Fit-outs',
      icon: <HomeIcon size={32} />,
      tagline: 'Bespoke living environments, modular kitchens, and ambient illumination',
      benchmarkRate: '₹850 - ₹1,800 / sq.ft',
      specialtyQuery: 'Interior Design',
      deliverables: [
        'Modular kitchen layout with premium marine-ply & quartz tops',
        'False ceiling designs with cove lighting fixtures',
        'Master bedroom wardrobe & vanity units',
        'Custom wall paneling, acoustic treatment, and color palettes',
        'Bathroom sanitary fittings & plumbing alignment'
      ],
      suitableFor: 'New apartments, renovated villas, boutique offices'
    },
    {
      id: 'mep',
      title: 'MEP (Mechanical, Electrical, Plumbing)',
      icon: <Ruler size={32} />,
      tagline: 'High-efficiency piping, electrical load balancing, and HVAC ducting',
      benchmarkRate: '₹8 - ₹18 / sq.ft',
      specialtyQuery: 'MEP Consulting',
      deliverables: [
        'Single-line diagrams (SLD) & DB phase load calculations',
        'Sewage disposal, drainage, and rainwater harvesting piping',
        'HVAC air-conditioning load & duct routing layouts',
        'Fire fighting hydrant & sprinkler placement compliance'
      ],
      suitableFor: 'Commercial complexes, multi-family residences, hospitals, hotels'
    },
    {
      id: 'valuation',
      title: 'Property Valuation & Stability Audits',
      icon: <FileText size={32} />,
      tagline: 'Government-approved charter valuations and building structural safety check',
      benchmarkRate: '₹5,000 - ₹25,000 fixed',
      specialtyQuery: 'Valuation & Estimation',
      deliverables: [
        'Non-destructive concrete rebound hammer test',
        'Crack diagnosis, foundation settlement & corrosion check',
        'Detailed bank loan valuation & asset evaluation report',
        'Legal compliance & structural fitness certificate'
      ],
      suitableFor: 'Banks, prospective buyers, aging building retrofitting'
    }
  ];

  return (
    <div className="services-page" style={{ background: 'var(--color-gray-50)', padding: '3.5rem 0 5rem' }}>
      <div className="container">
        {/* Page Hero */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 4rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Standardized Engineering Catalog
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-navy)', margin: '8px 0 16px' }}>
            Comprehensive Construction Services
          </h1>
          <p style={{ color: 'var(--color-gray-600)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Every discipline is backed by verified licensed practitioners. Explore standard rates, deliverables, and find certified specialists.
          </p>
        </div>

        {/* Services List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {serviceCategories.map((svc) => (
            <div
              key={svc.id}
              style={{
                background: 'var(--color-white)',
                border: '1px solid var(--color-gray-200)',
                borderRadius: 'var(--radius-xl)',
                padding: '2.5rem',
                display: 'grid',
                gridTemplateColumns: '1.2fr 1.5fr auto',
                gap: '2.5rem',
                alignItems: 'center'
              }}
            >
              {/* Left Column: Title & Tagline */}
              <div>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: 'var(--radius-xl)',
                  background: 'var(--color-primary-bg)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  {svc.icon}
                </div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-navy)', marginBottom: '8px' }}>
                  {svc.title}
                </h2>
                <p style={{ color: 'var(--color-gray-600)', fontSize: '0.92rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {svc.tagline}
                </p>
                <div style={{ background: 'var(--color-gray-50)', padding: '10px 14px', borderRadius: 'var(--radius-md)', display: 'inline-block' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Standard Market Rate</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>{svc.benchmarkRate}</span>
                </div>
              </div>

              {/* Middle Column: Key Deliverables */}
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-gray-800)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
                  Key Engineering Deliverables
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {svc.deliverables.map((d, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.88rem', color: 'var(--color-gray-700)' }}>
                      <CheckCircle2 size={16} color="var(--color-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
                <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--color-gray-500)', fontStyle: 'italic' }}>
                  Best for: {svc.suitableFor}
                </p>
              </div>

              {/* Right Column: CTA */}
              <div style={{ textAlign: 'center', minWidth: '180px' }}>
                <Link
                  to={`/engineers?specialty=${encodeURIComponent(svc.specialtyQuery)}`}
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px 20px', fontWeight: 600, width: '100%' }}
                >
                  Find Specialists <ArrowRight size={16} />
                </Link>
                <Link
                  to="/calculator"
                  className="btn btn-ghost btn-sm"
                  style={{ marginTop: '8px', display: 'block', fontSize: '0.82rem', color: 'var(--color-gray-600)' }}
                >
                  Calculate Cost
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
