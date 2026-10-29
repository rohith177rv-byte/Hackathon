import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { enquiryService } from '../services/enquiryService';
import { Send, Clock, CheckCircle2, AlertCircle, Building2, Calculator, Search, User } from 'lucide-react';
import Badge from '../components/common/Badge';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    async function loadCustomerData() {
      setLoading(true);
      const res = await enquiryService.getCustomerEnquiries(user.id);
      if (res.success) {
        setEnquiries(res.data);
      }
      setLoading(false);
    }
    loadCustomerData();
  }, [user, navigate]);

  if (!user) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return <Badge variant="warning">Submitted / Pending</Badge>;
      case 'contacted':
        return <Badge variant="primary">Consultant Contacted</Badge>;
      case 'quoted':
        return <Badge variant="accent">Quote Received</Badge>;
      case 'accepted':
        return <Badge variant="success">Milestone Active</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="customer-dashboard" style={{ background: 'var(--color-gray-50)', padding: '3rem 0 5rem', minHeight: '85vh' }}>
      <div className="container">
        {/* Welcome Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
          <div>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>Client Portal</span>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-navy)', margin: '4px 0' }}>
              Welcome back, {user.name}
            </h1>
            <p style={{ color: 'var(--color-gray-600)', fontSize: '0.92rem' }}>
              Track your consultation requests, engineer responses, and site proposals.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/calculator" className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calculator size={16} /> Cost Estimator
            </Link>
            <Link to="/engineers" className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Search size={16} /> Find More Engineers
            </Link>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
          <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', border: '1px solid var(--color-gray-200)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-gray-500)', fontWeight: 600, textTransform: 'uppercase' }}>Sent Inquiries</span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-navy)', marginTop: '4px' }}>{enquiries.length}</div>
          </div>
          <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', border: '1px solid var(--color-gray-200)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-gray-500)', fontWeight: 600, textTransform: 'uppercase' }}>Quotes Received</span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: '4px' }}>
              {enquiries.filter(e => e.status === 'quoted' || e.status === 'contacted').length}
            </div>
          </div>
          <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', border: '1px solid var(--color-gray-200)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-gray-500)', fontWeight: 600, textTransform: 'uppercase' }}>Active Projects</span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-success)', marginTop: '4px' }}>
              {enquiries.filter(e => e.status === 'accepted').length}
            </div>
          </div>
        </div>

        {/* Inquiries List */}
        <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-gray-200)', overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-navy)' }}>
              My Inquiries & Quote Requests
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-gray-500)' }}>
              {enquiries.length} requests
            </span>
          </div>

          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-gray-500)' }}>
              Loading inquiries...
            </div>
          ) : enquiries.length === 0 ? (
            <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
              <Send size={44} style={{ color: 'var(--color-gray-300)', margin: '0 auto 1rem' }} />
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>No Inquiries Sent Yet</h4>
              <p style={{ color: 'var(--color-gray-500)', fontSize: '0.88rem', margin: '6px auto 1.5rem', maxWidth: '400px' }}>
                Browse our directory of certified civil engineers and request your first free consultation quote.
              </p>
              <Link to="/engineers" className="btn btn-primary btn-sm">
                Explore Verified Engineers
              </Link>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: 'var(--color-gray-50)', borderBottom: '1px solid var(--color-gray-200)', fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--color-gray-500)' }}>
                    <th style={{ padding: '14px 20px' }}>Request ID</th>
                    <th style={{ padding: '14px 20px' }}>Category & Location</th>
                    <th style={{ padding: '14px 20px' }}>Budget & Area</th>
                    <th style={{ padding: '14px 20px' }}>Status</th>
                    <th style={{ padding: '14px 20px' }}>Submitted Date</th>
                    <th style={{ padding: '14px 20px' }}>Consultant Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enq) => (
                    <tr key={enq.id} style={{ borderBottom: '1px solid var(--color-gray-100)' }}>
                      <td style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--color-navy)' }}>
                        {enq.id}
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ fontWeight: 600, color: 'var(--color-gray-900)' }}>{enq.projectCategory}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-gray-500)' }}>{enq.projectLocation}</div>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <div>{enq.approximateBudget || '₹35 - ₹50 L'}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-gray-500)' }}>{enq.approximateArea || '2000 sq.ft'}</div>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        {getStatusBadge(enq.status)}
                      </td>
                      <td style={{ padding: '16px 20px', color: 'var(--color-gray-500)', fontSize: '0.85rem' }}>
                        {enq.submittedDate}
                      </td>
                      <td style={{ padding: '16px 20px', color: 'var(--color-gray-700)', fontSize: '0.85rem' }}>
                        {enq.notes || 'Pending consultant review'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
