import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '2rem' }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn btn-secondary btn-sm"
        style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '4px' }}
      >
        <ChevronLeft size={16} /> Prev
      </button>

      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`btn btn-sm ${currentPage === page ? 'btn-primary' : 'btn-ghost'}`}
          style={{ minWidth: '38px', height: '38px', padding: 0 }}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn btn-secondary btn-sm"
        style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '4px' }}
      >
        Next <ChevronRight size={16} />
      </button>
    </div>
  );
}
