import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  Search,
  Tags,
  X,
  BookOpen,
} from 'lucide-react';

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/businesses', label: 'Businesses', icon: Building2 },
  { to: '/add-business', label: 'Add Business', icon: PlusCircle },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/categories', label: 'Categories', icon: Tags },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-gradient-to-b from-slate-850 via-brand-navy to-brand-dark text-white shadow-2xl transition duration-300 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5 lg:hidden">
          <span className="flex items-center gap-2 font-bold">
            <BookOpen className="h-5 w-5 text-yellow-400" />
            Menu
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1.5 p-4 pt-6">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Navigation
          </p>
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 shadow-lg shadow-yellow-500/25'
                    : 'text-slate-400 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-5">
          <div className="rounded-xl bg-white/5 p-4">
            <p className="text-xs font-semibold text-yellow-400">Yellow Book</p>
            <p className="mt-0.5 text-xs text-slate-500">Directory System v1.0</p>
          </div>
        </div>
      </aside>
    </>
  );
}
