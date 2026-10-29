import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, MapPin, Calendar, DollarSign, User, Layers, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import Badge from './Badge';

export default function ProjectModal({ project, isOpen, onClose }) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!isOpen || !project) return null;

  // Normalize image URLs
  let imageUrls = [];
  if (project.images && project.images.length > 0) {
    imageUrls = project.images.map(img => typeof img === 'string' ? img : img.url).filter(Boolean);
  }
  if (imageUrls.length === 0 && project.coverImage) {
    imageUrls = [project.coverImage];
  }
  if (imageUrls.length === 0) {
    imageUrls = ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80'];
  }

  // Safe location formatting
  let locationText = 'Ballari, Karnataka';
  if (typeof project.location === 'string') {
    locationText = project.location;
  } else if (project.location && typeof project.location === 'object') {
    if (project.location.townId && project.location.districtId) {
      locationText = `${project.location.townId.replace(/-/g, ' ')}, ${project.location.districtId.replace(/-/g, ' ')}`;
    } else {
      locationText = project.location.districtId || project.location.name || 'Karnataka';
    }
  }

  const costText = project.cost || project.budget || '₹45 Lakhs';
  const durationText = project.duration || (project.startYear && project.completionYear ? `${project.completionYear - project.startYear + 1} Years` : '9 Months');

  return (
    <div className="modal-backdrop active" onClick={onClose} style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--color-white)',
          borderRadius: 'var(--radius-xl)',
          width: '100%',
          maxWidth: '850px',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px solid var(--color-gray-200)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Badge variant="primary">{project.category || 'Residential'}</Badge>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-gray-500)' }}>Project ID: {project.id}</span>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-sm" style={{ padding: '6px', borderRadius: 'var(--radius-full)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Hero image gallery */}
        <div style={{ position: 'relative', background: '#000', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <img
            src={imageUrls[activeImageIdx] || imageUrls[0]}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {imageUrls.length > 1 && (
            <>
              <button
                onClick={() => setActiveImageIdx((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1))}
                style={{
                  position: 'absolute',
                  left: '16px',
                  background: 'rgba(0,0,0,0.5)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={() => setActiveImageIdx((prev) => (prev === imageUrls.length - 1 ? 0 : prev + 1))}
                style={{
                  position: 'absolute',
                  right: '16px',
                  background: 'rgba(0,0,0,0.5)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <ArrowRight size={20} />
              </button>
              <div style={{ position: 'absolute', bottom: '12px', display: 'flex', gap: '6px' }}>
                {imageUrls.map((_, i) => (
                  <span
                    key={i}
                    onClick={() => setActiveImageIdx(i)}
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: activeImageIdx === i ? '#fff' : 'rgba(255,255,255,0.4)',
                      cursor: 'pointer'
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-gray-900)' }}>{project.title}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '6px', color: 'var(--color-gray-600)', fontSize: '0.9rem', textTransform: 'capitalize' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={16} /> {locationText}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={16} /> Completed {project.completionDate || project.completionYear || '2024'}</span>
              </div>
            </div>

            {project.engineerId && (
              <Link
                to={`/engineers/${project.engineerId}`}
                onClick={onClose}
                className="btn btn-secondary btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <User size={16} /> View Engineer Profile <ExternalLink size={14} />
              </Link>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', background: 'var(--color-gray-50)', padding: '16px', borderRadius: 'var(--radius-lg)', marginBottom: '20px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)', textTransform: 'uppercase', fontWeight: 600 }}>Approx. Cost</span>
              <p style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-navy)', marginTop: '2px' }}>{costText}</p>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)', textTransform: 'uppercase', fontWeight: 600 }}>Built-up Area</span>
              <p style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-navy)', marginTop: '2px' }}>{project.builtUpArea || project.area || '2,400 sq. ft.'}</p>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)', textTransform: 'uppercase', fontWeight: 600 }}>Duration</span>
              <p style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-navy)', marginTop: '2px' }}>{durationText}</p>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)', textTransform: 'uppercase', fontWeight: 600 }}>Lead Consultant</span>
              <p style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-navy)', marginTop: '2px' }}>{project.engineerName || 'Verified Consultant'}</p>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '8px' }}>Project Overview</h4>
            <p style={{ color: 'var(--color-gray-700)', lineHeight: '1.6', fontSize: '0.92rem' }}>
              {project.description || 'Comprehensive structural engineering and architectural execution completed according to highest National Building Code standards.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
