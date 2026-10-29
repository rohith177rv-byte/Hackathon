import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Award, CheckCircle2, Check, Scale } from 'lucide-react';
import RatingStars from '../common/RatingStars';
import Badge from '../common/Badge';
import { useCompare } from '../../contexts/CompareContext';
import './EngineerCard.css';

export default function EngineerCard({ engineer, onEnquire }) {
  const { isComparing, toggleCompare, compareList } = useCompare();
  const comparing = isComparing(engineer.id);

  return (
    <div className="engineer-card">
      <div className="card-top">
        <div className="avatar-wrapper">
          <img
            src={engineer.profileImage || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`}
            alt={engineer.name}
            className="engineer-avatar"
          />
          {engineer.isVerified && (
            <span className="verified-icon" title="Certified & Background Verified">
              <CheckCircle2 size={16} />
            </span>
          )}
        </div>

        <div className="card-header-info">
          <div className="card-title-row">
            <Link to={`/engineers/${engineer.id}`} className="engineer-name">
              {engineer.name}
            </Link>
          </div>
          <p className="engineer-title">{engineer.professionalTitle}</p>
          <div className="rating-row">
            <RatingStars rating={engineer.rating || 4.8} count={engineer.reviewCount || engineer.totalReviews || 12} />
          </div>
        </div>
      </div>

      <div className="card-meta">
        <div className="meta-item">
          <Briefcase size={14} />
          <span>{engineer.experience || 5}+ yrs exp</span>
        </div>
        <div className="meta-item">
          <MapPin size={14} />
          <span style={{ textTransform: 'capitalize' }}>
            {(engineer.serviceAreas?.[0]?.district || engineer.serviceAreas?.[0]?.districtId || engineer.city || 'Ballari, KA').replace(/-/g, ' ')}
          </span>
        </div>
        <div className="meta-item rate">
          <span>₹{engineer.startingPrice ? engineer.startingPrice.toLocaleString() : '5,000'}</span>
          <span className="rate-unit">/consult</span>
        </div>
      </div>

      <div className="card-tags">
        {(engineer.specializations || ['Structural Design', 'Site Supervision']).slice(0, 3).map((spec, i) => (
          <span key={i} className="spec-tag">{spec}</span>
        ))}
      </div>

      <p className="engineer-intro">
        {engineer.introduction ? (engineer.introduction.slice(0, 110) + '...') : 'Dedicated civil engineer specializing in robust structural designs, green buildings, and turnkey contracting.'}
      </p>

      <div className="card-actions">
        <button
          type="button"
          onClick={() => toggleCompare(engineer)}
          className={`compare-toggle-btn ${comparing ? 'active' : ''}`}
          title={comparing ? 'Remove from comparison' : 'Compare up to 3 engineers'}
        >
          <Scale size={14} />
          <span>{comparing ? 'Comparing' : 'Compare'}</span>
        </button>

        <div className="primary-actions">
          <Link to={`/engineers/${engineer.id}`} className="btn btn-secondary btn-sm">
            Profile
          </Link>
          <button
            type="button"
            onClick={() => onEnquire && onEnquire(engineer)}
            className="btn btn-primary btn-sm"
          >
            Quote
          </button>
        </div>
      </div>
    </div>
  );
}
