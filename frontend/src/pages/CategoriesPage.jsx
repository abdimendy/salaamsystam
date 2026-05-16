import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { categoryApi } from '../api/categoryApi';
import LoadingSpinner from '../components/LoadingSpinner';
import CategoryCard from '../components/CategoryCard';
import { fadeUp } from '../utils/motion';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryApi
      .getAll()
      .then((r) => setCategories(r.data))
      .catch((err) => toast.error(err.friendlyMessage || 'Failed to load categories'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.div {...fadeUp} className="text-center">
        <h1 className="section-title">Categories</h1>
        <p className="section-subtitle mx-auto">
          Browse businesses by industry and service type across Somalia
        </p>
      </motion.div>

      {loading ? (
        <div className="mt-16 flex justify-center">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
