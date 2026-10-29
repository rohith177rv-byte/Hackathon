import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { enquiryService } from '../services/enquiryService';
import { projectService } from '../services/projectService';
import { pricingService } from '../services/pricingService';
import {
  Briefcase, Inbox, Plus, Trash2, CheckCircle2, ShieldAlert,
  Edit3, DollarSign, Layers, ExternalLink, Send, User, Phone, Mail
} from 'lucide-react';
import Badge from '../components/common/Badge';

export default function EngineerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('leads');
  const [enquiries, setEnquiries] = useState([]);
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add Project Form Modal
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Residential',
    cost: '',
    area: '',
    location: 'Ballari, KA',
    description: '',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80'
  });

  // Add Service Form Modal
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    category: 'residential',
    pricingMethod: 'per_sqft',
    rate: 15,
    unit: 'sq.ft',
    description: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    async function loadData() {
      setLoading(true);
      const enqRes = await enquiryService.getEngineerEnquiries(user.id);
      if (enqRes.success) setEnquiries(enqRes.data);

      const projRes = await projectService.getEngineerProjects(user.id);
      if (projRes.success) setProjects(projRes.data);

      const svcRes = await pricingService.getEngineerServices(user.id);
      if (svcRes.success) setServices(svcRes.data);
      setLoading(false);
    }
    loadData();
  }, [user, navigate]);

  if (!user) return null;

  // Update lead status
  const handleStatusChange = async (enquiryId, newStatus) => {
    const res = await enquiryService.updateEnquiryStatus(enquiryId, newStatus, `Status updated to ${newStatus}`);
    if (res.success) {
      setEnquiries(prev => prev.map(e => e.id === enquiryId ? { ...e, status: newStatus } : e));
      addToast(`Lead marked as ${newStatus}`, 'success');
    }
  };

  // Add Project
  const handleCreateProject = async (e) => {
    e.preventDefault();
    const res = await projectService.createProject({
      ...newProject,
      engineerId: user.id,
      engineerName: user.name
    });
    if (res.success) {
      setProjects(prev => [res.data, ...prev]);
      setShowAddProject(false);
      addToast('Project published to portfolio!', 'success');
    }
  };

  // Delete Project
  const handleDeleteProject = async (projId) => {
    const res = await projectService.deleteProject(projId);
    if (res.success) {
      setProjects(prev => prev.filter(p => p.id !== projId));
      addToast('Project removed.', 'info');
    }
  };

  // Add Service
  const handleCreateService = async (e) => {
    e.preventDefault();
    const res = await pricingService.createService({
      ...newService,
      engineerId: user.id
    });
    if (res.success) {
      setServices(prev => [...prev, res.data]);
      setShowAddService(false);
      addToast('Service rate added to profile!', 'success');
    }
  };

  // Delete Service
  const handleDeleteService = async (svcId) => {
    const res = await pricingService.deleteService(svcId);
    if (res.success) {
      setServices(prev => prev.filter(s => s.id !== svcId));
      addToast('Service removed.', 'info');
    }
  };

  return (
    <div className="engineer-dashboard" style={{ background: 'var(--color-gray-50)', padding: '3rem 0 5rem', minHeight: '85vh' }}>
      <div className="container">
        {/* Welcome Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
          <div>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>Engineer Practice Management</span>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-navy)', margin: '4px 0' }}>
              {user.name}
            </h1>
            <p style={{ color: 'var(--color-gray-600)', fontSize: '0.92rem' }}>
              {user.professionalTitle} • Reg No: {user.registrationNumber || 'KA-ENG-8492'}
            </p>
          </div>

          <Link to={`/engineers/${user.id}`} className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ExternalLink size={16} /> View Public Profile
          </Link>
        </div>

        {/* Verification Status Banner if pending */}
        {!user.isVerified && (
          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 'var(--radius-lg)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '2rem' }}>
            <ShieldAlert size={24} color="#d97706" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#92400e' }}>License Verification in Progress</h4>
              <p style={{ fontSize: '0.84rem', color: '#b45309', marginTop: '2px' }}>
                Your council license application is under standard review by our admin audit committee. Your portfolio projects and pricing can still be configured below.
              </p>
            </div>
          </div>
        )}

        {/* Quick Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
          <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', border: '1px solid var(--color-gray-200)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-gray-500)', fontWeight: 600, textTransform: 'uppercase' }}>Inbound Leads</span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-navy)', marginTop: '4px' }}>{enquiries.length}</div>
          </div>
          <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', border: '1px solid var(--color-gray-200)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-gray-500)', fontWeight: 600, textTransform: 'uppercase' }}>Portfolio Projects</span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: '4px' }}>{projects.length}</div>
          </div>
          <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', border: '1px solid var(--color-gray-200)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-gray-500)', fontWeight: 600, textTransform: 'uppercase' }}>Active Services</span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-success)', marginTop: '4px' }}>{services.length}</div>
          </div>
        </div>

        {/* Tabs Bar */}
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
            { id: 'leads', label: `Inbound Client Leads (${enquiries.length})` },
            { id: 'projects', label: `My Projects (${projects.length})` },
            { id: 'services', label: `Services & Pricing Rates (${services.length})` },
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

        {/* TAB 1: INBOUND LEADS */}
        {activeTab === 'leads' && (
          <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-gray-200)', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--color-gray-200)' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-navy)' }}>
                Customer Quote Requests
              </h3>
            </div>

            {enquiries.length === 0 ? (
              <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                <Inbox size={44} style={{ color: 'var(--color-gray-300)', margin: '0 auto 1rem' }} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>No Inquiries Yet</h4>
                <p style={{ color: 'var(--color-gray-500)', fontSize: '0.88rem' }}>When property owners request consultation quotes, they will appear here in real-time.</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--color-gray-50)', borderBottom: '1px solid var(--color-gray-200)', fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--color-gray-500)' }}>
                      <th style={{ padding: '14px 20px' }}>Client Info</th>
                      <th style={{ padding: '14px 20px' }}>Project Details</th>
                      <th style={{ padding: '14px 20px' }}>Budget & Specs</th>
                      <th style={{ padding: '14px 20px' }}>Current Status</th>
                      <th style={{ padding: '14px 20px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((enq) => (
                      <tr key={enq.id} style={{ borderBottom: '1px solid var(--color-gray-100)' }}>
                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ fontWeight: 700, color: 'var(--color-gray-900)' }}>{enq.customerName}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--color-gray-500)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                            <Phone size={12} /> {enq.customerPhone}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--color-gray-500)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Mail size={12} /> {enq.customerEmail}
                          </div>
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ fontWeight: 600 }}>{enq.projectCategory}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--color-gray-500)' }}>{enq.projectLocation}</div>
                          <div style={{ fontSize: '0.82rem', color: 'var(--color-gray-600)', marginTop: '4px', maxWidth: '280px' }}>
                            "{enq.projectDescription}"
                          </div>
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ fontWeight: 600, color: 'var(--color-navy)' }}>{enq.approximateBudget}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--color-gray-500)' }}>Area: {enq.approximateArea}</div>
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <Badge variant={enq.status === 'accepted' ? 'success' : enq.status === 'quoted' ? 'primary' : 'warning'}>
                            {enq.status}
                          </Badge>
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button
                              onClick={() => handleStatusChange(enq.id, 'quoted')}
                              className="btn btn-secondary btn-sm"
                              style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                            >
                              Quote Sent
                            </button>
                            <button
                              onClick={() => handleStatusChange(enq.id, 'accepted')}
                              className="btn btn-primary btn-sm"
                              style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                            >
                              Accept Lead
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

        {/* TAB 2: MY PROJECTS */}
        {activeTab === 'projects' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-navy)' }}>
                Published Portfolio Works
              </h3>
              <button
                type="button"
                onClick={() => setShowAddProject(true)}
                className="btn btn-primary btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Plus size={16} /> Add New Project
              </button>
            </div>

            {projects.length === 0 ? (
              <div style={{ background: 'var(--color-white)', padding: '4rem 2rem', textAlign: 'center', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-gray-200)' }}>
                <Layers size={44} style={{ color: 'var(--color-gray-300)', margin: '0 auto 1rem' }} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>No Projects Uploaded</h4>
                <p style={{ color: 'var(--color-gray-500)', fontSize: '0.88rem', margin: '6px auto 1.5rem' }}>
                  Showcase your finished buildings to attract quality property owners.
                </p>
                <button onClick={() => setShowAddProject(true)} className="btn btn-primary btn-sm">
                  Add Your First Project
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {projects.map((proj) => (
                  <div key={proj.id} style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-gray-200)', overflow: 'hidden' }}>
                    <img src={proj.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=80'} alt={proj.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                    <div style={{ padding: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-gray-900)' }}>{proj.title}</h4>
                        <Badge variant="navy">{proj.category}</Badge>
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--color-gray-500)', marginBottom: '8px' }}>
                        {proj.location?.name || proj.location || 'Ballari'} • {proj.cost || '₹40L'}
                      </p>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="btn btn-ghost btn-sm"
                        style={{ color: 'var(--color-error)', padding: '4px 8px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SERVICES & RATES */}
        {activeTab === 'services' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-navy)' }}>
                Published Services & Pricing Structure
              </h3>
              <button
                type="button"
                onClick={() => setShowAddService(true)}
                className="btn btn-primary btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Plus size={16} /> Add Service Rate
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {services.map((svc) => (
                <div key={svc.id} style={{ background: 'var(--color-white)', padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{svc.name}</h4>
                    <p style={{ fontSize: '0.84rem', color: 'var(--color-gray-500)', marginTop: '2px' }}>{svc.description}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-navy)' }}>
                      {pricingService.formatPrice(svc)}
                    </div>
                    <button
                      onClick={() => handleDeleteService(svc.id)}
                      className="btn btn-ghost btn-sm"
                      style={{ color: 'var(--color-error)' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal: Add Project */}
      {showAddProject && (
        <div className="modal-backdrop active" onClick={() => setShowAddProject(false)} style={{
          position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '16px'
        }}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 'var(--radius-xl)', width: '100%', maxWidth: '540px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>Publish New Project</h3>
            <form onSubmit={handleCreateProject}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>Project Title *</label>
                <input type="text" required className="form-control" value={newProject.title} onChange={e => setNewProject(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Modern Minimalist Villa" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>Category</label>
                  <select className="form-control" value={newProject.category} onChange={e => setNewProject(p => ({ ...p, category: e.target.value }))}>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Renovation">Renovation</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>Total Cost</label>
                  <input type="text" className="form-control" value={newProject.cost} onChange={e => setNewProject(p => ({ ...p, cost: e.target.value }))} placeholder="e.g. ₹48 Lakhs" />
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>Project Description</label>
                <textarea rows={3} className="form-control" value={newProject.description} onChange={e => setNewProject(p => ({ ...p, description: e.target.value }))} placeholder="Key structural challenges solved..." />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddProject(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Publish Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Service */}
      {showAddService && (
        <div className="modal-backdrop active" onClick={() => setShowAddService(false)} style={{
          position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '16px'
        }}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 'var(--radius-xl)', width: '100%', maxWidth: '500px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>Add Service & Rate</h3>
            <form onSubmit={handleCreateService}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>Service Name *</label>
                <input type="text" required className="form-control" value={newService.name} onChange={e => setNewService(s => ({ ...s, name: e.target.value }))} placeholder="e.g. Complete Structural Blueprint" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>Pricing Method</label>
                  <select className="form-control" value={newService.pricingMethod} onChange={e => setNewService(s => ({ ...s, pricingMethod: e.target.value }))}>
                    <option value="per_sqft">Per Sq.Ft</option>
                    <option value="fixed">Fixed Price</option>
                    <option value="percentage">Percentage (%)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>Rate (₹)</label>
                  <input type="number" required className="form-control" value={newService.rate} onChange={e => setNewService(s => ({ ...s, rate: parseFloat(e.target.value) }))} />
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>Scope & Deliverables</label>
                <textarea rows={2} className="form-control" value={newService.description} onChange={e => setNewService(s => ({ ...s, description: e.target.value }))} placeholder="Includes soil analysis, CAD drawings..." />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddService(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Rate</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
