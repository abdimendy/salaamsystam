import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, onSubmit, placeholder = 'Search businesses...' }) {
  return (
    <form onSubmit={onSubmit} className="relative w-full max-w-2xl">
      <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-field w-full py-3.5 pl-14 pr-32 shadow-sm"
      />
      <button type="submit" className="btn-primary absolute right-2 top-1/2 -translate-y-1/2 !py-2 !px-5">
        Search
      </button>
    </form>
  );
}
