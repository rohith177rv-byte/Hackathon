import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { authService } from '../services/authService';
import { Building2, UserPlus, HardHat, User, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Register() {
  const { type } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useToast();

  const [isEngineer, setIsEngineer] = useState(type === 'engineer');

  // Customer form state
  const [custData, setCustData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  // Engineer form state
  const [engData, setEngData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    professionalTitle: 'Civil & Structural Engineer',
    registrationNumber: '',
    experience: 5,
    specializations: ['Structural Engineering'],
    district: 'ballari'
  });

  const [loading, setLoading] = useState(false);

  const handleCustomerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authService.registerCustomer(custData);
      if (res.success) {
        login(res.user);
        addToast('Registration successful! Welcome to BuildConnect.', 'success');
        navigate('/customer/dashboard');
      } else {
        addToast(res.error || 'Registration failed.', 'error');
      }
    } catch {
      addToast('An unexpected error occurred.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEngineerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authService.registerEngineer({
        ...engData,
        serviceAreas: [{ districtId: engData.district, townIds: [] }]
      });
      if (res.success) {
        login(res.user);
        addToast('Application submitted! Your profile is pending verification.', 'success');
        navigate('/engineer/dashboard');
      } else {
        addToast(res.error || 'Registration failed.', 'error');
      }
    } catch {
      addToast('An unexpected error occurred.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'var(--color-gray-50)', minHeight: '85vh', padding: '4rem 0' }}>
      <div className="container" style={{ maxWidth: isEngineer ? '640px' : '480px', margin: '0 auto' }}>
        <div style={{
          background: 'var(--color-white)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-gray-200)',
          padding: '2.5rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-navy)', fontSize: '1.5rem', fontWeight: 800, textDecoration: 'none' }}>
              <Building2 size={32} color="var(--color-primary)" />
              <span>Build<strong style={{ color: 'var(--color-primary)' }}>Connect</strong></span>
            </Link>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-navy)', marginTop: '1rem' }}>
              Create Your BuildConnect Account
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-gray-500)', marginTop: '4px' }}>
              {isEngineer ? 'Register your practice to offer engineering & architectural services' : 'Sign up to find top verified engineers for your construction'}
            </p>
          </div>

          {/* Account Type Toggle */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '1.75rem' }}>
            <button
              type="button"
              onClick={() => setIsEngineer(false)}
              className={`btn ${!isEngineer ? 'btn-primary' : 'btn-secondary'}`}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px' }}
            >
              <User size={16} /> I am a Property Owner
            </button>
            <button
              type="button"
              onClick={() => setIsEngineer(true)}
              className={`btn ${isEngineer ? 'btn-primary' : 'btn-secondary'}`}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px' }}
            >
              <HardHat size={16} /> I am an Engineer / Architect
            </button>
          </div>

          {!isEngineer ? (
            /* Customer Form */
            <form onSubmit={handleCustomerSubmit}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-gray-700)', marginBottom: '6px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={custData.name}
                  onChange={(e) => setCustData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Ramesh Kumar"
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-gray-700)', marginBottom: '6px' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  className="form-control"
                  required
                  value={custData.email}
                  onChange={(e) => setCustData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="ramesh@example.com"
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-gray-700)', marginBottom: '6px' }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  className="form-control"
                  required
                  value={custData.phone}
                  onChange={(e) => setCustData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+91 98765 43210"
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-gray-700)', marginBottom: '6px' }}>
                  Password *
                </label>
                <input
                  type="password"
                  className="form-control"
                  required
                  value={custData.password}
                  onChange={(e) => setCustData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Create a strong password"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ width: '100%', padding: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <UserPlus size={18} />
                {loading ? 'Creating Account...' : 'Register as Client'}
              </button>
            </form>
          ) : (
            /* Engineer Form */
            <form onSubmit={handleEngineerSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-gray-700)', marginBottom: '6px' }}>
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={engData.name}
                    onChange={(e) => setEngData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Er. Vinod Kumar"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-gray-700)', marginBottom: '6px' }}>
                    Professional Title *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={engData.professionalTitle}
                    onChange={(e) => setEngData(prev => ({ ...prev, professionalTitle: e.target.value }))}
                    placeholder="Structural Consultant"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-gray-700)', marginBottom: '6px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    value={engData.email}
                    onChange={(e) => setEngData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="vinod@buildconnect.com"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-gray-700)', marginBottom: '6px' }}>
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    required
                    value={engData.phone}
                    onChange={(e) => setEngData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+91 94480 12345"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '14px', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-gray-700)', marginBottom: '6px' }}>
                    Council / Municipal Reg. Number *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={engData.registrationNumber}
                    onChange={(e) => setEngData(prev => ({ ...prev, registrationNumber: e.target.value }))}
                    placeholder="e.g. BBMP/SE/2019/4829"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-gray-700)', marginBottom: '6px' }}>
                    Experience (Years)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    className="form-control"
                    required
                    value={engData.experience}
                    onChange={(e) => setEngData(prev => ({ ...prev, experience: parseInt(e.target.value) }))}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-gray-700)', marginBottom: '6px' }}>
                  Primary District of Operation
                </label>
                <select
                  className="form-control"
                  value={engData.district}
                  onChange={(e) => setEngData(prev => ({ ...prev, district: e.target.value }))}
                >
                  <option value="ballari">Ballari</option>
                  <option value="bengaluru-urban">Bengaluru Urban</option>
                  <option value="mysuru">Mysuru</option>
                  <option value="mangaluru">Dakshina Kannada</option>
                  <option value="hubli-dharwad">Dharwad</option>
                  <option value="belagavi">Belagavi</option>
                  <option value="davanagere">Davanagere</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-gray-700)', marginBottom: '6px' }}>
                  Account Password *
                </label>
                <input
                  type="password"
                  className="form-control"
                  required
                  value={engData.password}
                  onChange={(e) => setEngData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Create a password"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ width: '100%', padding: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <ShieldCheck size={18} />
                {loading ? 'Submitting Application...' : 'Register as Engineer'}
              </button>
            </form>
          )}

          {/* Footer note */}
          <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.85rem', color: 'var(--color-gray-600)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
