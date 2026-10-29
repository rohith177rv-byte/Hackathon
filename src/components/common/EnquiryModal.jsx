import { useState } from 'react';
import { X, Send, Calendar, DollarSign, MapPin, Building, CheckCircle } from 'lucide-react';
import { enquiryService } from '../../services/enquiryService';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

export default function EnquiryModal({ engineer, isOpen, onClose }) {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    customerName: user?.name || '',
    customerEmail: user?.email || '',
    customerPhone: user?.phone || '',
    projectCategory: engineer?.specializations?.[0] || 'Residential Construction',
    projectLocation: '',
    projectDescription: '',
    approximateBudget: '₹25,00,000 - ₹50,00,000',
    approximateArea: '1800 sq ft',
    expectedStartDate: '',
    preferredContact: 'phone'
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen || !engineer) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await enquiryService.submitEnquiry({
        ...formData,
        customerId: user?.id || null,
        engineerId: engineer.id
      });
      if (res.success) {
        setSuccess(true);
        addToast(`Inquiry sent to ${engineer.name}!`, 'success');
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 1800);
      } else {
        addToast(res.error || 'Failed to send inquiry.', 'error');
      }
    } catch {
      addToast('An unexpected error occurred.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop active" onClick={onClose} style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '16px'
    }}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--color-white)',
          borderRadius: 'var(--radius-xl)',
          width: '100%',
          maxWidth: '620px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: '28px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-gray-900)' }}>
              Request Consultation & Quote
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-gray-500)', marginTop: '4px' }}>
              Direct message to <strong>{engineer.name}</strong> ({engineer.professionalTitle})
            </p>
          </div>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm"
            style={{ padding: '6px', borderRadius: 'var(--radius-full)' }}
          >
            <X size={20} />
          </button>
        </div>

        {success ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--color-success-bg)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckCircle size={36} />
            </div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Inquiry Dispatched Successfully!</h4>
            <p style={{ color: 'var(--color-gray-600)', marginTop: '8px', fontSize: '0.9rem' }}>
              {engineer.name} has received your request. Typical response time is within {engineer.responseTime || '4 hours'}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label className="form-label" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>Your Name *</label>
                <input
                  type="text"
                  name="customerName"
                  className="form-control"
                  required
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="e.g. Ramesh Kumar"
                />
              </div>
              <div>
                <label className="form-label" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>Phone Number *</label>
                <input
                  type="tel"
                  name="customerPhone"
                  className="form-control"
                  required
                  value={formData.customerPhone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label className="form-label" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>Email Address *</label>
              <input
                type="email"
                name="customerEmail"
                className="form-control"
                required
                value={formData.customerEmail}
                onChange={handleChange}
                placeholder="your.email@example.com"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label className="form-label" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>Project Category</label>
                <select
                  name="projectCategory"
                  className="form-control"
                  value={formData.projectCategory}
                  onChange={handleChange}
                >
                  <option value="Residential Construction">Residential Construction</option>
                  <option value="Commercial Complex">Commercial Complex</option>
                  <option value="Structural Audit">Structural Audit & Safety</option>
                  <option value="Architectural Design">Architectural Design & Blueprint</option>
                  <option value="Interior Architecture">Interior Architecture</option>
                  <option value="Renovation & Expansion">Renovation & Expansion</option>
                </select>
              </div>
              <div>
                <label className="form-label" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>Site Location</label>
                <input
                  type="text"
                  name="projectLocation"
                  className="form-control"
                  required
                  value={formData.projectLocation}
                  onChange={handleChange}
                  placeholder="City, District (e.g. Kochi, Kerala)"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label className="form-label" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>Approximate Budget</label>
                <input
                  type="text"
                  name="approximateBudget"
                  className="form-control"
                  value={formData.approximateBudget}
                  onChange={handleChange}
                  placeholder="e.g. ₹35,00,000"
                />
              </div>
              <div>
                <label className="form-label" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>Target Built-up Area</label>
                <input
                  type="text"
                  name="approximateArea"
                  className="form-control"
                  value={formData.approximateArea}
                  onChange={handleChange}
                  placeholder="e.g. 2400 sq.ft"
                />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label className="form-label" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>Project Requirements & Timeline *</label>
              <textarea
                name="projectDescription"
                className="form-control"
                rows={3}
                required
                value={formData.projectDescription}
                onChange={handleChange}
                placeholder="Describe your site condition, number of floors, preferred materials, or specific structural challenges..."
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
              <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={submitting} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Send size={16} />
                {submitting ? 'Submitting...' : 'Send Inquiry'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
