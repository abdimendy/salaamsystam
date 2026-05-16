export default function SectionBadge({ children, className = '' }) {
  return (
    <span className={`badge ${className}`.trim()}>{children}</span>
  );
}
