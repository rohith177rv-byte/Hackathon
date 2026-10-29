import { MapPin, Calendar, DollarSign, Layers } from 'lucide-react';
import Badge from '../common/Badge';

export default function ProjectCard({ project, onClick }) {
  if (!project) return null;

  // Safe image resolution
  let cover = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80';
  if (project.coverImage) {
    cover = project.coverImage;
  } else if (project.images && project.images.length > 0) {
    cover = typeof project.images[0] === 'string' ? project.images[0] : (project.images[0]?.url || cover);
  }

  // Safe location string
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

  const costText = project.cost || project.budget || null;
  const yearText = project.completionDate || project.completionYear || project.startYear || '2024';

  return (
    <div
      onClick={() => onClick && onClick(project)}
      style={{
        background: 'var(--color-white)',
        border: '1px solid var(--color-gray-200)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base)',
        display: 'flex',
        flexDirection: 'column'
      }}
      className="project-card-hover"
    >
      <div style={{ position: 'relative', height: '220px', background: '#e2e8f0', overflow: 'hidden' }}>
        <img
          src={cover}
          alt={project.title || 'Construction Project'}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          className="project-cover-img"
        />
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
          <Badge variant="navy">{project.category || 'Residential'}</Badge>
        </div>
        {costText && (
          <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(4px)', color: '#fff', padding: '4px 10px', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', fontWeight: 700 }}>
            {costText}
          </div>
        )}
      </div>

      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-gray-900)', marginBottom: '6px', lineHeight: 1.3 }}>
          {project.title}
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-gray-500)', fontSize: '0.82rem', marginBottom: '10px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', textTransform: 'capitalize' }}>
            <MapPin size={14} /> {locationText}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={14} /> {yearText}
          </span>
        </div>

        <p style={{ fontSize: '0.86rem', color: 'var(--color-gray-600)', lineHeight: 1.45, marginBottom: '1rem', flex: 1 }}>
          {project.description ? (project.description.slice(0, 95) + '...') : 'Turnkey structural architectural execution with high durability seismic-resistant RCC frame.'}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--color-gray-100)', fontSize: '0.82rem' }}>
          <span style={{ color: 'var(--color-gray-500)' }}>By {project.engineerName || 'Verified Consultant'}</span>
          <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>View Specs →</span>
        </div>
      </div>
    </div>
  );
}
