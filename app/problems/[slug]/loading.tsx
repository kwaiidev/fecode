export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-100 p-5">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="h-[640px] animate-pulse rounded-lg border border-slate-200 bg-white" />
        <div className="h-80 animate-pulse rounded-lg border border-slate-200 bg-white" />
      </div>
    </main>
  );
}
