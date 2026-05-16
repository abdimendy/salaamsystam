import fs from 'fs';
import path from 'path';

const tokens = new Set();
const valid = /^[a-zA-Z0-9_!:\[\].\/%-]+$/;

const extras = [
  'translate-x-0', '-translate-x-full',
  'bg-gradient-to-r', 'from-yellow-400', 'to-amber-500',
  'text-slate-900', 'shadow-yellow-500/25',
  'text-slate-400', 'hover:bg-white/10', 'hover:text-white',
  'from-yellow-400', 'to-yellow-600', 'from-amber-400', 'to-orange-500',
  'from-slate-600', 'to-slate-800', 'md:col-span-2',
  'animate-fade-up-delay-1', 'animate-fade-up-delay-2', 'animate-fade-up-delay-3',
];

function walk(dir) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory() && file !== 'assets') walk(full);
    else if (/\.(jsx|js)$/.test(file)) {
      const text = fs.readFileSync(full, 'utf8');
      for (const m of text.matchAll(/className="([^"]+)"/g)) addClasses(m[1]);
      for (const m of text.matchAll(/className='([^']+)'/g)) addClasses(m[1]);
      for (const m of text.matchAll(/className=\{`([^`]+)`\}/g)) addClasses(m[1]);
      for (const m of text.matchAll(/`([^`]*\$\{[^}]+\}[^`]*)`/g)) {
        const parts = m[1].split(/\$\{[^}]+\}/);
        parts.forEach(addClasses);
      }
    }
  }
}

function addClasses(str) {
  str.split(/\s+/).forEach((c) => {
    c = c.trim();
    if (c && valid.test(c)) tokens.add(c);
  });
}

walk('src');
extras.forEach((c) => tokens.add(c));

const list = [...tokens].sort().join(' ');
const css = `/* Auto-generated — run: node scripts/extract-classes.mjs */\n@source inline("${list.replace(/"/g, '\\"')}");\n`;
fs.writeFileSync('src/safelist.css', css);
console.log('Generated', tokens.size, 'classes');
