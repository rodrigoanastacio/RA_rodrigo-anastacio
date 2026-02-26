export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f9fafb] flex items-center justify-center">
      <div className="text-center max-w-sm px-6">
        <div className="w-16 h-16 bg-gray-100 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-xl font-extrabold text-gray-900 mb-2">
          Página não encontrada
        </h1>
        <p className="text-sm text-gray-500">
          Esta página não existe ou ainda não foi publicada.
        </p>
      </div>
    </main>
  )
}
