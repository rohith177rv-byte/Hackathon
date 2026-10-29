import { useToast } from '../../contexts/ToastContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      maxWidth: '400px',
      width: 'calc(100% - 48px)'
    }}>
      {toasts.map((toast) => {
        let icon = <CheckCircle2 size={18} className="toast-icon success" style={{ color: 'var(--color-success)' }} />;
        let borderColor = 'var(--color-success)';

        if (toast.type === 'error') {
          icon = <AlertCircle size={18} className="toast-icon error" style={{ color: 'var(--color-error)' }} />;
          borderColor = 'var(--color-error)';
        } else if (toast.type === 'info') {
          icon = <Info size={18} className="toast-icon info" style={{ color: 'var(--color-info)' }} />;
          borderColor = 'var(--color-info)';
        }

        return (
          <div
            key={toast.id}
            className={`toast toast-${toast.type}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              padding: '14px 18px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--color-white)',
              color: 'var(--color-gray-900)',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
              borderLeft: `4px solid ${borderColor}`,
              fontSize: '0.9rem',
              fontWeight: 500,
              animation: 'slideUp 0.25s ease-out'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {icon}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-gray-400)',
                padding: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
              aria-label="Dismiss toast"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
