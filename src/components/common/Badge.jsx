export default function Badge({ children, variant = 'neutral', size = 'md', className = '' }) {
  const getStyle = () => {
    switch (variant) {
      case 'primary':
        return { background: 'var(--color-primary-bg)', color: 'var(--color-primary)', borderColor: 'rgba(37,99,235,0.2)' };
      case 'success':
        return { background: 'var(--color-success-bg)', color: 'var(--color-success)', borderColor: 'rgba(22,163,74,0.2)' };
      case 'warning':
        return { background: 'var(--color-warning-bg)', color: 'var(--color-warning)', borderColor: 'rgba(217,119,6,0.2)' };
      case 'error':
        return { background: 'var(--color-error-bg)', color: 'var(--color-error)', borderColor: 'rgba(220,38,38,0.2)' };
      case 'accent':
        return { background: 'rgba(194, 149, 106, 0.15)', color: '#8a5c30', borderColor: 'rgba(194, 149, 106, 0.3)' };
      case 'navy':
        return { background: 'var(--color-navy)', color: 'var(--color-white)', borderColor: 'transparent' };
      default:
        return { background: 'var(--color-gray-100)', color: 'var(--color-gray-700)', borderColor: 'var(--color-gray-200)' };
    }
  };

  const pad = size === 'sm' ? '2px 8px' : size === 'lg' ? '6px 14px' : '4px 10px';
  const fs = size === 'sm' ? '0.72rem' : size === 'lg' ? '0.88rem' : '0.78rem';

  return (
    <span
      className={`badge badge-${variant} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: pad,
        fontSize: fs,
        fontWeight: 600,
        borderRadius: 'var(--radius-full)',
        border: '1px solid',
        lineHeight: 1.2,
        ...getStyle()
      }}
    >
      {children}
    </span>
  );
}
