import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import SectionBadge from '../ui/SectionBadge';
import { staggerContainer, staggerItem } from '../../utils/motion';

const testimonials = [
  {
    name: 'Amina Hassan',
    role: 'Restaurant Owner, Mogadishu',
    text: 'YellowBook helped customers find our restaurant within days. Our phone never stops ringing!',
    rating: 5,
    initial: 'A',
  },
  {
    name: 'Mohamed Ali',
    role: 'Tech Shop Manager',
    text: 'The best directory in Mogadishu. Clean design, accurate listings, and easy to update.',
    rating: 5,
    initial: 'M',
  },
  {
    name: 'Fatima Noor',
    role: 'Healthcare Clinic',
    text: 'Patients can now locate us instantly. Professional platform with great support.',
    rating: 5,
    initial: 'F',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-slate-50/80 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <SectionBadge>Testimonials</SectionBadge>
          <h2 className="section-title mt-4">What People Say</h2>
          <p className="section-subtitle mx-auto">Trusted by businesses across Somalia</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.article
              key={t.name}
              variants={staggerItem}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-xl"
            >
              <span className="absolute -right-4 -top-4 block h-24 w-24 rounded-full bg-amber-100/50 transition group-hover:bg-amber-200/50" />
              <FaQuoteLeft className="relative text-2xl text-amber-400" />
              <p className="relative mt-4 leading-relaxed text-slate-600">&ldquo;{t.text}&rdquo;</p>
              <div className="relative mt-4 flex gap-0.5 text-amber-500">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <FaStar key={i} className="h-4 w-4" />
                ))}
              </div>
              <div className="relative mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 font-bold text-slate-900">
                  {t.initial}
                </span>
                <span>
                  <p className="font-bold text-slate-900">{t.name}</p>
                  <p className="text-sm text-slate-500">{t.role}</p>
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
