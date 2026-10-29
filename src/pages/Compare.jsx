import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCompare } from '../contexts/CompareContext';
import { Scale, X, Send, CheckCircle2, UserPlus, ArrowLeft, Star } from 'lucide-react';
import RatingStars from '../components/common/RatingStars';
import Badge from '../components/common/Badge';
import EnquiryModal from '../components/common/EnquiryModal';

export default function Compare() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  // Modal
  const [selectedEngineer, setSelectedEngineer] = useState(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  if (compareList.length === 0) {
    return (
      <div style={{ background: 'var(--color-gray-50)', minHeight: '80vh', padding: '5rem 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'var(--color-primary-bg)',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
          }}>
            <Scale size={36} />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-navy)', marginBottom: '12px' }}>
            No Engineers Selected for Comparison
          </h2>
          <p style={{ color: 'var(--color-gray-600)', lineHeight: 1.6, marginBottom: '2rem' }}>
            You can select up to 3 certified engineers from our directory to compare their experience, pricing models, rating breakdowns, and service coverage side-by-side.
          </p>
          <Link to="/engineers" className="btn btn-primary" style={{ padding: '12px 24px', fontWeight: 600 }}>
            Browse Engineers Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="compare-page" style={{ background: 'var(--color-gray-50)', padding: '3.5rem 0 5rem', minHeight: '85vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
          <div>
            <Link to="/engineers" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--color-primary)', textDecoration: 'none', marginBottom: '8px', fontWeight: 600 }}>
              <ArrowLeft size={16} /> Back to Directory
            </Link>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-navy)' }}>
              Compare Engineers ({compareList.length}/3)
            </h1>
            <p style={{ color: 'var(--color-gray-600)', fontSize: '0.92rem' }}>
              Side-by-side comparison of technical qualifications and pricing.
            </p>
          </div>

          <button onClick={clearCompare} className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <X size={16} /> Clear All
          </button>
        </div>

        {/* Comparison Matrix Table */}
        <div style={{
          background: 'var(--color-white)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-gray-200)',
          overflowX: 'auto',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--color-gray-50)', borderBottom: '2px solid var(--color-gray-200)' }}>
                <th style={{ padding: '24px 20px', width: '220px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-gray-500)', textTransform: 'uppercase' }}>
                  Features & Details
                </th>
                {compareList.map((eng) => (
                  <th key={eng.id} style={{ padding: '24px 20px', minWidth: '260px', verticalAlign: 'top' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={eng.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                          alt={eng.name}
                          style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-full)', objectFit: 'cover' }}
                        />
                        <div>
                          <Link to={`/engineers/${eng.id}`} style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-gray-900)', textDecoration: 'none' }}>
                            {eng.name}
                          </Link>
                          <div style={{ fontSize: '0.8rem', color: 'var(--color-gray-500)' }}>{eng.professionalTitle}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCompare(eng.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--color-gray-400)', cursor: 'pointer', padding: '4px' }}
                        title="Remove from comparison"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedEngineer(eng);
                        setEnquiryModalOpen(true);
                      }}
                      className="btn btn-primary btn-sm"
                      style={{ width: '100%', marginTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                    >
                      <Send size={14} /> Request Quote
                    </button>
                  </th>
                ))}
                {compareList.length < 3 && (
                  <th style={{ padding: '24px 20px', minWidth: '220px', verticalAlign: 'middle', textAlign: 'center', borderLeft: '1px dashed var(--color-gray-300)' }}>
                    <Link to="/engineers" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--color-primary-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <UserPlus size={20} />
                      </div>
                      <span>Add Engineer to Compare</span>
                    </Link>
                  </th>
                )}
              </tr>
            </thead>

            <tbody style={{ fontSize: '0.9rem' }}>
              {/* Row: Verified Status */}
              <tr style={{ borderBottom: '1px solid var(--color-gray-200)' }}>
                <td style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--color-gray-700)', background: 'var(--color-gray-50)' }}>
                  Verification
                </td>
                {compareList.map(eng => (
                  <td key={eng.id} style={{ padding: '16px 20px' }}>
                    {eng.isVerified ? (
                      <Badge variant="success">✓ Certified License</Badge>
                    ) : (
                      <Badge variant="neutral">Pending Verification</Badge>
                    )}
                  </td>
                ))}
                {compareList.length < 3 && <td style={{ borderLeft: '1px dashed var(--color-gray-300)' }} />}
              </tr>

              {/* Row: Rating */}
              <tr style={{ borderBottom: '1px solid var(--color-gray-200)' }}>
                <td style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--color-gray-700)', background: 'var(--color-gray-50)' }}>
                  Overall Rating
                </td>
                {compareList.map(eng => (
                  <td key={eng.id} style={{ padding: '16px 20px' }}>
                    <RatingStars rating={eng.rating || 4.8} count={eng.reviewCount || 14} size={15} />
                  </td>
                ))}
                {compareList.length < 3 && <td style={{ borderLeft: '1px dashed var(--color-gray-300)' }} />}
              </tr>

              {/* Row: Experience */}
              <tr style={{ borderBottom: '1px solid var(--color-gray-200)' }}>
                <td style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--color-gray-700)', background: 'var(--color-gray-50)' }}>
                  Field Experience
                </td>
                {compareList.map(eng => (
                  <td key={eng.id} style={{ padding: '16px 20px', fontWeight: 700, color: 'var(--color-navy)' }}>
                    {eng.experience}+ Years
                  </td>
                ))}
                {compareList.length < 3 && <td style={{ borderLeft: '1px dashed var(--color-gray-300)' }} />}
              </tr>

              {/* Row: Consultation Starting Rate */}
              <tr style={{ borderBottom: '1px solid var(--color-gray-200)' }}>
                <td style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--color-gray-700)', background: 'var(--color-gray-50)' }}>
                  Consultation Starting At
                </td>
                {compareList.map(eng => (
                  <td key={eng.id} style={{ padding: '16px 20px', fontWeight: 700, color: 'var(--color-primary)' }}>
                    ₹{eng.startingPrice ? eng.startingPrice.toLocaleString() : '5,000'}
                  </td>
                ))}
                {compareList.length < 3 && <td style={{ borderLeft: '1px dashed var(--color-gray-300)' }} />}
              </tr>

              {/* Row: Primary Specializations */}
              <tr style={{ borderBottom: '1px solid var(--color-gray-200)' }}>
                <td style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--color-gray-700)', background: 'var(--color-gray-50)' }}>
                  Core Specializations
                </td>
                {compareList.map(eng => (
                  <td key={eng.id} style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {(eng.specializations || ['Structural Design', 'Site Inspection']).map((s, i) => (
                        <span key={i} style={{ background: '#f1f5f9', color: '#334155', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
                {compareList.length < 3 && <td style={{ borderLeft: '1px dashed var(--color-gray-300)' }} />}
              </tr>

              {/* Row: Coverage Districts */}
              <tr style={{ borderBottom: '1px solid var(--color-gray-200)' }}>
                <td style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--color-gray-700)', background: 'var(--color-gray-50)' }}>
                  Service Locations
                </td>
                {compareList.map(eng => (
                  <td key={eng.id} style={{ padding: '16px 20px', color: 'var(--color-gray-700)' }}>
                    {eng.serviceAreas?.[0]?.district || eng.city || 'Karnataka District Wide'}
                  </td>
                ))}
                {compareList.length < 3 && <td style={{ borderLeft: '1px dashed var(--color-gray-300)' }} />}
              </tr>

              {/* Row: Response Time */}
              <tr>
                <td style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--color-gray-700)', background: 'var(--color-gray-50)' }}>
                  Response Time
                </td>
                {compareList.map(eng => (
                  <td key={eng.id} style={{ padding: '16px 20px', color: 'var(--color-gray-600)' }}>
                    Within {eng.responseTime || '4 hours'}
                  </td>
                ))}
                {compareList.length < 3 && <td style={{ borderLeft: '1px dashed var(--color-gray-300)' }} />}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <EnquiryModal
        engineer={selectedEngineer}
        isOpen={enquiryModalOpen}
        onClose={() => {
          setEnquiryModalOpen(false);
          setSelectedEngineer(null);
        }}
      />
    </div>
  );
}
