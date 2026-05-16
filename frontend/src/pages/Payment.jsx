import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaCheckCircle } from 'react-icons/fa';
import { businessApi } from '../api/businessApi';
import { paymentApi } from '../api/paymentApi';
import { fadeUp } from '../utils/motion';

const METHODS = [
  { id: 'EVC Plus', label: 'EVC Plus', color: 'border-green-400 bg-green-50' },
  { id: 'Zaad', label: 'Zaad', color: 'border-blue-400 bg-blue-50' },
  { id: 'Sahal', label: 'Sahal', color: 'border-purple-400 bg-purple-50' },
  { id: 'Visa', label: 'Visa', color: 'border-indigo-400 bg-indigo-50' },
];

export default function Payment() {
  const [businesses, setBusinesses] = useState([]);
  const [method, setMethod] = useState('EVC Plus');
  const [form, setForm] = useState({
    businessId: '',
    amount: '',
    transactionNumber: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    businessApi.getAll().then((r) => setBusinesses(r.data)).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data } = await paymentApi.create({
        businessId: Number(form.businessId),
        amount: Number(form.amount),
        paymentMethod: method,
        transactionNumber: form.transactionNumber,
      });
      setSuccess(data);
      toast.success('Payment recorded successfully');
      setForm({ businessId: '', amount: '', transactionNumber: '' });
    } catch (err) {
      toast.error(err.friendlyMessage || 'Payment failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.div {...fadeUp} className="text-center">
        <h1 className="section-title">Make a Payment</h1>
        <p className="section-subtitle mx-auto">
          Demo payment flow for business listing fees
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="card mt-10 p-10 text-center"
          >
            <FaCheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="mt-4 text-2xl font-bold text-slate-900">Payment Successful</h2>
            <p className="mt-2 text-slate-600">
              {success.businessName} — ${Number(success.amount).toFixed(2)} via {success.paymentMethod}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Transaction: {success.transactionNumber}
            </p>
            <button type="button" className="btn-primary mt-8" onClick={() => setSuccess(null)}>
              Make Another Payment
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            {...fadeUp}
            onSubmit={handleSubmit}
            className="card mt-10 space-y-6 p-8"
          >
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {METHODS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id)}
                    className={`rounded-xl border-2 px-3 py-3 text-sm font-bold transition ${
                      method === m.id
                        ? `${m.color} border-current ring-2 ring-amber-400/50`
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Business</label>
              <select
                required
                value={form.businessId}
                onChange={(e) => setForm((f) => ({ ...f, businessId: e.target.value }))}
                className="input-field"
              >
                <option value="">Select business</option>
                {businesses.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Amount (USD)</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                required
                placeholder="50.00"
                value={form.amount}
                onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                className="input-field"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Transaction Number
              </label>
              <input
                type="text"
                required
                minLength={3}
                placeholder="e.g. TXN-123456"
                value={form.transactionNumber}
                onChange={(e) => setForm((f) => ({ ...f, transactionNumber: e.target.value }))}
                className="input-field"
              />
            </div>

            <button type="submit" disabled={submitting} className="btn-primary w-full py-3.5">
              {submitting ? 'Processing…' : `Pay with ${method}`}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
