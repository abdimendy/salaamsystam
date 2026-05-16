import { motion } from 'framer-motion';
import { FaBuilding, FaCreditCard, FaStar, FaTags } from 'react-icons/fa';
import SectionBadge from '../ui/SectionBadge';
import { staggerContainer, staggerItem } from '../../utils/motion';

const defaultStats = [
  { label: 'Businesses', value: '500+', icon: FaBuilding },
  { label: 'Categories', value: '25+', icon: FaTags },
  { label: 'Reviews', value: '1,200+', icon: FaStar },
  { label: 'Payments', value: '10K+', icon: FaCreditCard },
];

export default function StatsSection({ stats }) {
  const items = stats
    ? [
        { label: 'Businesses', value: `${stats.totalBusinesses}+`, icon: FaBuilding },
        { label: 'Categories', value: `${stats.totalCategories}+`, icon: FaTags },
        { label: 'Reviews', value: `${stats.totalReviews}+`, icon: FaStar },
        { label: 'Payments', value: `${stats.totalPayments}+`, icon: FaCreditCard },
      ]
    : defaultStats;

  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute left-1/4 top-0 h-72 w-72 rounded-full bg-yellow-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <SectionBadge className="border-amber-400/30 bg-amber-400/10 text-amber-200">
            By The Numbers
          </SectionBadge>
          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Growing Every Day
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map(({ label, value, icon: Icon }) => (
            <motion.div key={label} variants={staggerItem} className="stat-card-dark text-center">
              <Icon className="mx-auto h-9 w-9 text-amber-400" />
              <p className="mt-4 text-4xl font-extrabold text-white">{value}</p>
              <p className="mt-2 text-sm font-medium text-slate-400">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
