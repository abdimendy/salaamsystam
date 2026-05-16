import { useId } from 'react';
import { Link } from 'react-router-dom';

export function LogoMark({ className = '', size = 44 }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <rect width="48" height="48" rx="14" fill={`url(#${id}-grad)`} />
      <rect x="3" y="3" width="42" height="42" rx="12" stroke="white" strokeOpacity="0.25" strokeWidth="1" fill="none" />
      <path
        d="M13 11h15a3.5 3.5 0 0 1 3.5 3.5v19a3.5 3.5 0 0 1-3.5 3.5H13V11z"
        fill="#0f172a"
      />
      <path d="M16.5 14.5h12v16h-12v-16z" fill="#fde047" />
      <path d="M16.5 18h12v1.2h-12V18zm0 3.2h9v1.2h-9v-1.2zm0 3.2h10v1.2h-10v-1.2zm0 3.2h7v1.2h-7v-1.2z" fill="#0f172a" fillOpacity="0.35" />
      <path
        d="M28 11h7a3.5 3.5 0 0 1 3.5 3.5v19a3.5 3.5 0 0 1-3.5 3.5h-7V11z"
        fill="#1e293b"
        fillOpacity="0.85"
      />
      <path d="M31 14.5h4v16h-4v-16z" fill="#f59e0b" />
      <circle cx="22.5" cy="22.5" r="2.5" fill="#fbbf24" stroke="#0f172a" strokeWidth="1" />
      <defs>
        <linearGradient id={`${id}-grad`} x1="4" y1="4" x2="44" y2="44">
          <stop stopColor="#fef08a" />
          <stop offset="0.45" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Logo({
  className = '',
  linkTo = '/',
  showText = true,
  size = 'md',
}) {
  const sizes = {
    sm: { mark: 36, text: 'text-lg' },
    md: { mark: 44, text: 'text-xl' },
    lg: { mark: 56, text: 'text-2xl' },
    xl: { mark: 72, text: 'text-3xl' },
  };
  const s = sizes[size] || sizes.md;

  const content = (
    <>
      <span className="relative shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[-2deg]">
        <span className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-amber-400/50 to-yellow-300/30 blur-md" />
        <LogoMark size={s.mark} className="relative drop-shadow-xl" />
      </span>
      {showText && (
        <span className={`${s.text} font-extrabold tracking-tight leading-none`}>
          <span className="text-slate-900 dark:text-white">Yellow</span>
          <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
            Book
          </span>
        </span>
      )}
    </>
  );

  if (linkTo) {
    return (
      <Link
        to={linkTo}
        className={`group inline-flex items-center gap-3 ${className}`}
        aria-label="YellowBook Directory home"
      >
        {content}
      </Link>
    );
  }

  return <span className={`inline-flex items-center gap-3 ${className}`}>{content}</span>;
}
