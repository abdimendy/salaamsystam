import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BusinessCard from '../BusinessCard';
import SkeletonCard from '../SkeletonCard';
import { fadeUp } from '../../utils/motion';

export default function FeaturedCompanies({ businesses = [], loading }) {
  return (
    <section className="py-16">
      <motion.div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" {...fadeUp}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="section-title">Featured Companies</h2>
            <p className="section-subtitle">Top-rated businesses in our directory</p>
          </div>
          <Link to="/businesses" className="btn-secondary">
            View All
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : businesses.map((b) => <BusinessCard key={b.id} business={b} />)}
        </div>
      </motion.div>
    </section>
  );
}
