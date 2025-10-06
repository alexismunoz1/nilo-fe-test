'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-9xl font-bold text-red-500 mb-4">500</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ¡Algo salió mal!
        </h1>
        <p className="text-gray-600 mb-8">
          Ocurrió un error inesperado. Por favor intenta nuevamente.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Intentar de nuevo
          </button>
          <a
            href="/"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg transition-colors"
          >
            Ir al Inicio
          </a>
        </div>
      </div>
    </div>
  );
}

