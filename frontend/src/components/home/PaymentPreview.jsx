import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMobileAlt, FaShieldAlt } from 'react-icons/fa';
import SectionBadge from '../ui/SectionBadge';

const methods = [
  { name: 'EVC Plus', color: 'from-green-500 to-emerald-600' },
  { name: 'Zaad', color: 'from-blue-500 to-indigo-600' },
  { name: 'Sahal', color: 'from-purple-500 to-violet-600' },
  { name: 'Visa', color: 'from-slate-700 to-slate-900' },
];

export default function PaymentPreview() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-3xl border border-slate-200/80 shadow-2xl lg:grid lg:grid-cols-2"
        >
          <div className="relative bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-500 p-8 text-slate-900 lg:p-12">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
            <SectionBadge className="relative border-white/40 bg-white/20 text-slate-900">
              Payments
            </SectionBadge>
            <h2 className="relative mt-4 text-3xl font-extrabold lg:text-4xl">
              Easy Listing Payments
            </h2>
            <p className="relative mt-4 leading-relaxed text-slate-800/90">
              Pay for your business listing using Somalia&apos;s most popular mobile money and card
              options — fast, secure, and demo-ready.
            </p>
            <div className="relative mt-6 flex flex-wrap gap-4 text-sm font-semibold">
              <span className="flex items-center gap-2">
                <FaShieldAlt /> Secure
              </span>
              <span className="flex items-center gap-2">
                <FaMobileAlt /> Mobile First
              </span>
            </div>
            <Link
              to="/payment"
              className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 font-bold text-white shadow-xl transition hover:bg-slate-800"
            >
              Make a Payment
            </Link>
          </div>
          <div className="flex flex-col justify-center gap-6 bg-white p-8 lg:p-12">
            <p className="font-bold text-slate-900">Supported methods</p>
            <div className="grid grid-cols-2 gap-4">
              {methods.map((m) => (
                <motion.div
                  key={m.name}
                  whileHover={{ scale: 1.03 }}
                  className={`flex items-center justify-center rounded-2xl bg-gradient-to-br ${m.color} px-4 py-5 text-sm font-bold text-white shadow-lg`}
                >
                  {m.name}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
