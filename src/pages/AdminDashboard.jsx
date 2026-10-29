import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { adminService } from '../services/adminService';
import { engineerService } from '../services/engineerService';
import {
  ShieldCheck, Users, CheckCircle, XCircle, HardHat,
  FileText, Activity, AlertTriangle, Search
} from 'lucide-react';
import Badge from '../components/common/Badge';

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('approvals');
  const [stats, setStats] = useState(null);
  const [engineers, setEngineers] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    async function loadAdminData() {
      setLoading(true);
      const stRes = await adminService.getPlatformStats();
      if (stRes.success) setStats(stRes.data);

      const engRes = await engineerService.getAllEngineers();
      if (engRes.success) setEngineers(engRes.data);

      const logRes = await adminService.getAuditLogs();
      if (logRes.success) setAuditLogs(logRes.data);

      setLoading(false);
    }
    loadAdminData();
  }, [user, navigate]);

  if (!user || user.role !== 'admin') return null;

  const handleApprove = async (id, name) => {
    const res = await engineerService.approveEngineer(id);
    if (res.success) {
      setEngineers(prev => prev.map(e => e.id === id ? { ...e, approvalStatus: 'approved', isVerified: true } : e));
      addToast(`Approved license application for ${name}`, 'success');
      const logRes = await adminService.getAuditLogs();
      if (logRes.success) setAuditLogs(logRes.data);
    }
  };

  const handleReject = async (id, name) => {
    const res = await engineerService.rejectEngineer(id, 'Missing municipal council document');
    if (res.success) {
      setEngineers(prev => prev.map(e => e.id === id ? { ...e, approvalStatus: 'rejected', isActive: false } : e));
      addToast(`Rejected application for ${name}`, 'info');
      const logRes = await adminService.getAuditLogs();
      if (logRes.success) setAuditLogs(logRes.data);
    }
  };

  const handleToggleStatus = async (id) => {
    const res = await engineerService.toggleEngineerStatus(id);
    if (res.success) {
      setEngineers(prev => prev.map(e => e.id === id ? { ...e, isActive: !e.isActive } : e));
      addToast('Engineer listing status updated', 'info');
    }
  };

  const pendingEngineers = engineers.filter(e => e.approvalStatus === 'pending');

  return (
    <div className="admin-dashboard" style={{ background: 'var(--color-gray-50)', padding: '3rem 0 5rem', minHeight: '85vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(37,99,235,0.1)', color: 'var(--color-primary)', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>
            <ShieldCheck size={14} /> Super Admin Control Center
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-navy)' }}>
            Platform Administration
          </h1>
          <p style={{ color: 'var(--color-gray-600)', fontSize: '0.92rem' }}>
            Verify engineer credentials, inspect audit trails, and manage platform service standards.
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
          <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', border: '1px solid var(--color-gray-200)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-gray-500)', fontWeight: 600, textTransform: 'uppercase' }}>Registered Engineers</span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-navy)', marginTop: '4px' }}>
              {engineers.length}
            </div>
          </div>
          <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', border: '1px solid var(--color-gray-200)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-gray-500)', fontWeight: 600, textTransform: 'uppercase' }}>Pending Approvals</span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: pendingEngineers.length > 0 ? 'var(--color-warning)' : 'var(--color-success)', marginTop: '4px' }}>
              {pendingEngineers.length}
            </div>
          </div>
          <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', border: '1px solid var(--color-gray-200)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-gray-500)', fontWeight: 600, textTransform: 'uppercase' }}>Total Audit Events</span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: '4px' }}>
              {auditLogs.length}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '2px solid var(--color-gray-200)',
          marginBottom: '2rem',
          background: 'var(--color-white)',
          padding: '8px 16px 0',
          borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0'
        }}>
          {[
            { id: 'approvals', label: `Pending Approvals (${pendingEngineers.length})` },
            { id: 'engineers', label: `All Engineers (${engineers.length})` },
            { id: 'audit', label: `System Audit Logs (${auditLogs.length})` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeTab === tab.id ? '3px solid var(--color-primary)' : '3px solid transparent',
                padding: '12px 18px',
                fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-gray-600)',
                cursor: 'pointer',
                fontSize: '0.92rem',
                transition: 'all var(--transition-fast)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: PENDING APPROVALS */}
        {activeTab === 'approvals' && (
          <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-gray-200)', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--color-gray-200)' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-navy)' }}>
                New Engineer Registration Applications
              </h3>
            </div>

            {pendingEngineers.length === 0 ? (
              <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                <CheckCircle size={44} style={{ color: 'var(--color-success)', margin: '0 auto 1rem' }} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>All Applications Reviewed</h4>
                <p style={{ color: 'var(--color-gray-500)', fontSize: '0.88rem' }}>There are no pending engineer registration requests at this time.</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--color-gray-50)', borderBottom: '1px solid var(--color-gray-200)', fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--color-gray-500)' }}>
                      <th style={{ padding: '14px 20px' }}>Applicant</th>
                      <th style={{ padding: '14px 20px' }}>Registration / License</th>
                      <th style={{ padding: '14px 20px' }}>Experience</th>
                      <th style={{ padding: '14px 20px' }}>Application Date</th>
                      <th style={{ padding: '14px 20px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingEngineers.map((eng) => (
                      <tr key={eng.id} style={{ borderBottom: '1px solid var(--color-gray-100)' }}>
                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ fontWeight: 700, color: 'var(--color-gray-900)' }}>{eng.name}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--color-gray-500)' }}>{eng.professionalTitle} • {eng.email}</div>
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <Badge variant="accent">{eng.registrationNumber || 'KA-ENG-8492'}</Badge>
                        </td>
                        <td style={{ padding: '16px 20px' }}>{eng.experience} Years</td>
                        <td style={{ padding: '16px 20px', color: 'var(--color-gray-500)' }}>{eng.joinedDate}</td>
                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={() => handleApprove(eng.id, eng.name)}
                              className="btn btn-primary btn-sm"
                              style={{ background: 'var(--color-success)', borderColor: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '4px' }}
                            >
                              <CheckCircle size={14} /> Approve
                            </button>
                            <button
                              onClick={() => handleReject(eng.id, eng.name)}
                              className="btn btn-secondary btn-sm"
                              style={{ color: 'var(--color-error)', display: 'flex', alignItems: 'center', gap: '4px' }}
                            >
                              <XCircle size={14} /> Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ALL ENGINEERS */}
        {activeTab === 'engineers' && (
          <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-gray-200)', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--color-gray-200)' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-navy)' }}>
                Platform Engineers Registry
              </h3>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: 'var(--color-gray-50)', borderBottom: '1px solid var(--color-gray-200)', fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--color-gray-500)' }}>
                    <th style={{ padding: '14px 20px' }}>Engineer</th>
                    <th style={{ padding: '14px 20px' }}>License Reg</th>
                    <th style={{ padding: '14px 20px' }}>Approval Status</th>
                    <th style={{ padding: '14px 20px' }}>Listing Active</th>
                    <th style={{ padding: '14px 20px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {engineers.map((eng) => (
                    <tr key={eng.id} style={{ borderBottom: '1px solid var(--color-gray-100)' }}>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ fontWeight: 700, color: 'var(--color-gray-900)' }}>{eng.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-gray-500)' }}>{eng.professionalTitle}</div>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        {eng.registrationNumber || 'KA-ENG-8492'}
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <Badge variant={eng.approvalStatus === 'approved' ? 'success' : eng.approvalStatus === 'rejected' ? 'error' : 'warning'}>
                          {eng.approvalStatus}
                        </Badge>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <Badge variant={eng.isActive ? 'primary' : 'neutral'}>
                          {eng.isActive ? 'Active' : 'Suspended'}
                        </Badge>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <button
                          onClick={() => handleToggleStatus(eng.id)}
                          className="btn btn-secondary btn-sm"
                          style={{ fontSize: '0.78rem' }}
                        >
                          {eng.isActive ? 'Suspend' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: AUDIT LOGS */}
        {activeTab === 'audit' && (
          <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-gray-200)', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--color-gray-200)' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-navy)' }}>
                Immutable Audit Trail
              </h3>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: 'var(--color-gray-50)', borderBottom: '1px solid var(--color-gray-200)', fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--color-gray-500)' }}>
                    <th style={{ padding: '14px 20px' }}>Timestamp</th>
                    <th style={{ padding: '14px 20px' }}>Action</th>
                    <th style={{ padding: '14px 20px' }}>Performed By</th>
                    <th style={{ padding: '14px 20px' }}>Target</th>
                    <th style={{ padding: '14px 20px' }}>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log) => (
                    <tr key={log.id} style={{ borderBottom: '1px solid var(--color-gray-100)' }}>
                      <td style={{ padding: '14px 20px', color: 'var(--color-gray-500)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td style={{ padding: '14px 20px', fontWeight: 600, color: 'var(--color-navy)' }}>
                        {log.action}
                      </td>
                      <td style={{ padding: '14px 20px', color: 'var(--color-gray-700)' }}>
                        {log.performedBy}
                      </td>
                      <td style={{ padding: '14px 20px', fontWeight: 500 }}>
                        {log.target}
                      </td>
                      <td style={{ padding: '14px 20px', color: 'var(--color-gray-600)', fontSize: '0.82rem' }}>
                        {log.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
