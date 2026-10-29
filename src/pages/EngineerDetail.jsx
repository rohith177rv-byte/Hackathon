import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin, Briefcase, Award, CheckCircle2, ShieldCheck, Mail, Phone,
  Globe, Calendar, Scale, Send, Star, ExternalLink, ArrowLeft, Layers
} from 'lucide-react';
import { engineerService } from '../services/engineerService';
import { projectService } from '../services/projectService';
import { pricingService } from '../services/pricingService';
import { useCompare } from '../contexts/CompareContext';
import RatingStars from '../components/common/RatingStars';
import Badge from '../components/common/Badge';
import ProjectCard from '../components/projects/ProjectCard';
import EnquiryModal from '../components/common/EnquiryModal';
import ProjectModal from '../components/common/ProjectModal';

export default function EngineerDetail() {
  const { id } = useParams();
  const { isComparing, toggleCompare } = useCompare();

  const [engineer, setEngineer] = useState(null);
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Modals
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  useEffect(() => {
    async function loadEngineerData() {
      setLoading(true);
      const res = await engineerService.getEngineerById(id);
      if (res.success) {
        setEngineer(res.data);
        const projRes = await projectService.getEngineerProjects(id, true);
        if (projRes.success) setProjects(projRes.data);

        const svcRes = await pricingService.getEngineerServices(id);
        if (svcRes.success) setServices(svcRes.data);
      }
      setLoading(false);
    }
    loadEngineerData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem 0', minHeight: '60vh' }}>
        <p>Loading engineer profile & credentials...</p>
      </div>
    );
  }

  if (!engineer) {
    return (
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <h2>Engineer Profile Not Found</h2>
        <p style={{ color: 'var(--color-gray-600)', margin: '1rem 0 2rem' }}>
          The requested consultant profile may have been updated or removed.
        </p>
        <Link to="/engineers" className="btn btn-primary">
          Back to Directory
        </Link>
      </div>
    );
  }

  const comparing = isComparing(engineer.id);

  return (
    <div className="engineer-detail-page" style={{ background: 'var(--color-gray-50)', paddingBottom: '5rem' }}>
      {/* Top breadcrumb */}
      <div style={{ background: 'var(--color-white)', borderBottom: '1px solid var(--color-gray-200)', padding: '12px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--color-gray-500)' }}>
          <Link to="/" style={{ color: 'var(--color-gray-600)', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link to="/engineers" style={{ color: 'var(--color-gray-600)', textDecoration: 'none' }}>Engineers</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-gray-900)', fontWeight: 600 }}>{engineer.name}</span>
        </div>
      </div>

      {/* Profile Header Hero */}
      <div style={{ background: 'var(--color-navy)', color: 'var(--color-white)', padding: '3.5rem 0 3rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '2.5rem', alignItems: 'center' }}>
            {/* Avatar */}
            <div style={{ position: 'relative' }}>
              <img
                src={engineer.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80'}
                alt={engineer.name}
                style={{
                  width: '130px',
                  height: '130px',
                  borderRadius: 'var(--radius-xl)',
                  objectFit: 'cover',
                  border: '3px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                }}
              />
              {engineer.isVerified && (
                <div style={{
                  position: 'absolute',
                  bottom: '-8px',
                  right: '-8px',
                  background: 'var(--color-primary)',
                  color: '#fff',
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  border: '2px solid var(--color-navy)'
                }}>
                  <CheckCircle2 size={13} /> Verified
                </div>
              )}
            </div>

            {/* Profile info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-white)' }}>{engineer.name}</h1>
                <Badge variant="accent">Reg: {engineer.registrationNumber || 'KA-ENG-8492'}</Badge>
              </div>

              <p style={{ fontSize: '1.1rem', color: '#93c5fd', marginTop: '4px', fontWeight: 500 }}>
                {engineer.professionalTitle}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '12px', flexWrap: 'wrap', fontSize: '0.88rem', color: 'var(--color-gray-300)' }}>
                <RatingStars rating={engineer.rating || 4.8} count={engineer.reviewCount || 14} size={18} />
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Briefcase size={15} color="#93c5fd" /> {engineer.experience}+ Years Industry Experience
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', textTransform: 'capitalize' }}>
                  <MapPin size={15} color="#93c5fd" /> {(engineer.serviceAreas?.[0]?.district || engineer.serviceAreas?.[0]?.districtId || engineer.city || 'Ballari, Karnataka').replace(/-/g, ' ')}
                </span>
              </div>
            </div>

            {/* Quick action buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '180px' }}>
              <button
                type="button"
                onClick={() => setEnquiryModalOpen(true)}
                className="btn btn-primary"
                style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 700 }}
              >
                <Send size={16} /> Request Quote
              </button>
              <button
                type="button"
                onClick={() => toggleCompare(engineer)}
                className={`btn ${comparing ? 'btn-secondary' : 'btn-outline'}`}
                style={{
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: '#fff'
                }}
              >
                <Scale size={16} /> {comparing ? 'Comparing' : 'Compare Profile'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Profile Tabs & Content Layout */}
      <div className="container" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2.5rem', alignItems: 'flex-start' }}>
          {/* Main Content Area */}
          <div>
            {/* Tabs Header */}
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
                { id: 'overview', label: 'Overview & Bio' },
                { id: 'services', label: `Services & Rates (${services.length})` },
                { id: 'projects', label: `Portfolio Projects (${projects.length})` },
                { id: 'reviews', label: 'Client Reviews (14)' },
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

            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Introduction */}
                <div style={{ background: 'var(--color-white)', padding: '2rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-gray-200)' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '1rem' }}>
                    Professional Summary
                  </h3>
                  <p style={{ color: 'var(--color-gray-700)', lineHeight: '1.7', fontSize: '0.95rem' }}>
                    {engineer.introduction || `${engineer.name} is a premier structural and civil engineer with over ${engineer.experience} years of field practice in Karnataka. Specializing in high-performance residential RCC buildings, commercial complexes, and municipal sanction documentation.`}
                  </p>
                </div>

                {/* Specializations & Qualifications */}
                <div style={{ background: 'var(--color-white)', padding: '2rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-gray-200)' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '1.2rem' }}>
                    Areas of Technical Expertise
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '2rem' }}>
                    {(engineer.specializations || ['Structural RCC', 'Earthquake Design', 'Soil Mechanics', 'Sanction Approvals']).map((spec, i) => (
                      <span key={i} style={{ background: 'var(--color-primary-bg)', color: 'var(--color-primary)', padding: '6px 14px', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', fontWeight: 600 }}>
                        {spec}
                      </span>
                    ))}
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '1.2rem' }}>
                    Degrees & Certifications
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {(engineer.qualifications || ['B.E. Civil Engineering (VTU)', 'M.Tech Structural Engineering', 'Chartered Engineer (IEI India)']).map((q, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--color-gray-800)' }}>
                        <Award size={18} color="var(--color-primary)" />
                        <span>{q}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SERVICES & PRICING */}
            {activeTab === 'services' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {services.length === 0 ? (
                  <div style={{ background: 'var(--color-white)', padding: '3rem', borderRadius: 'var(--radius-xl)', textAlign: 'center', border: '1px solid var(--color-gray-200)' }}>
                    <p style={{ color: 'var(--color-gray-500)' }}>Standard services can be requested via the direct quote button.</p>
                  </div>
                ) : (
                  services.map((svc) => (
                    <div
                      key={svc.id}
                      style={{
                        background: 'var(--color-white)',
                        borderRadius: 'var(--radius-xl)',
                        border: '1px solid var(--color-gray-200)',
                        padding: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '1.2rem'
                      }}
                    >
                      <div style={{ flex: 1, minWidth: '240px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-gray-900)' }}>{svc.name}</h4>
                          <Badge variant="primary">{pricingService.getPricingMethodLabel(svc.pricingMethod)}</Badge>
                        </div>
                        <p style={{ fontSize: '0.88rem', color: 'var(--color-gray-600)', lineHeight: '1.5' }}>
                          {svc.description || 'Full architectural and engineering compliance documentation.'}
                        </p>
                      </div>

                      <div style={{ textAlign: 'right', minWidth: '150px' }}>
                        <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-navy)' }}>
                          {pricingService.formatPrice(svc)}
                        </div>
                        <button
                          type="button"
                          onClick={() => setEnquiryModalOpen(true)}
                          className="btn btn-secondary btn-sm"
                          style={{ marginTop: '8px' }}
                        >
                          Book Service
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 3: PORTFOLIO PROJECTS */}
            {activeTab === 'projects' && (
              <div>
                {projects.length === 0 ? (
                  <div style={{ background: 'var(--color-white)', padding: '3rem', borderRadius: 'var(--radius-xl)', textAlign: 'center', border: '1px solid var(--color-gray-200)' }}>
                    <p style={{ color: 'var(--color-gray-500)' }}>No public projects published yet.</p>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {projects.map((proj) => (
                      <ProjectCard
                        key={proj.id}
                        project={proj}
                        onClick={(p) => {
                          setSelectedProject(p);
                          setProjectModalOpen(true);
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: CLIENT REVIEWS */}
            {activeTab === 'reviews' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ background: 'var(--color-white)', padding: '2rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-gray-200)', display: 'grid', gridTemplateColumns: '220px 1fr', gap: '2rem', alignItems: 'center' }}>
                  <div style={{ textAlign: 'center', borderRight: '1px solid var(--color-gray-200)', paddingRight: '2rem' }}>
                    <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--color-navy)', lineHeight: 1 }}>
                      {Number(engineer.rating || 4.8).toFixed(1)}
                    </div>
                    <div style={{ margin: '8px 0' }}>
                      <RatingStars rating={engineer.rating || 4.8} size={20} showNumber={false} />
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-gray-500)' }}>
                      Based on 14 verified reviews
                    </div>
                  </div>

                  <div>
                    {[
                      { star: 5, pct: 85 },
                      { star: 4, pct: 15 },
                      { star: 3, pct: 0 },
                      { star: 2, pct: 0 },
                      { star: 1, pct: 0 },
                    ].map(bar => (
                      <div key={bar.star} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', fontSize: '0.82rem' }}>
                        <span style={{ width: '40px', color: 'var(--color-gray-600)' }}>{bar.star} star</span>
                        <div style={{ flex: 1, height: '8px', background: 'var(--color-gray-100)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${bar.pct}%`, height: '100%', background: '#f59e0b' }} />
                        </div>
                        <span style={{ width: '35px', textAlign: 'right', color: 'var(--color-gray-400)' }}>{bar.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Individual reviews */}
                {[
                  { name: 'Siddharth Rao', role: 'Homeowner, Ballari', rating: 5, date: '3 weeks ago', project: '3BHK Contemporary Villa', comment: 'Outstanding engineering precision. The structural calculations and reinforcement schedule passed our municipal scrutiny on first review without any delays. Highly recommended.' },
                  { name: 'Kavitha Hegde', role: 'Commercial Property Owner', rating: 5, date: '2 months ago', project: 'Retail Commercial Hub', comment: 'Very professional, transparent regarding material specifications, and conducted regular on-site stage inspections. Saved us nearly ₹3 Lakhs on foundation optimization.' },
                  { name: 'Anand Murthy', role: 'Duplex Owner', rating: 4.8, date: '4 months ago', project: 'Duplex Renovation', comment: 'Prompt communication, clean blueprints, and clear guidance during the column casting phase.' },
                ].map((rev, i) => (
                  <div key={i} style={{ background: 'var(--color-white)', padding: '1.75rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-gray-200)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-gray-900)' }}>{rev.name}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-gray-500)' }}>{rev.role} • {rev.project}</span>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-gray-400)' }}>{rev.date}</span>
                    </div>
                    <RatingStars rating={rev.rating} size={15} showNumber={false} />
                    <p style={{ marginTop: '10px', fontSize: '0.9rem', color: 'var(--color-gray-700)', lineHeight: '1.5' }}>
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sticky Consultation Sidebar */}
          <div style={{ position: 'sticky', top: 'calc(var(--header-height) + 20px)' }}>
            <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-gray-200)', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-gray-500)', textTransform: 'uppercase' }}>
                Consultation Starting From
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-navy)', margin: '4px 0 1rem' }}>
                ₹{engineer.startingPrice ? engineer.startingPrice.toLocaleString() : '5,000'}
                <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--color-gray-500)' }}> / engagement</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem', color: 'var(--color-gray-700)', marginBottom: '1.5rem', borderTop: '1px solid var(--color-gray-100)', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={18} color="var(--color-success)" />
                  <span>Licensed & Background Verified</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={18} color="var(--color-primary)" />
                  <span>Avg Response: <strong>Within 4 hours</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Layers size={18} color="var(--color-primary)" />
                  <span>Completed: <strong>{engineer.completedProjectsCount || 18}+ structures</strong></span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setEnquiryModalOpen(true)}
                className="btn btn-primary"
                style={{ width: '100%', padding: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '10px' }}
              >
                <Send size={16} /> Request Free Quote
              </button>

              <button
                type="button"
                onClick={() => toggleCompare(engineer)}
                className={`btn ${comparing ? 'btn-secondary' : 'btn-ghost'}`}
                style={{ width: '100%', padding: '10px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <Scale size={16} /> {comparing ? 'Remove from Comparison' : 'Add to Compare'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <EnquiryModal
        engineer={engineer}
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
      />

      <ProjectModal
        project={selectedProject}
        isOpen={projectModalOpen}
        onClose={() => {
          setProjectModalOpen(false);
          setSelectedProject(null);
        }}
      />
    </div>
  );
}
