import { Link } from 'react-router-dom';
import { Search, Scale, FileText, CheckCircle2, Shield, Users, ArrowRight, Award, Clock } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Specify Your Construction Requirements',
      desc: 'Use our filters to select your district in Karnataka, the project category (residential villa, commercial complex, or structural audit), and your estimated built-up area.',
      icon: <Search size={28} />
    },
    {
      num: '02',
      title: 'Compare Certified Engineers Side-by-Side',
      desc: 'Inspect engineers’ council licenses, field experience, completed project photos, and verified reviews. Use our Compare feature to evaluate 3 profiles simultaneously.',
      icon: <Scale size={28} />
    },
    {
      num: '03',
      title: 'Request Detailed Milestone Quotes',
      desc: 'Send your project drawings or plot details directly to shortlisted consultants. Receive transparent breakdown proposals covering design, sanction, and site visits.',
      icon: <FileText size={28} />
    },
    {
      num: '04',
      title: 'Execute with Guaranteed Standards',
      desc: 'Collaborate with regular stage inspections, foundation soil verification, bar-bending verification, and municipal sanction documentation.',
      icon: <CheckCircle2 size={28} />
    }
  ];

  return (
    <div className="how-it-works-page" style={{ background: 'var(--color-gray-50)', padding: '3.5rem 0 5rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 4rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Transparent & Reliable
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-navy)', margin: '8px 0 16px' }}>
            How BuildConnect Works
          </h1>
          <p style={{ color: 'var(--color-gray-600)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Connecting property owners with verified civil engineers through a clear, accountable, and transparent workflow.
          </p>
        </div>

        {/* 4 Steps Container */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          {steps.map((s, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--color-white)',
                border: '1px solid var(--color-gray-200)',
                borderRadius: 'var(--radius-xl)',
                padding: '2.25rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '24px',
                fontSize: '2rem',
                fontWeight: 800,
                color: 'var(--color-gray-200)'
              }}>
                {s.num}
              </div>

              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--color-primary-bg)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                {s.icon}
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '10px' }}>
                {s.title}
              </h3>

              <p style={{ color: 'var(--color-gray-600)', fontSize: '0.9rem', lineHeight: 1.6, flex: 1 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Verification Guarantee */}
        <div style={{ background: 'var(--color-navy)', color: 'var(--color-white)', borderRadius: 'var(--radius-xl)', padding: '3rem', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>
              Our 4-Point Engineer Verification Protocol
            </h2>
            <p style={{ color: 'var(--color-gray-300)', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              We review every practicing engineer before they can offer services on BuildConnect.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} color="#60a5fa" /> Professional degree verification (VTU, NIT, IIT)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} color="#60a5fa" /> Municipal and Council of Architecture license checks
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} color="#60a5fa" /> Physical inspection of 3 past completed structures
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} color="#60a5fa" /> Clean client grievance and structural audit record
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/engineers" className="btn btn-primary" style={{ padding: '14px 28px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Find Your Verified Engineer <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
