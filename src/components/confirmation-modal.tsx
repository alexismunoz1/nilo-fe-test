import type { ConfirmationModalProps } from '@/types';

export const ConfirmationModal = ({ 
  isOpen, 
  title, 
  message, 
  cancelButtonLabel, 
  confirmButtonLabel, 
  onCancel, 
  onConfirm 
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {title}
        </h3>
        <p className="text-gray-600 mb-8 leading-relaxed">
          {message}
        </p>
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-full transition-colors"
          >
            {cancelButtonLabel}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-full transition-colors"
          >
            {confirmButtonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

