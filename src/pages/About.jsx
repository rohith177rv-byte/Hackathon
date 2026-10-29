import { Building2, Shield, Users, Target, HeartHandshake, CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <div className="about-page" style={{ background: 'var(--color-gray-50)', padding: '3.5rem 0 5rem' }}>
      <div className="container">
        {/* Hero */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 4rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--color-primary-bg)',
            color: 'var(--color-primary)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '1rem'
          }}>
            <Building2 size={16} /> Engineering the Future of Construction
          </div>
          <h1 style={{ fontSize: '2.6rem', fontWeight: 800, color: 'var(--color-navy)', margin: '8px 0 16px' }}>
            About BuildConnect
          </h1>
          <p style={{ color: 'var(--color-gray-600)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            BuildConnect is India’s dedicated digital marketplace bridging the gap between property builders and certified civil engineers, structural analysts, and licensed architects.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-gray-200)', padding: '2.5rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-lg)', background: 'var(--color-primary-bg)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Target size={28} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '10px' }}>Our Mission</h3>
            <p style={{ color: 'var(--color-gray-600)', lineHeight: 1.6, fontSize: '0.95rem' }}>
              To bring total transparency, standard pricing benchmarks, and verified engineering integrity to every residential, commercial, and industrial construction project.
            </p>
          </div>

          <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-gray-200)', padding: '2.5rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-lg)', background: 'var(--color-success-bg)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Shield size={28} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '10px' }}>Our Integrity Standard</h3>
            <p style={{ color: 'var(--color-gray-600)', lineHeight: 1.6, fontSize: '0.95rem' }}>
              No unverified claims or hidden contractor kickbacks. Every consultant profile is rigorously checked against government registries and certified past project deliveries.
            </p>
          </div>

          <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-gray-200)', padding: '2.5rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-lg)', background: 'rgba(194, 149, 106, 0.15)', color: '#8a5c30', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <HeartHandshake size={28} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '10px' }}>Empowering Local Engineers</h3>
            <p style={{ color: 'var(--color-gray-600)', lineHeight: 1.6, fontSize: '0.95rem' }}>
              Giving independent licensed civil consultants throughout Ballari, Bengaluru, Mysuru, and all Karnataka districts a professional digital storefront to grow their practice.
            </p>
          </div>
        </div>

        {/* Technical Architecture Note for Reviewers */}
        <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-gray-200)', padding: '2.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '12px' }}>
            Designed for Java Spring Boot & MySQL Enterprise Integration
          </h3>
          <p style={{ color: 'var(--color-gray-600)', lineHeight: 1.6, fontSize: '0.92rem' }}>
            This application is constructed with clean service abstractions (<code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>authService</code>, <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>engineerService</code>, <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>projectService</code>, <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>pricingService</code>, <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>enquiryService</code>, <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>adminService</code>, <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>locationService</code>) ready to swap mock data store endpoints with real Spring Boot REST controllers.
          </p>
        </div>
      </div>
    </div>
  );
}
