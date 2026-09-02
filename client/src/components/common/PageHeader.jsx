export default function PageHeader({title, subtitle, action,}) {
  return (
    <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800 md:text-3xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-1 text-sm text-slate-500 md:text-base">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div className="flex items-center gap-3">
          {action}
        </div>
      )}
    </div>
  );
}