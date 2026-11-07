import type { Toast as ToastType } from "../../context/ToastContext";

interface ToastProps {
  toast: ToastType;
  onClose: () => void;
}

export function Toast({ toast, onClose }: ToastProps) {
  return (
    <div className={`toast toast-${toast.status}`}>
      {toast.message}
      <button onClick={onClose}>Close</button>
    </div>
  );
}
