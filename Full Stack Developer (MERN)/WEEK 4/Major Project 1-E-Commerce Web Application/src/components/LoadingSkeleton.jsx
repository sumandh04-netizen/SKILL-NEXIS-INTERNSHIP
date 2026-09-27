export function LoadingSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="shimmer h-48 rounded-xl" />
          <div className="mt-4 space-y-2">
            <div className="shimmer h-3 w-1/3 rounded" />
            <div className="shimmer h-4 w-4/5 rounded" />
            <div className="shimmer h-4 w-1/2 rounded" />
            <div className="shimmer h-9 w-full rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}
