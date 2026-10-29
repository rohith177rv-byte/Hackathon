import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { authService } from '../services/authService';
import store from '../data/store';
import { Building2, LogIn, Sparkles, User, HardHat, ShieldCheck } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useToast();

  const [role, setRole] = useState('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authService.login(email, password, role);
      if (res.success) {
        login(res.user);
        addToast(`Welcome back, ${res.user.name}!`, 'success');
        if (role === 'admin') navigate('/admin/dashboard');
        else if (role === 'engineer') navigate('/engineer/dashboard');
        else navigate('/customer/dashboard');
      } else {
        addToast(res.error || 'Invalid credentials', 'error');
      }
    } catch {
      addToast('An unexpected error occurred.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Quick Demo Login Helper
  const handleQuickDemo = (demoRole) => {
    if (demoRole === 'admin') {
      const u = { ...store.adminUser, role: 'admin' };
      login(u);
      addToast('Logged in as Platform Administrator', 'success');
      navigate('/admin/dashboard');
    } else if (demoRole === 'engineer') {
      const eng = store.engineers[0] || { id: 'eng-001', name: 'Er. Rajeshwari Rao', role: 'engineer' };
      login({ ...eng, role: 'engineer' });
      addToast(`Logged in as ${eng.name} (Engineer)`, 'success');
      navigate('/engineer/dashboard');
    } else {
      const cust = store.customers[0] || { id: 'cust-001', name: 'Ramesh Kumar', role: 'customer' };
      login({ ...cust, role: 'customer' });
      addToast(`Logged in as ${cust.name} (Client)`, 'success');
      navigate('/customer/dashboard');
    }
  };

  return (
    <div style={{ background: 'var(--color-gray-50)', minHeight: '85vh', padding: '4rem 0', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '480px', margin: '0 auto' }}>
        <div style={{
          background: 'var(--color-white)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-gray-200)',
          padding: '2.5rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.04)'
        }}>
          {/* Logo & Heading */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-navy)', fontSize: '1.5rem', fontWeight: 800, textDecoration: 'none' }}>
              <Building2 size={32} color="var(--color-primary)" />
              <span>Build<strong style={{ color: 'var(--color-primary)' }}>Connect</strong></span>
            </Link>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-navy)', marginTop: '1rem' }}>
              Sign In to Your Account
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-gray-500)', marginTop: '4px' }}>
              Access your project quotes, dashboard, and consultations
            </p>
          </div>

          {/* 1-Click Quick Demo Switcher */}
          <div style={{ background: 'var(--color-primary-bg)', border: '1px solid rgba(37,99,235,0.2)', borderRadius: 'var(--radius-lg)', padding: '14px', marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: '8px' }}>
              <Sparkles size={14} /> 1-Click Quick Demo Login:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              <button
                type="button"
                onClick={() => handleQuickDemo('customer')}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.75rem', padding: '6px 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
              >
                <User size={13} /> Client
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('engineer')}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.75rem', padding: '6px 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
              >
                <HardHat size={13} /> Engineer
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.75rem', padding: '6px 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
              >
                <ShieldCheck size={13} /> Admin
              </button>
            </div>
          </div>

          {/* Role selector */}
          <div style={{ display: 'flex', background: 'var(--color-gray-100)', padding: '4px', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
            {['customer', 'engineer', 'admin'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                style={{
                  flex: 1,
                  padding: '8px',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  cursor: 'pointer',
                  background: role === r ? 'var(--color-white)' : 'transparent',
                  color: role === r ? 'var(--color-primary)' : 'var(--color-gray-600)',
                  boxShadow: role === r ? 'var(--shadow-sm)' : 'none',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-gray-700)', marginBottom: '6px' }}>
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'admin' ? 'admin@buildconnect.com' : role === 'engineer' ? 'engineer@buildconnect.com' : 'client@example.com'}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-gray-700)' }}>
                  Password
                </label>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-primary)', cursor: 'pointer' }}>
                  Forgot password?
                </span>
              </div>
              <input
                type="password"
                className="form-control"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ width: '100%', padding: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <LogIn size={18} />
              {loading ? 'Authenticating...' : `Sign In as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
            </button>
          </form>

          {/* Footer note */}
          <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.85rem', color: 'var(--color-gray-600)' }}>
            Don't have an account?{' '}
            <Link to="/register/customer" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>
              Register as Client
            </Link>
            {' '}or{' '}
            <Link to="/register/engineer" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>
              Engineer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
