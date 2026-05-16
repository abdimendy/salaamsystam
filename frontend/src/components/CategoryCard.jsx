import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const ICON_MAP = {
  hotel: '🏨',
  hospital: '🏥',
  school: '🏫',
  restaurant: '🍽️',
  bank: '🏦',
  university: '🎓',
  pharmacy: '💊',
  telecom: '📱',
  transport: '🚌',
  supermarket: '🛒',
};

export function getCategoryIcon(category) {
  if (category?.icon && ICON_MAP[category.icon]) return ICON_MAP[category.icon];
  const name = category?.name?.toLowerCase() || '';
  for (const [key, emoji] of Object.entries(ICON_MAP)) {
    if (name.includes(key)) return emoji;
  }
  return '📁';
}

export default function CategoryCard({ category, index = 0 }) {
  const emoji = getCategoryIcon(category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -6 }}
    >
      <Link
        to={`/businesses?categoryId=${category.id}`}
        className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm dark:border-slate-700/80 dark:bg-slate-800/90"
      >
        <div className="relative bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-400 px-6 py-8 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_50%)]" />
          <span className="relative text-5xl drop-shadow-sm">{emoji}</span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 dark:text-white dark:group-hover:text-amber-400">
            {category.name}
          </h3>
          {category.description && (
            <p className="mt-2 line-clamp-2 flex-1 text-sm text-slate-600 dark:text-slate-400">
              {category.description}
            </p>
          )}
          <p className="mt-4 flex items-center justify-between text-xs font-semibold text-amber-700 dark:text-amber-400">
            <span>{category.businessCount ?? 0} businesses</span>
            <FaArrowRight className="transition group-hover:translate-x-1" />
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
