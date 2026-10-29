import { Link } from 'react-router-dom';
import { HardHat, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{ background: 'var(--color-gray-50)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '500px', background: 'var(--color-white)', padding: '3rem 2rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-gray-200)', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'var(--color-primary-bg)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <HardHat size={36} />
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--color-navy)', lineHeight: 1 }}>404</h1>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '12px 0 8px' }}>Blueprint Not Found</h2>
        <p style={{ color: 'var(--color-gray-600)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '2rem' }}>
          The page or structural design you are looking for does not exist or has been relocated.
        </p>
        <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={16} /> Return to Home
        </Link>
      </div>
    </div>
  );
}
