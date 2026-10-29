import { useState, useEffect } from 'react';
import { Filter, RotateCcw, Check, ChevronDown } from 'lucide-react';
import { locationService } from '../../services/locationService';

export default function FilterSidebar({ filters, onFilterChange, onReset }) {
  const [districts, setDistricts] = useState([]);
  const [towns, setTowns] = useState([]);

  useEffect(() => {
    async function loadDistricts() {
      const res = await locationService.getDistricts('KA');
      if (res.success) setDistricts(res.data);
    }
    loadDistricts();
  }, []);

  useEffect(() => {
    async function loadTowns() {
      if (filters.district) {
        const res = await locationService.getTowns(filters.district);
        if (res.success) setTowns(res.data);
      } else {
        setTowns([]);
      }
    }
    loadTowns();
  }, [filters.district]);

  const specialties = [
    'Structural Engineering',
    'Architectural Design',
    'Interior Design',
    'Civil Contracting',
    'Geotechnical Engineering',
    'MEP Consulting',
    'Renovation & Retrofit',
    'Valuation & Estimation',
    'Green Building & LEED'
  ];

  const handleDistrictChange = (e) => {
    const val = e.target.value;
    onFilterChange({ ...filters, district: val, town: '' });
  };

  const handleTownChange = (e) => {
    onFilterChange({ ...filters, town: e.target.value });
  };

  const handleSpecialtyToggle = (spec) => {
    const current = filters.specialty || '';
    onFilterChange({ ...filters, specialty: current === spec ? '' : spec });
  };

  return (
    <aside className="filter-sidebar" style={{
      background: 'var(--color-white)',
      border: '1px solid var(--color-gray-200)',
      borderRadius: 'var(--radius-xl)',
      padding: '1.5rem',
      position: 'sticky',
      top: 'calc(var(--header-height) + 20px)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-gray-200)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: 'var(--color-navy)' }}>
          <Filter size={18} /> Filters
        </div>
        <button
          onClick={onReset}
          className="btn btn-ghost btn-sm"
          style={{ fontSize: '0.78rem', color: 'var(--color-gray-500)', display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <RotateCcw size={13} /> Reset
        </button>
      </div>

      {/* State & Location Hierarchical Filter */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-gray-800)', marginBottom: '8px' }}>
          District (Karnataka)
        </label>
        <select
          value={filters.district || ''}
          onChange={handleDistrictChange}
          className="form-control"
          style={{ width: '100%', fontSize: '0.88rem' }}
        >
          <option value="">All Karnataka Districts</option>
          {districts.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>

        {filters.district && towns.length > 0 && (
          <div style={{ marginTop: '10px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-gray-600)', marginBottom: '6px' }}>
              Town / Sub-region
            </label>
            <select
              value={filters.town || ''}
              onChange={handleTownChange}
              className="form-control"
              style={{ width: '100%', fontSize: '0.85rem' }}
            >
              <option value="">All Towns in District</option>
              {towns.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Experience Range */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-gray-800)', marginBottom: '8px' }}>
          Minimum Experience
        </label>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['Any', '3+', '5+', '10+'].map((exp) => {
            const expVal = exp === 'Any' ? 0 : parseInt(exp);
            const active = (filters.minExperience || 0) === expVal;
            return (
              <button
                key={exp}
                type="button"
                onClick={() => onFilterChange({ ...filters, minExperience: expVal })}
                className={`btn btn-sm ${active ? 'btn-primary' : 'btn-secondary'}`}
                style={{ flex: 1, padding: '6px 4px', fontSize: '0.78rem' }}
              >
                {exp === 'Any' ? 'Any' : `${exp} yrs`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Minimum Rating */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-gray-800)', marginBottom: '8px' }}>
          Minimum Rating
        </label>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['Any', '4.0+', '4.5+', '4.8+'].map((r) => {
            const rVal = r === 'Any' ? 0 : parseFloat(r);
            const active = (filters.minRating || 0) === rVal;
            return (
              <button
                key={r}
                type="button"
                onClick={() => onFilterChange({ ...filters, minRating: rVal })}
                className={`btn btn-sm ${active ? 'btn-primary' : 'btn-secondary'}`}
                style={{ flex: 1, padding: '6px 4px', fontSize: '0.78rem' }}
              >
                {r === 'Any' ? 'All' : `★ ${r.replace('+', '')}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Verified Only Checkbox */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 500 }}>
          <input
            type="checkbox"
            checked={!!filters.verifiedOnly}
            onChange={(e) => onFilterChange({ ...filters, verifiedOnly: e.target.checked })}
            style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
          />
          <span>Verified Licenses Only</span>
        </label>
      </div>

      {/* Specialties */}
      <div>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-gray-800)', marginBottom: '10px' }}>
          Specialization
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {specialties.map(spec => {
            const isSelected = filters.specialty === spec;
            return (
              <button
                key={spec}
                type="button"
                onClick={() => handleSpecialtyToggle(spec)}
                style={{
                  textAlign: 'left',
                  background: isSelected ? 'var(--color-primary-bg)' : 'transparent',
                  color: isSelected ? 'var(--color-primary)' : 'var(--color-gray-700)',
                  border: `1px solid ${isSelected ? 'var(--color-primary)' : 'transparent'}`,
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.82rem',
                  fontWeight: isSelected ? 600 : 400,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'background var(--transition-fast)'
                }}
              >
                <span>{spec}</span>
                {isSelected && <Check size={14} />}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
