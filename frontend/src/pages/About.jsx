import { motion } from 'framer-motion';
import { FaHandshake, FaLightbulb, FaUsers } from 'react-icons/fa';
import { fadeUp, staggerContainer, staggerItem } from '../utils/motion';

const values = [
  {
    icon: FaLightbulb,
    title: 'Innovation',
    text: 'Modern digital directory built for Somalia\'s growing economy.',
  },
  {
    icon: FaHandshake,
    title: 'Trust',
    text: 'Verified listings and transparent contact information for every business.',
  },
  {
    icon: FaUsers,
    title: 'Community',
    text: 'Connecting customers with local enterprises across every district.',
  },
];

export default function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
        <h1 className="section-title">About YellowBook</h1>
        <p className="section-subtitle mx-auto mt-4">
          YellowBook Telephone Directory is Somalia&apos;s premier business listing platform —
          helping people find phone numbers, addresses, and services with confidence.
        </p>
      </motion.div>

      <motion.div {...fadeUp} className="card mx-auto mt-12 max-w-4xl p-8 lg:p-12">
        <p className="text-slate-600 leading-relaxed">
          Founded to modernize the traditional yellow pages, YellowBook brings together restaurants,
          hotels, clinics, shops, and professional services in one searchable platform. Whether you
          need a plumber in Hodan or a hotel near the airport, YellowBook puts the right number at
          your fingertips.
        </p>
        <p className="mt-4 text-slate-600 leading-relaxed">
          We partner with businesses of all sizes to increase visibility, accept listing payments via
          mobile money, and provide downloadable PDF profiles for offline reference.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="mt-16 grid gap-6 md:grid-cols-3"
      >
        {values.map(({ icon: Icon, title, text }) => (
          <motion.div key={title} variants={staggerItem} className="stat-card text-center">
            <Icon className="mx-auto h-10 w-10 text-amber-500" />
            <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm text-slate-600">{text}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
