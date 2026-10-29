import { Star, StarHalf } from 'lucide-react';

export default function RatingStars({ rating = 0, count, size = 16, showNumber = true }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.4;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', color: '#f59e0b' }}>
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={size} fill="#f59e0b" stroke="#f59e0b" />
        ))}
        {hasHalfStar && (
          <span style={{ position: 'relative', display: 'inline-flex' }}>
            <Star size={size} stroke="#f59e0b" />
            <span style={{ position: 'absolute', top: 0, left: 0, overflow: 'hidden', width: '50%' }}>
              <Star size={size} fill="#f59e0b" stroke="#f59e0b" />
            </span>
          </span>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={size} stroke="#cbd5e1" />
        ))}
      </div>
      {showNumber && (
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-gray-800)', marginLeft: '2px' }}>
          {Number(rating).toFixed(1)}
        </span>
      )}
      {count !== undefined && (
        <span style={{ fontSize: '0.78rem', color: 'var(--color-gray-500)' }}>
          ({count})
        </span>
      )}
    </div>
  );
}
