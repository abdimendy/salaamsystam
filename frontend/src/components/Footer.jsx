import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import Logo from './Logo';

const footerLinks = {
  Directory: [
    { to: '/businesses', label: 'All Businesses' },
    { to: '/categories', label: 'Categories' },
    { to: '/payment', label: 'Payment' },
  ],
  Company: [
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
    { to: '/admin', label: 'Admin' },
  ],
};

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo className="[&_span]:text-white" linkTo="/" />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
              YellowBook Directory — Somalia&apos;s modern digital business telephone directory.
              Find trusted companies, contact details, and services across Mogadishu and beyond.
            </p>
            <div className="mt-5 flex gap-3">
              {[FaFacebook, FaTwitter, FaInstagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-amber-400 transition hover:bg-amber-400 hover:text-slate-900"
                  aria-label="Social"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">
                {title}
              </h4>
              <ul className="mt-4 space-y-2">
                {links.map(({ to, label }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-sm text-slate-400 transition hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} YellowBook Directory. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">YB Directory · Built for Somalia</p>
        </div>
      </div>
    </footer>
  );
}
