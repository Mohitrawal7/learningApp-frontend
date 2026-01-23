export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose} // outside click
    >
      <div
        className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()} // prevent close inside
      >
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}
