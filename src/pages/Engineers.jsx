import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpDown, X, UserCheck } from 'lucide-react';
import { engineerService } from '../services/engineerService';
import EngineerCard from '../components/engineers/EngineerCard';
import FilterSidebar from '../components/engineers/FilterSidebar';
import Pagination from '../components/common/Pagination';
import EnquiryModal from '../components/common/EnquiryModal';

export default function Engineers() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    district: searchParams.get('district') || '',
    town: searchParams.get('town') || '',
    specialty: searchParams.get('specialty') || '',
    minExperience: searchParams.get('minExperience') ? parseInt(searchParams.get('minExperience')) : 0,
    minRating: searchParams.get('minRating') ? parseFloat(searchParams.get('minRating')) : 0,
    verifiedOnly: searchParams.get('verifiedOnly') === 'true',
    q: searchParams.get('q') || ''
  });

  const [sortBy, setSortBy] = useState('rating_desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [engineers, setEngineers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [selectedEngineer, setSelectedEngineer] = useState(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  useEffect(() => {
    async function fetchEngineers() {
      setLoading(true);
      const res = await engineerService.getEngineers(filters);
      if (res.success) {
        let list = [...res.data];

        // Apply sorting
        if (sortBy === 'rating_desc') {
          list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        } else if (sortBy === 'exp_desc') {
          list.sort((a, b) => (b.experience || 0) - (a.experience || 0));
        } else if (sortBy === 'price_asc') {
          list.sort((a, b) => (a.startingPrice || 0) - (b.startingPrice || 0));
        } else if (sortBy === 'name_asc') {
          list.sort((a, b) => a.name.localeCompare(b.name));
        }

        setEngineers(list);
      }
      setLoading(false);
    }

    fetchEngineers();
    setCurrentPage(1);
  }, [filters, sortBy]);

  const handleResetFilters = () => {
    const blank = {
      district: '',
      town: '',
      specialty: '',
      minExperience: 0,
      minRating: 0,
      verifiedOnly: false,
      q: ''
    };
    setFilters(blank);
    setSearchParams({});
  };

  const removeFilterTag = (key) => {
    setFilters(prev => ({ ...prev, [key]: key === 'minExperience' || key === 'minRating' ? 0 : key === 'verifiedOnly' ? false : '' }));
  };

  // Pagination slice
  const totalPages = Math.ceil(engineers.length / itemsPerPage);
  const paginatedEngineers = engineers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="engineers-directory" style={{ padding: '2.5rem 0 5rem', background: 'var(--color-gray-50)', minHeight: '80vh' }}>
      <div className="container">
        {/* Header banner */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-navy)', marginBottom: '8px' }}>
            Find Certified Civil Engineers & Architects
          </h1>
          <p style={{ color: 'var(--color-gray-600)', fontSize: '1rem' }}>
            Browse through licensed professionals, verify credentials, compare quotes, and hire the right expert for your construction.
          </p>
        </div>

        {/* Top search & sorting bar */}
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
          marginBottom: '2rem'
        }}>
          {/* Quick search input */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '280px' }}>
            <Search size={20} color="var(--color-gray-400)" />
            <input
              type="text"
              placeholder="Search by engineer name, firm, or keyword..."
              value={filters.q}
              onChange={(e) => setFilters(prev => ({ ...prev, q: e.target.value }))}
              style={{
                width: '100%',
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '0.92rem',
                color: 'var(--color-gray-800)'
              }}
            />
            {filters.q && (
              <button
                onClick={() => setFilters(prev => ({ ...prev, q: '' }))}
                style={{ background: 'none', border: 'none', color: 'var(--color-gray-400)', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Sort dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-gray-500)', whiteSpace: 'nowrap' }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-control"
              style={{ width: 'auto', padding: '6px 12px', fontSize: '0.85rem' }}
            >
              <option value="rating_desc">Highest Rated</option>
              <option value="exp_desc">Most Experienced</option>
              <option value="price_asc">Starting Price: Low to High</option>
              <option value="name_asc">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Main Content: Sidebar + Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem', alignItems: 'flex-start' }}>
          {/* Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            onReset={handleResetFilters}
          />

          {/* Results Area */}
          <div>
            {/* Active filter badges */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-gray-700)' }}>
                Showing <span style={{ color: 'var(--color-primary)' }}>{engineers.length}</span> verified engineers
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {filters.district && (
                  <span style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '0.78rem', fontWeight: 600, padding: '3px 10px', borderRadius: 'var(--radius-full)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    District: {filters.district}
                    <X size={12} style={{ cursor: 'pointer' }} onClick={() => removeFilterTag('district')} />
                  </span>
                )}
                {filters.specialty && (
                  <span style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '0.78rem', fontWeight: 600, padding: '3px 10px', borderRadius: 'var(--radius-full)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    {filters.specialty}
                    <X size={12} style={{ cursor: 'pointer' }} onClick={() => removeFilterTag('specialty')} />
                  </span>
                )}
                {filters.minExperience > 0 && (
                  <span style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '0.78rem', fontWeight: 600, padding: '3px 10px', borderRadius: 'var(--radius-full)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    {filters.minExperience}+ Yrs Exp
                    <X size={12} style={{ cursor: 'pointer' }} onClick={() => removeFilterTag('minExperience')} />
                  </span>
                )}
                {filters.verifiedOnly && (
                  <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '0.78rem', fontWeight: 600, padding: '3px 10px', borderRadius: 'var(--radius-full)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Verified Only
                    <X size={12} style={{ cursor: 'pointer' }} onClick={() => removeFilterTag('verifiedOnly')} />
                  </span>
                )}
              </div>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-gray-500)' }}>
                <p>Loading certified engineers...</p>
              </div>
            ) : engineers.length === 0 ? (
              <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', padding: '4rem 2rem', textAlign: 'center', border: '1px solid var(--color-gray-200)' }}>
                <UserCheck size={48} style={{ color: 'var(--color-gray-400)', margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-gray-800)' }}>No engineers match your selected filters</h3>
                <p style={{ color: 'var(--color-gray-500)', marginTop: '6px', fontSize: '0.9rem', maxWidth: '420px', margin: '6px auto 1.5rem' }}>
                  Try relaxing your location or specialty filters to see more verified consultants across Karnataka.
                </p>
                <button onClick={handleResetFilters} className="btn btn-primary btn-sm">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  {paginatedEngineers.map((engineer) => (
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

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <EnquiryModal
        engineer={selectedEngineer}
        isOpen={enquiryModalOpen}
        onClose={() => {
          setEnquiryModalOpen(false);
          setSelectedEngineer(null);
        }}
      />
    </div>
  );
}
