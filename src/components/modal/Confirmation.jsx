import React, { useEffect } from 'react';
import Button from '../buttons/Button';

const Confirmation = ({
  open,
  onConfirm,
  onCancel,
  loading = false,
  title = 'Confirm Action',
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  children,
}) => {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onCancel?.();
    };

    if (open) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={onCancel} // click outside closes modal
    >
      <div
        className="w-full max-w-md p-6 mx-4 bg-white rounded-2xl shadow-xl animate-fadeIn"
        onClick={(e) => e.stopPropagation()} // prevent close on inner click
        role="dialog"
        aria-modal="true"
      >
        <h3 className="text-xl md:text-2xl font-semibold text-center mb-3">
          {title}
        </h3>

        {description && (
          <p className="text-gray-600 text-center mb-4">
            {description}
          </p>
        )}

        {children && <div className="my-4 text-center  font-semibold text-lg">{children}</div>}

        <div className="flex gap-3">
          <Button
            className="flex-1"
            btnFunc={onCancel}
            type="cancel"
            btnText={cancelText}
          >cancel</Button>

          <Button
            className="flex-1"
            btnFunc={onConfirm}
            loading={loading}
            btnText={confirmText}
          >Confirm Order</Button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;