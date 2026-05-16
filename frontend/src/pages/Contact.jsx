import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaClock, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { fadeUp } from '../utils/motion';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      toast.success('Message sent! We will get back to you soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
      setSending(false);
    }, 800);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.div {...fadeUp} className="text-center">
        <h1 className="section-title">Contact Us</h1>
        <p className="section-subtitle mx-auto">
          Questions about listings, payments, or partnerships? Reach out anytime.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <motion.form {...fadeUp} onSubmit={handleSubmit} className="card space-y-5 p-8">
          <input
            type="text"
            required
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="input-field"
          />
          <input
            type="email"
            required
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="input-field"
          />
          <input
            type="text"
            required
            placeholder="Subject"
            value={form.subject}
            onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
            className="input-field"
          />
          <textarea
            required
            rows={5}
            placeholder="Your message"
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            className="input-field resize-none"
          />
          <button type="submit" disabled={sending} className="btn-primary w-full py-3.5">
            {sending ? 'Sending…' : 'Send Message'}
          </button>
        </motion.form>

        <motion.div {...fadeUp} className="space-y-6">
          <div className="card p-6">
            <h2 className="font-bold text-slate-900">Contact Information</h2>
            <ul className="mt-6 space-y-4 text-slate-600">
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-amber-500" /> Hodan, Mogadishu, Somalia
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-amber-500" /> +252 61 234 5678
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-amber-500" /> info@yellowbook.so
              </li>
              <li className="flex items-center gap-3">
                <FaClock className="text-amber-500" /> Sat–Thu: 8:00 AM – 6:00 PM
              </li>
            </ul>
          </div>
          <div className="card flex min-h-[280px] items-center justify-center p-6 text-center text-slate-500">
            <p>
              Map placeholder
              <br />
              <span className="text-sm">Interactive map integration coming soon</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
