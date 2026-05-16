import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiSearch } from 'react-icons/hi';
import SectionBadge from '../ui/SectionBadge';

export default function SearchSection({ categories = [] }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [city, setCity] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (name.trim()) params.set('name', name.trim());
    if (categoryId) params.set('categoryId', categoryId);
    if (city.trim()) params.set('city', city.trim());
    navigate(`/businesses?${params.toString()}`);
  };

  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <SectionBadge>Quick Search</SectionBadge>
          <h2 className="section-title mt-4">Find Businesses Instantly</h2>
          <p className="section-subtitle mx-auto">
            Search by company name, category, or city across Somalia.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card mt-10 grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <input
            type="text"
            placeholder="Company name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field sm:col-span-2 lg:col-span-1"
          />
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="input-field"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="City (e.g. Mogadishu)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input-field"
          />
          <button type="submit" className="btn-primary justify-center sm:col-span-2 lg:col-span-1">
            <HiSearch /> Search
          </button>
        </motion.form>
      </div>
    </section>
  );
}
