import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-9xl font-bold text-blue-500 mb-4">404</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Página No Encontrada
        </h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe. Es posible que haya sido movida o eliminada.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}

