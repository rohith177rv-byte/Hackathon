import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowRight, CheckCircle2, Info, Building2, Layers, DollarSign } from 'lucide-react';

export default function CostEstimator() {
  const [area, setArea] = useState(1800);
  const [floors, setFloors] = useState('G+1');
  const [qualityGrade, setQualityGrade] = useState('premium');
  const [projectType, setProjectType] = useState('villa');

  // Rates per sq.ft based on grade
  const gradeRates = {
    standard: {
      rate: 1850,
      title: 'Standard Economy',
      desc: 'Quality 53-grade cement, Fe-550D steel, standard vitrified tiles (₹55/sq.ft), branded CPVC plumbing, and emulsion paint.'
    },
    premium: {
      rate: 2250,
      title: 'Premium Quality (Recommended)',
      desc: 'Top-tier ACC/Ultratech cement, Jindal/Tata TMT steel, large-format glazed vitrified tiles, teak main door, and Kohler/Jaquar sanitary.'
    },
    luxury: {
      rate: 2950,
      title: 'Ultra Luxury & High-End',
      desc: 'Imported Italian marble/engineered hardwood, smart home automation, UPVC soundproof German windows, VRV HVAC, and designer facade.'
    }
  };

  const typeMultipliers = {
    villa: 1.0,
    duplex: 1.05,
    apartment: 0.95,
    commercial: 1.15
  };

  const floorMultiplier = {
    'G': 1.0,
    'G+1': 1.02,
    'G+2': 1.05,
    'G+3': 1.08
  }[floors] || 1.0;

  const currentRate = Math.round(gradeRates[qualityGrade].rate * typeMultipliers[projectType] * floorMultiplier);
  const totalCost = area * currentRate;

  // Breakdown stages
  const stages = [
    { name: 'Excavation & Substructure Foundation', pct: 15, cost: Math.round(totalCost * 0.15) },
    { name: 'RCC Columns, Beams & Slabs Superstructure', pct: 23, cost: Math.round(totalCost * 0.23) },
    { name: 'Brick/Block Masonry Walls', pct: 14, cost: Math.round(totalCost * 0.14) },
    { name: 'Internal & External Plastering', pct: 9, cost: Math.round(totalCost * 0.09) },
    { name: 'Flooring, Tiling & Countertops', pct: 13, cost: Math.round(totalCost * 0.13) },
    { name: 'Plumbing, Water Lines & Sanitary Fixtures', pct: 9, cost: Math.round(totalCost * 0.09) },
    { name: 'Electrical Grid Wiring, DB & Switches', pct: 8, cost: Math.round(totalCost * 0.08) },
    { name: 'Painting, Windows, Doors & Finishing', pct: 9, cost: Math.round(totalCost * 0.09) },
  ];

  // Material estimates
  const cementBags = Math.round(area * 0.42);
  const steelTons = (area * 0.0038).toFixed(1);
  const sandCft = Math.round(area * 1.8);
  const aggregateCft = Math.round(area * 1.35);

  const formatLakhs = (val) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Crores`;
    }
    return `₹${(val / 100000).toFixed(2)} Lakhs`;
  };

  return (
    <div className="estimator-page" style={{ background: 'var(--color-gray-50)', padding: '3.5rem 0 5rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Accurate Building Estimation
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-navy)', margin: '8px 0 14px' }}>
            Construction Cost Estimator
          </h1>
          <p style={{ color: 'var(--color-gray-600)', fontSize: '1rem', lineHeight: 1.6 }}>
            Accurately model your construction budget based on current Karnataka material prices, labor rates, and engineering finishing specifications.
          </p>
        </div>

        {/* Calculator Main Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.3fr', gap: '2.5rem', alignItems: 'flex-start' }}>
          {/* Left Form Panel */}
          <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-gray-200)', padding: '2.25rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calculator size={20} color="var(--color-primary)" /> Project Parameters
            </h3>

            {/* Built-up Area Slider */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-gray-800)' }}>
                  Total Built-up Area
                </label>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                  {area.toLocaleString()} sq.ft
                </div>
              </div>
              <input
                type="range"
                min="500"
                max="8000"
                step="50"
                value={area}
                onChange={(e) => setArea(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-primary)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-gray-400)', marginTop: '4px' }}>
                <span>500 sq.ft</span>
                <span>4,000 sq.ft</span>
                <span>8,000 sq.ft</span>
              </div>
            </div>

            {/* Project Type */}
            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-gray-800)', marginBottom: '8px' }}>
                Building Typology
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {[
                  { id: 'villa', label: 'Independent Villa' },
                  { id: 'duplex', label: 'Duplex Home' },
                  { id: 'apartment', label: 'Multi-Unit Apartment' },
                  { id: 'commercial', label: 'Commercial Complex' },
                ].map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setProjectType(t.id)}
                    className={`btn btn-sm ${projectType === t.id ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ padding: '10px', fontSize: '0.85rem' }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Floors */}
            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-gray-800)', marginBottom: '8px' }}>
                Number of Floors
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {['G', 'G+1', 'G+2', 'G+3'].map(f => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFloors(f)}
                    className={`btn btn-sm ${floors === f ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ padding: '8px' }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Quality Grade */}
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-gray-800)', marginBottom: '10px' }}>
                Finishing & Material Grade
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {Object.entries(gradeRates).map(([key, item]) => {
                  const selected = qualityGrade === key;
                  return (
                    <div
                      key={key}
                      onClick={() => setQualityGrade(key)}
                      style={{
                        border: `2px solid ${selected ? 'var(--color-primary)' : 'var(--color-gray-200)'}`,
                        background: selected ? 'var(--color-primary-bg)' : 'var(--color-white)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '14px',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: selected ? 'var(--color-primary)' : 'var(--color-gray-900)' }}>
                          {item.title}
                        </span>
                        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: selected ? 'var(--color-primary)' : 'var(--color-navy)' }}>
                          ₹{item.rate}/sq.ft
                        </span>
                      </div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--color-gray-600)', marginTop: '4px', lineHeight: 1.4 }}>
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Summary & Breakdown Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Top Cost Card */}
            <div style={{ background: 'var(--color-navy)', color: 'var(--color-white)', borderRadius: 'var(--radius-xl)', padding: '2.25rem', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ fontSize: '0.85rem', color: '#93c5fd', fontWeight: 600, textTransform: 'uppercase' }}>
                Estimated Total Project Outlay
              </div>
              <div style={{ fontSize: 'clamp(2.4rem, 4vw, 3.2rem)', fontWeight: 800, margin: '8px 0', color: '#fff' }}>
                {formatLakhs(totalCost)}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--color-gray-300)' }}>
                Average Cost Rate: <strong>₹{currentRate.toLocaleString()}/sq.ft</strong> built-up area
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '12px' }}>
                <Link
                  to={`/engineers?q=${projectType}`}
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '12px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 600 }}
                >
                  Hire Engineers for this Project <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Material Requirement Approximation */}
            <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-gray-200)', padding: '1.75rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '1rem' }}>
                Key Raw Material Requirements
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <div style={{ background: 'var(--color-gray-50)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)', textTransform: 'uppercase', fontWeight: 600 }}>Cement</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-navy)', marginTop: '2px' }}>~{cementBags} Bags</div>
                </div>
                <div style={{ background: 'var(--color-gray-50)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)', textTransform: 'uppercase', fontWeight: 600 }}>TMT Steel</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-navy)', marginTop: '2px' }}>~{steelTons} Metric Tons</div>
                </div>
                <div style={{ background: 'var(--color-gray-50)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)', textTransform: 'uppercase', fontWeight: 600 }}>M-Sand / Sand</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-navy)', marginTop: '2px' }}>~{sandCft} Cft</div>
                </div>
                <div style={{ background: 'var(--color-gray-50)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)', textTransform: 'uppercase', fontWeight: 600 }}>Coarse Aggregate</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-navy)', marginTop: '2px' }}>~{aggregateCft} Cft</div>
                </div>
              </div>
            </div>

            {/* Stage-wise Breakdown */}
            <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-gray-200)', padding: '1.75rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '1.25rem' }}>
                Stage-Wise Milestone Cost Allocation
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {stages.map((stage, idx) => (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                      <span style={{ color: 'var(--color-gray-800)', fontWeight: 500 }}>{stage.name}</span>
                      <span style={{ fontWeight: 700, color: 'var(--color-navy)' }}>{formatLakhs(stage.cost)} ({stage.pct}%)</span>
                    </div>
                    <div style={{ height: '6px', background: 'var(--color-gray-100)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${stage.pct * 3.5}%`, height: '100%', background: 'var(--color-primary)' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
