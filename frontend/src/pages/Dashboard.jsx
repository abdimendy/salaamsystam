import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Tags, TrendingUp, ArrowRight, Sparkles, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { dashboardApi } from '../api/dashboardApi';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await dashboardApi.getStats();
        setStats(data);
      } catch (err) {
        toast.error(err.friendlyMessage || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <LoadingSpinner message="Loading dashboard..." />;
  if (!stats) {
    return (
      <div className="card mx-auto max-w-lg p-10 text-center">
        <p className="text-lg font-bold text-slate-800">Unable to load dashboard</p>
        <p className="mt-2 text-sm text-slate-500">
          Start the API: <code className="rounded bg-slate-100 px-1">dotnet run</code> in
          backend/YellowBook.API, then refresh.
        </p>
      </div>
    );
  }

  const maxCategoryCount = Math.max(
    ...(stats.businessesByCategory?.map((c) => c.count) || [1]),
    1
  );

  const cards = [
    {
      label: 'Total Businesses',
      value: stats.totalBusinesses,
      icon: Building2,
      color: 'from-yellow-400 to-amber-500',
      delay: 'animate-fade-up-delay-1',
    },
    {
      label: 'Categories',
      value: stats.totalCategories,
      icon: Tags,
      color: 'from-amber-400 to-orange-500',
      delay: 'animate-fade-up-delay-2',
    },
    {
      label: 'Recent Listings',
      value: stats.recentBusinesses?.length || 0,
      icon: TrendingUp,
      color: 'from-slate-600 to-slate-800',
      delay: 'animate-fade-up-delay-3',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero banner */}
      <div className="animate-fade-up relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-850 via-brand-navy to-brand-dark p-8 text-white shadow-xl lg:p-10">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-yellow-400/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-yellow-400/20 px-3 py-1 text-xs font-semibold text-yellow-300 ring-1 ring-yellow-400/30">
              <Sparkles className="h-3.5 w-3.5" />
              Professional Directory
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">
              Welcome to Yellow Book
            </h1>
            <p className="mt-2 max-w-lg text-slate-400">
              Manage and discover business listings in your telephone directory — fast, organized, and always up to date.
            </p>
          </div>
          <Link to="/add-business" className="btn-primary shrink-0 self-start lg:self-center">
            <Plus className="h-4 w-4" />
            Add New Listing
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ label, value, icon: Icon, color, delay }) => (
          <div key={label} className={`stat-card animate-fade-up ${delay}`}>
            <div className={`mb-4 inline-flex rounded-2xl bg-gradient-to-br ${color} p-3.5 shadow-lg`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <p className="text-4xl font-extrabold tracking-tight text-slate-900">{value}</p>
            <p className="mt-1 text-sm font-medium text-slate-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Categories chart */}
        <div className="card animate-fade-up p-6 lg:p-8">
          <h2 className="mb-6 text-lg font-bold text-slate-900">Businesses by Category</h2>
          <div className="space-y-4">
            {stats.businessesByCategory?.map((item) => (
              <div key={item.categoryName}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">{item.categoryName}</span>
                  <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-bold text-yellow-800">
                    {item.count}
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${(item.count / maxCategoryCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            {!stats.businessesByCategory?.length && (
              <p className="text-center text-sm text-slate-400">No category data yet</p>
            )}
          </div>
        </div>

        {/* Recent businesses */}
        <div className="card animate-fade-up p-6 lg:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Recent Businesses</h2>
            <Link
              to="/businesses"
              className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-semibold text-yellow-600 transition hover:bg-yellow-50"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {stats.recentBusinesses?.map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between gap-4 py-4 transition hover:bg-yellow-50/50 -mx-2 px-2 rounded-xl"
              >
                <div>
                  <p className="font-semibold text-slate-900">{b.name}</p>
                  <p className="text-xs font-medium text-slate-500">{b.categoryName}</p>
                </div>
                <span className="shrink-0 rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-xs text-slate-600">
                  {b.phone}
                </span>
              </div>
            ))}
            {!stats.recentBusinesses?.length && (
              <p className="py-8 text-center text-sm text-slate-400">No recent listings</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
