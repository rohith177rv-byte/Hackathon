import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin, Heart, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            {/* Brand column */}
            <div className="footer-col brand-col">
              <Link to="/" className="footer-logo">
                <Building2 size={32} className="footer-logo-icon" />
                <span>Build<strong>Connect</strong></span>
              </Link>
              <p className="footer-desc">
                The premier digital ecosystem connecting property owners, developers, and builders with certified civil engineers, structural consultants, and architects.
              </p>
              <div className="footer-badges">
                <span className="trust-badge">
                  <Shield size={14} /> 100% Verified Experts
                </span>
                <span className="trust-badge">
                  <CheckCircle size={14} /> Quality Assured
                </span>
              </div>
            </div>

            {/* Quick links */}
            <div className="footer-col">
              <h4 className="footer-heading">Platform</h4>
              <ul className="footer-links">
                <li><Link to="/engineers">Find Engineers</Link></li>
                <li><Link to="/services">Services Catalog</Link></li>
                <li><Link to="/projects">Project Gallery</Link></li>
                <li><Link to="/compare">Compare Engineers</Link></li>
                <li><Link to="/calculator">Cost Estimator</Link></li>
                <li><Link to="/how-it-works">How It Works</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div className="footer-col">
              <h4 className="footer-heading">Specializations</h4>
              <ul className="footer-links">
                <li><Link to="/engineers?specialty=Structural+Engineering">Structural Engineering</Link></li>
                <li><Link to="/engineers?specialty=Architectural+Design">Architectural Design</Link></li>
                <li><Link to="/engineers?specialty=Interior+Design">Interior Architecture</Link></li>
                <li><Link to="/engineers?specialty=Civil+Contracting">General Construction</Link></li>
                <li><Link to="/engineers?specialty=MEP+Consulting">MEP & HVAC Consulting</Link></li>
                <li><Link to="/engineers?specialty=Renovation">Renovation & Retrofit</Link></li>
              </ul>
            </div>

            {/* Contact & Demo Notice */}
            <div className="footer-col contact-col">
              <h4 className="footer-heading">Connect With Us</h4>
              <div className="contact-item">
                <MapPin size={18} />
                <span>MG Road Financial Tower, Suite 400, Tech City</span>
              </div>
              <div className="contact-item">
                <Phone size={18} />
                <span>+91 (800) 284-5332 / 1800-BUILD</span>
              </div>
              <div className="contact-item">
                <Mail size={18} />
                <span>support@buildconnect.platform</span>
              </div>
              <div className="quick-onboard-card">
                <span>Are you a registered engineer?</span>
                <Link to="/register/engineer" className="onboard-btn">
                  Join Directory <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} BuildConnect Marketplace Technologies. Built for Spring Boot & MySQL integration.</p>
          <div className="footer-legal">
            <Link to="/about">About Us</Link>
            <span>•</span>
            <Link to="/privacy">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
