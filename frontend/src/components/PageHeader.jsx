export default function PageHeader({ title, subtitle, action }) {
  return (
    <header className="animate-fade-up flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 lg:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1.5 text-base text-slate-500">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}
