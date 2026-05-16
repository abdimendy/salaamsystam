export default function LoadingSpinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-[3px]',
    lg: 'h-14 w-14 border-4',
  };

  return (
    <div className={`flex items-center justify-center ${className}`} role="status" aria-label="Loading">
      <span
        className={`${sizes[size]} animate-spin rounded-full border-amber-200 border-t-amber-500`}
      />
    </div>
  );
}
