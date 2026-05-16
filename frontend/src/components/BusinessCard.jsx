import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaStar } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';
import { resolveImageUrl } from '../utils/images';

export default function BusinessCard({ business }) {
  const {
    id,
    name,
    phone,
    address,
    categoryName,
    rating,
    description,
    logoUrl,
    city,
  } = business;

  const imageSrc = resolveImageUrl(logoUrl, name);

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm dark:border-slate-700/80 dark:bg-slate-800/90"
    >
      <div className="absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative h-40 overflow-hidden bg-slate-100 dark:bg-slate-700">
        <img
          src={imageSrc}
          alt={name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-amber-800 shadow">
          <FaStar className="text-amber-500" />
          {Number(rating).toFixed(1)}
        </span>
        {categoryName && (
          <span className="absolute right-3 top-3 rounded-full bg-slate-900/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {categoryName}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 dark:text-white dark:group-hover:text-amber-400">
          {name}
        </h3>

        <div className="mt-3 flex flex-1 flex-col gap-2 text-sm text-slate-600 dark:text-slate-400">
          {phone && (
            <p className="flex items-center gap-2">
              <FaPhone className="shrink-0 text-amber-500" />
              <a href={`tel:${phone}`} className="font-medium hover:text-amber-600">
                {phone}
              </a>
            </p>
          )}
          {(address || city) && (
            <p className="flex items-start gap-2 line-clamp-2">
              <FaMapMarkerAlt className="mt-0.5 shrink-0 text-amber-500" />
              <span>
                {address}
                {city ? `, ${city}` : ''}
              </span>
            </p>
          )}
          {description && (
            <p className="line-clamp-2 text-slate-500 dark:text-slate-500">{description}</p>
          )}
        </div>

        <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-700">
          <Link
            to={`/businesses/${id}`}
            className="btn-primary w-full justify-center py-3"
          >
            View Details <HiArrowRight />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
