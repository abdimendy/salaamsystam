import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 text-slate-600 transition hover:border-yellow-300 hover:bg-yellow-50 hover:text-yellow-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-yellow-500/50 dark:hover:bg-slate-700 dark:hover:text-yellow-400 ${className}`}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
