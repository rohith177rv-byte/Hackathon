import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, ShieldCheck, Award, Users, Calculator,
  ArrowRight, CheckCircle2, Star, Sparkles, Building2,
  HardHat, Compass, Ruler, Home as HomeIcon, Hammer, FileText
} from 'lucide-react';
import { engineerService } from '../services/engineerService';
import { projectService } from '../services/projectService';
import { locationService } from '../services/locationService';
import EngineerCard from '../components/engineers/EngineerCard';
import ProjectCard from '../components/projects/ProjectCard';
import EnquiryModal from '../components/common/EnquiryModal';
import ProjectModal from '../components/common/ProjectModal';
import RatingStars from '../components/common/RatingStars';

export default function Home() {
  const navigate = useNavigate();
  const [featuredEngineers, setFeaturedEngineers] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [districts, setDistricts] = useState([]);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSpecialty, setSearchSpecialty] = useState('');
  const [searchDistrict, setSearchDistrict] = useState('');

  // Modals
  const [selectedEngineer, setSelectedEngineer] = useState(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const engRes = await engineerService.getEngineers({ limit: 4 });
      if (engRes.success) setFeaturedEngineers(engRes.data.slice(0, 4));

      const projRes = await projectService.getProjects({ limit: 3 });
      if (projRes.success) setFeaturedProjects(projRes.data.slice(0, 3));

      const locRes = await locationService.getDistricts('KA');
      if (locRes.success) setDistricts(locRes.data);
    }
    loadData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    if (searchSpecialty) params.append('specialty', searchSpecialty);
    if (searchDistrict) params.append('district', searchDistrict);
    navigate(`/engineers?${params.toString()}`);
  };

  const serviceCategories = [
    { title: 'Structural Engineering', icon: <HardHat size={28} />, desc: 'Seismic stability, RCC designs, load calculations & certifications', link: '/engineers?specialty=Structural+Engineering', count: '42 Experts' },
    { title: 'Architectural Planning', icon: <Compass size={28} />, desc: 'Modern 3D elevations, Vaastu compliance & municipal sanction blueprints', link: '/engineers?specialty=Architectural+Design', count: '38 Experts' },
    { title: 'Interior Architecture', icon: <HomeIcon size={28} />, desc: 'Turnkey residential interiors, spatial styling & modular setups', link: '/engineers?specialty=Interior+Design', count: '29 Experts' },
    { title: 'Civil Contracting', icon: <Hammer size={28} />, desc: 'Turnkey building execution, material procurement & site supervision', link: '/engineers?specialty=Civil+Contracting', count: '55 Experts' },
    { title: 'MEP & HVAC Design', icon: <Ruler size={28} />, desc: 'Electrical grids, plumbing layouts & high-performance HVAC systems', link: '/engineers?specialty=MEP+Consulting', count: '19 Experts' },
    { title: 'Valuation & Audit', icon: <FileText size={28} />, desc: 'Bank property valuations, structural safety audits & stability reports', link: '/engineers?specialty=Valuation+%26+Estimation', count: '24 Experts' },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #0f1b2d 0%, #1e293b 100%)',
        color: 'var(--color-white)',
        padding: '5rem 0 6rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle decorative grid background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.6,
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(37, 99, 235, 0.2)',
              border: '1px solid rgba(147, 197, 253, 0.3)',
              borderRadius: 'var(--radius-full)',
              padding: '6px 16px',
              fontSize: '0.85rem',
              color: '#93c5fd',
              marginBottom: '1.5rem'
            }}>
              <Sparkles size={16} /> Certified Civil Engineers & Architects Marketplace
            </div>

            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              marginBottom: '1.25rem'
            }}>
              Build Your Vision With <span style={{ color: '#60a5fa' }}>Verified</span> Construction Experts
            </h1>

            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--color-gray-300)',
              lineHeight: 1.6,
              marginBottom: '2.5rem'
            }}>
              Discover top structural engineers, certified architects, and civil contractors across Karnataka. Compare transparent rates, inspect real portfolios, and request guaranteed quotes.
            </p>

            {/* Comprehensive Search Bar */}
            <form onSubmit={handleSearch} style={{
              background: 'var(--color-white)',
              padding: '10px',
              borderRadius: 'var(--radius-xl)',
              boxShadow: '0 20px 40px -15px rgba(0,0,0,0.4)',
              display: 'grid',
              gridTemplateColumns: '1.4fr 1.2fr 1fr auto',
              gap: '10px',
              alignItems: 'center',
              textAlign: 'left'
            }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-gray-500)', textTransform: 'uppercase', paddingLeft: '8px', marginBottom: '2px' }}>
                  Specialization
                </label>
                <select
                  value={searchSpecialty}
                  onChange={(e) => setSearchSpecialty(e.target.value)}
                  style={{ width: '100%', border: 'none', background: 'transparent', padding: '6px 8px', fontSize: '0.9rem', color: 'var(--color-gray-800)', fontWeight: 500, outline: 'none' }}
                >
                  <option value="">Any Specialization</option>
                  <option value="Structural Engineering">Structural Engineering</option>
                  <option value="Architectural Design">Architectural Design</option>
                  <option value="Interior Design">Interior Design</option>
                  <option value="Civil Contracting">Civil Contracting</option>
                  <option value="MEP Consulting">MEP Consulting</option>
                </select>
              </div>

              <div style={{ borderLeft: '1px solid var(--color-gray-200)', paddingLeft: '10px' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-gray-500)', textTransform: 'uppercase', paddingLeft: '8px', marginBottom: '2px' }}>
                  District
                </label>
                <select
                  value={searchDistrict}
                  onChange={(e) => setSearchDistrict(e.target.value)}
                  style={{ width: '100%', border: 'none', background: 'transparent', padding: '6px 8px', fontSize: '0.9rem', color: 'var(--color-gray-800)', fontWeight: 500, outline: 'none' }}
                >
                  <option value="">All Karnataka</option>
                  {districts.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ borderLeft: '1px solid var(--color-gray-200)', paddingLeft: '10px' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-gray-500)', textTransform: 'uppercase', paddingLeft: '8px', marginBottom: '2px' }}>
                  Keywords
                </label>
                <input
                  type="text"
                  placeholder="e.g. Villa, Duplex, RCC"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', border: 'none', background: 'transparent', padding: '6px 8px', fontSize: '0.9rem', color: 'var(--color-gray-800)', outline: 'none' }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, height: '100%' }}
              >
                <Search size={18} /> Search
              </button>
            </form>

            {/* Quick popular tags */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '1.25rem', fontSize: '0.82rem', color: 'var(--color-gray-400)', flexWrap: 'wrap' }}>
              <span>Popular searches:</span>
              {['Ballari City', 'Bengaluru Structural Audit', 'Architectural Blueprint', 'Villas under ₹50L'].map((tag, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => navigate(`/engineers?q=${encodeURIComponent(tag)}`)}
                  style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', color: '#cbd5e1', padding: '3px 10px', borderRadius: 'var(--radius-full)', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Row */}
      <section style={{ background: 'var(--color-white)', borderBottom: '1px solid var(--color-gray-200)', padding: '2rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-primary)' }}>150+</div>
              <div style={{ fontSize: '0.88rem', color: 'var(--color-gray-600)', marginTop: '4px' }}>Verified Licensed Engineers</div>
            </div>
            <div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-navy)' }}>₹140 Cr+</div>
              <div style={{ fontSize: '0.88rem', color: 'var(--color-gray-600)', marginTop: '4px' }}>Cumulative Project Value</div>
            </div>
            <div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-success)' }}>98.6%</div>
              <div style={{ fontSize: '0.88rem', color: 'var(--color-gray-600)', marginTop: '4px' }}>Customer Satisfaction Rate</div>
            </div>
            <div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-accent)' }}>31</div>
              <div style={{ fontSize: '0.88rem', color: 'var(--color-gray-600)', marginTop: '4px' }}>Districts Across Karnataka</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ padding: '5rem 0', background: 'var(--color-gray-50)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                End-to-End Capabilities
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-navy)', marginTop: '4px' }}>
                Comprehensive Construction Services
              </h2>
            </div>
            <Link to="/services" className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              All Services <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {serviceCategories.map((s, idx) => (
              <Link
                key={idx}
                to={s.link}
                style={{
                  background: 'var(--color-white)',
                  border: '1px solid var(--color-gray-200)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '2rem',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base)'
                }}
                className="service-card-hover"
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--color-primary-bg)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}>
                  {s.icon}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-gray-900)' }}>{s.title}</h3>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)', background: '#eff6ff', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
                    {s.count}
                  </span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-gray-600)', lineHeight: 1.5, flex: 1, marginBottom: '1.25rem' }}>
                  {s.desc}
                </p>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Explore Engineers <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Engineers */}
      <section style={{ padding: '5rem 0', background: 'var(--color-white)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Hand-Picked Experts
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-navy)', marginTop: '4px' }}>
                Featured Civil Engineers & Architects
              </h2>
            </div>
            <Link to="/engineers" className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              View All 150+ Engineers <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {featuredEngineers.map((engineer) => (
              <EngineerCard
                key={engineer.id}
                engineer={engineer}
                onEnquire={(eng) => {
                  setSelectedEngineer(eng);
                  setEnquiryModalOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Cost Estimator Interactive Banner */}
      <section style={{ padding: '4rem 0', background: 'var(--color-navy)', color: 'var(--color-white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Instant Project Budgeting
              </span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, lineHeight: 1.25, margin: '8px 0 16px' }}>
                Calculate Construction Costs in Under 30 Seconds
              </h2>
              <p style={{ color: 'var(--color-gray-300)', lineHeight: 1.6, marginBottom: '2rem', fontSize: '0.95rem' }}>
                Get transparent square-foot cost estimates tailored to your plot size, finishing grade (Standard, Premium, Luxury), and local Karnataka district rates before committing.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link to="/calculator" className="btn btn-primary" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calculator size={18} /> Launch Cost Estimator
                </Link>
                <Link to="/compare" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff', padding: '12px 20px' }}>
                  Compare Engineer Rates
                </Link>
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: 'var(--radius-xl)', padding: '2rem' }}>
              <div style={{ fontSize: '0.85rem', color: '#93c5fd', fontWeight: 600, textTransform: 'uppercase' }}>Sample Villa Estimate (2,400 sq.ft)</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', margin: '8px 0' }}>₹43.2 - ₹48.0 Lakhs</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-gray-400)', marginBottom: '1.25rem' }}>RCC Structure + Premium Vitrified Finish + MEP</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-gray-400)' }}>Civil & Structural Frame</span>
                  <span style={{ fontWeight: 600 }}>52% (₹23.5 L)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-gray-400)' }}>Finishing & Joinery</span>
                  <span style={{ fontWeight: 600 }}>28% (₹12.6 L)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-gray-400)' }}>MEP, Sanitary & Fixtures</span>
                  <span style={{ fontWeight: 600 }}>20% (₹9.0 L)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects Showcase */}
      <section style={{ padding: '5rem 0', background: 'var(--color-gray-50)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Real Construction Work
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-navy)', marginTop: '4px' }}>
                Recently Executed Projects
              </h2>
            </div>
            <Link to="/projects" className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              Full Project Gallery <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={(p) => {
                  setSelectedProject(p);
                  setProjectModalOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '5rem 0', background: 'var(--color-white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Simple 4-Step Process
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-navy)', marginTop: '4px' }}>
              How BuildConnect Works
            </h2>
            <p style={{ color: 'var(--color-gray-600)', marginTop: '8px' }}>
              We eliminate contractor guesswork with verified engineering credentials, standardized quotes, and milestone transparency.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {[
              { num: '01', title: 'Search & Filter', desc: 'Browse certified civil engineers by district, specialization, rating, and verified credentials.' },
              { num: '02', title: 'Compare Profiles', desc: 'Inspect side-by-side rates, past project photo galleries, and authentic client reviews.' },
              { num: '03', title: 'Request Detailed Quotes', desc: 'Share site specifications, plot dimensions, and get customized milestone proposals.' },
              { num: '04', title: 'Construct with Confidence', desc: 'Hire top talent with transparent agreements, milestone supervision, and verified quality standards.' },
            ].map((step, i) => (
              <div key={i} style={{ padding: '2rem', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-xl)', position: 'relative' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-primary)', opacity: 0.25, display: 'block', marginBottom: '0.5rem' }}>
                  {step.num}
                </span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '8px' }}>{step.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-gray-600)', lineHeight: 1.5 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Onboarding CTA */}
      <section style={{ padding: '4rem 0', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: '#fff' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            Are You an Engineer or Architectural Consultant?
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#bfdbfe', lineHeight: 1.6, marginBottom: '2rem' }}>
            Join Karnataka's fastest-growing construction network. Showcase your finished structures, receive direct customer quote requests, and scale your consulting practice.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/register/engineer" className="btn" style={{ background: '#fff', color: 'var(--color-primary)', fontWeight: 700, padding: '12px 28px', borderRadius: 'var(--radius-md)' }}>
              Register as Engineer
            </Link>
            <Link to="/engineers" className="btn btn-outline" style={{ borderColor: '#fff', color: '#fff', padding: '12px 24px' }}>
              Explore Engineers
            </Link>
          </div>
        </div>
      </section>

      {/* Enquiry Modal */}
      <EnquiryModal
        engineer={selectedEngineer}
        isOpen={enquiryModalOpen}
        onClose={() => {
          setEnquiryModalOpen(false);
          setSelectedEngineer(null);
        }}
      />

      {/* Project Modal */}
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
