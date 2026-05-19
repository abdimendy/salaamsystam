import Modal from './Modal';

export default function DeleteConfirmation({
  isOpen,
  onClose,
  onConfirm,
  businessName,
  loading,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete listing">
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Delete{' '}
        <strong className="text-slate-900 dark:text-white">{businessName || 'this business'}</strong>? This cannot be
        undone.
      </p>
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={loading}
          className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
        >
          {loading ? 'Deleting…' : 'Delete'}
        </button>
      </div>
    </Modal>
  );
}
