import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import SectionBadge from '../ui/SectionBadge';

export default function ContactSection() {
  return (
    <section className="py-20">
      <motion.div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl lg:grid lg:grid-cols-2"
        >
          <div className="p-8 lg:p-12">
            <SectionBadge>Contact</SectionBadge>
            <h2 className="section-title mt-4">Get in Touch</h2>
            <p className="section-subtitle mt-3">
              Have questions about listing your business? We&apos;re here to help.
            </p>
            <ul className="mt-8 space-y-5">
              <li className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <FaMapMarkerAlt />
                </span>
                <span className="font-medium text-slate-700">Mogadishu, Somalia</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <FaPhone />
                </span>
                <a href="tel:+252612345678" className="font-medium text-slate-700 hover:text-amber-600">
                  +252 61 234 5678
                </a>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <FaEnvelope />
                </span>
                <a href="mailto:info@yellowbook.so" className="font-medium text-slate-700 hover:text-amber-600">
                  info@yellowbook.so
                </a>
              </li>
            </ul>
            <Link to="/contact" className="btn-primary mt-8">
              Contact Us
            </Link>
          </div>
          <div className="relative min-h-[280px] bg-gradient-to-br from-slate-100 to-amber-50 p-8 lg:min-h-full">
            <div className="hero-grid absolute inset-0 opacity-30" />
            <motion.div className="relative flex h-full flex-col items-center justify-center text-center">
              <div className="rounded-2xl border-2 border-dashed border-amber-300/60 bg-white/80 px-8 py-12 backdrop-blur-sm">
                <FaMapMarkerAlt className="mx-auto h-12 w-12 text-amber-500" />
                <p className="mt-4 font-bold text-slate-900">Mogadishu City Center</p>
                <p className="mt-1 text-sm text-slate-500">Interactive map coming soon</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
