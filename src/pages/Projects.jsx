import { useState, useEffect } from 'react';
import { Search, Filter, Layers, CheckCircle2 } from 'lucide-react';
import { projectService } from '../services/projectService';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectModal from '../components/common/ProjectModal';
import Pagination from '../components/common/Pagination';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modal
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      const res = await projectService.getProjects();
      if (res.success) {
        setProjects(res.data);
      }
      setLoading(false);
    }
    loadProjects();
  }, []);

  const categories = ['All', 'Residential', 'Commercial', 'Renovation', 'Industrial'];

  const filteredProjects = projects.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = !searchQuery ||
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.engineerName?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="projects-page" style={{ background: 'var(--color-gray-50)', padding: '3.5rem 0 5rem', minHeight: '80vh' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Verified Real-World Portfolio
          </span>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--color-navy)', margin: '8px 0 16px' }}>
            Completed Construction Projects
          </h1>
          <p style={{ color: 'var(--color-gray-600)', fontSize: '1rem', lineHeight: 1.5 }}>
            Inspect architectural elevations, structural framing, and turnkey finishes executed by verified engineers on BuildConnect.
          </p>
        </div>

        {/* Filter bar */}
        <div style={{
          background: 'var(--color-white)',
          padding: '16px 20px',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-gray-200)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '2.5rem'
        }}>
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-ghost'}`}
                style={{ padding: '6px 14px', borderRadius: 'var(--radius-full)' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--color-gray-50)', padding: '6px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)', minWidth: '240px' }}>
            <Search size={16} color="var(--color-gray-400)" />
            <input
              type="text"
              placeholder="Search by title, town..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.85rem', width: '100%' }}
            />
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-gray-500)' }}>
            <p>Loading project gallery...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div style={{ background: 'var(--color-white)', padding: '4rem 2rem', textAlign: 'center', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-gray-200)' }}>
            <Layers size={48} style={{ color: 'var(--color-gray-400)', margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>No projects found</h3>
            <p style={{ color: 'var(--color-gray-500)', marginTop: '4px' }}>Try switching category or clearing the search query.</p>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.75rem' }}>
              {paginatedProjects.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  onClick={(proj) => {
                    setSelectedProject(proj);
                    setModalOpen(true);
                  }}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedProject(null);
        }}
      />
    </div>
  );
}
