import React from 'react';

export const getEmptyBusinessForm = () => ({
  name: '',
  categoryId: '',
  phone: '',
  email: '',
  address: '',
  description: ''
});

export default function BusinessForm({
  form,
  errors,
  categories,
  onChange,
  onSubmit,
  submitLabel,
  loading
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6 text-left">
      
      {/* Business Name */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
          Business Name
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="E.g., Sahal Tech Solutions"
          style={{ backgroundColor: '#1e293b', color: '#ffffff' }}
          className="w-full rounded-xl border border-white/10 px-4 py-3 text-sm placeholder-slate-500 outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
          disabled={loading}
        />
        {errors.name && <p className="mt-1.5 text-xs font-semibold text-red-400">{errors.name}</p>}
      </div>

      {/* Category Dropdown */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
          Category
        </label>
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={onChange}
          style={{ backgroundColor: '#1e293b', color: '#ffffff' }}
          className="w-full rounded-xl border border-white/10 px-4 py-3 text-sm outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
          disabled={loading}
        >
          <option value="" style={{ backgroundColor: '#1e293b' }}>Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id} style={{ backgroundColor: '#1e293b' }}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.categoryId && <p className="mt-1.5 text-xs font-semibold text-red-400">{errors.categoryId}</p>}
      </div>

      {/* Phone & Email Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={onChange}
            placeholder="E.g., 061XXXXXXX"
            style={{ backgroundColor: '#1e293b', color: '#ffffff' }}
            className="w-full rounded-xl border border-white/10 px-4 py-3 text-sm placeholder-slate-500 outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
            disabled={loading}
          />
          {errors.phone && <p className="mt-1.5 text-xs font-semibold text-red-400">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="E.g., info@company.com"
            style={{ backgroundColor: '#1e293b', color: '#ffffff' }}
            className="w-full rounded-xl border border-white/10 px-4 py-3 text-sm placeholder-slate-500 outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
            disabled={loading}
          />
          {errors.email && <p className="mt-1.5 text-xs font-semibold text-red-400">{errors.email}</p>}
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
          Address / Location
        </label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={onChange}
          placeholder="E.g., Maka Al Mukarrama Road, Hodan, Mogadishu"
          style={{ backgroundColor: '#1e293b', color: '#ffffff' }}
          className="w-full rounded-xl border border-white/10 px-4 py-3 text-sm placeholder-slate-500 outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
          disabled={loading}
        />
        {errors.address && <p className="mt-1.5 text-xs font-semibold text-red-400">{errors.address}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          placeholder="Tell us about the business services..."
          rows="4"
          style={{ backgroundColor: '#1e293b', color: '#ffffff' }}
          className="w-full rounded-xl border border-white/10 px-4 py-3 text-sm placeholder-slate-500 outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 resize-none"
          disabled={loading}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-4 border-t border-white/5">
        <button
          type="submit"
          className="rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 px-6 py-3 text-sm font-bold text-slate-900 shadow-lg shadow-yellow-500/25 transition hover:opacity-90 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Saving Business...' : submitLabel}
        </button>
      </div>

    </form>
  );
}