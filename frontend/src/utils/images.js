const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, '') || 'http://localhost:5261';

export function resolveImageUrl(url, name = 'Business') {
  if (!url || !String(url).trim()) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=fbbf24&color=1e293b&size=256&bold=true`;
  }
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  if (trimmed.startsWith('/')) {
    return `${API_BASE}${trimmed}`;
  }
  return trimmed;
}
