export default function ShimmerLoader() {
  return (
    <div className="min-h-screen w-full bg-gray-950 text-gray-300 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-6xl space-y-6">
        {/* Header placeholder */}
        <div className="h-8 w-48 bg-gray-800 rounded-md animate-pulse" />

        {/* Table skeleton */}
        <div className="w-full rounded-xl overflow-hidden border border-gray-800 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
          {/* Table header row */}
          <div className="grid grid-cols-5 gap-4 p-4 bg-gray-900">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-5 bg-gray-800 rounded-md animate-pulse"
              />
            ))}
          </div>

          {/* Table body rows */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-5 gap-4 p-4 border-t border-gray-800 bg-gray-900/80 hover:bg-gray-900 transition-colors"
            >
              {[...Array(5)].map((_, j) => (
                <div
                  key={j}
                  className="h-5 bg-gray-800 rounded-md animate-pulse"
                />
              ))}
            </div>
          ))}
        </div>

        {/* Footer placeholder */}
        <div className="flex justify-end mt-6">
          <div className="h-10 w-32 bg-gray-800 rounded-md animate-pulse" />
        </div>
      </div>
    </div>
  );
}
