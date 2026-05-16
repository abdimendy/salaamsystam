import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaSignInAlt, FaSignOutAlt, FaUserShield } from 'react-icons/fa';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/businesses', label: 'Businesses' },
  { to: '/categories', label: 'Categories' },
  { to: '/about', label: 'About' },
  { to: '/payment', label: 'Payment' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-900/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `rounded-xl px-3 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-300'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <ThemeToggle />
          <Link to="/businesses" className="btn-secondary text-sm">
            Explore
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/admin" className="btn-primary text-sm">
                <FaUserShield /> Admin
              </Link>
              <button type="button" onClick={logout} className="btn-ghost text-sm" title="Logout">
                <FaSignOutAlt />
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-primary text-sm">
              <FaSignInAlt /> Login
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="rounded-xl p-2 text-slate-700 dark:text-slate-200"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-700 dark:bg-slate-900 lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-semibold ${
                    isActive
                      ? 'bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-300'
                      : 'text-slate-700 dark:text-slate-200'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <>
                <Link to="/admin" onClick={() => setOpen(false)} className="btn-primary mt-2 justify-center">
                  Admin Panel
                </Link>
                <button type="button" onClick={() => { logout(); setOpen(false); }} className="btn-secondary mt-2">
                  Logout ({user?.username})
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)} className="btn-primary mt-2 justify-center">
                <FaSignInAlt /> Login
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
