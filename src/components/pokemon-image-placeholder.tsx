export const PokemonImagePlaceholder = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-red-100 to-blue-100 rounded-lg">
      <svg className="w-16 h-16 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="#e53e3e" stroke="#000" strokeWidth="2" />
        <circle cx="12" cy="12" r="6" fill="#ffffff" stroke="#000" strokeWidth="1" />
        <circle cx="12" cy="12" r="2" fill="#000000" />
        <path d="M2 12h20" stroke="#000" strokeWidth="2" fill="none" />
      </svg>
      <span className="text-xs text-gray-600 mt-1 font-medium">No image available</span>
    </div>
  );
};
