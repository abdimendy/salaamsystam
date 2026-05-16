export default function SkeletonCard() {
  return (
    <div className="card animate-pulse p-5">
      <div className="flex gap-4">
        <div className="h-14 w-14 shrink-0 rounded-xl bg-slate-200" />
        <div className="flex-1 space-y-3">
          <div className="h-4 w-2/3 rounded-lg bg-slate-200" />
          <div className="h-3 w-1/2 rounded-lg bg-slate-100" />
          <div className="h-3 w-full rounded-lg bg-slate-100" />
          <div className="h-3 w-4/5 rounded-lg bg-slate-100" />
        </div>
      </div>
    </div>
  );
}
