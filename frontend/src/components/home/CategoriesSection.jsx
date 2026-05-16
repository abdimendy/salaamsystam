import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import SectionBadge from '../ui/SectionBadge';
import CategoryCard from '../CategoryCard';

export default function CategoriesSection({ categories = [] }) {
  const display = categories.slice(0, 10);

  return (
    <section className="py-20 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <SectionBadge>Categories</SectionBadge>
            <h2 className="section-title mt-4 dark:text-white">Browse by Industry</h2>
            <p className="section-subtitle dark:text-slate-400">
              Explore businesses organized by industry and service type across Somalia
            </p>
          </div>
          <Link
            to="/categories"
            className="btn-secondary hidden sm:inline-flex"
          >
            View all <FaArrowRight />
          </Link>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {display.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link to="/categories" className="btn-primary">
            View all categories <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
