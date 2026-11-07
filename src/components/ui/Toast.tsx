import type { IconType } from "react-icons";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiX,
} from "react-icons/fi";
import type {
  Toast as ToastType,
  ToastStatus,
} from "../../context/ToastContext";

interface ToastProps {
  toast: ToastType;
  onClose: () => void;
}

const statusStyles: Record<
  ToastStatus,
  { container: string; icon: string; Icon: IconType }
> = {
  success: {
    container: "border-success-500 bg-success-50 text-success-800",
    icon: "text-success-600",
    Icon: FiCheckCircle,
  },
  error: {
    container: "border-error-500 bg-error-50 text-error-800",
    icon: "text-error-600",
    Icon: FiAlertCircle,
  },
  info: {
    container: "border-mint-500 bg-mint-50 text-mint-900",
    icon: "text-mint-700",
    Icon: FiInfo,
  },
};

export function Toast({ toast, onClose }: ToastProps) {
  const { container, icon, Icon } = statusStyles[toast.status];

  return (
    <div
      className={`flex w-80 max-w-[calc(100vw-2rem)] items-start gap-3 rounded-xl border-l-4 px-4 py-3 shadow-md ${container}`}
    >
      <Icon aria-hidden="true" className={`mt-0.5 h-5 w-5 shrink-0 ${icon}`} />
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close notification"
        className="focus-visible:outline-mint-700 -m-1 shrink-0 rounded-full p-1 opacity-70 transition hover:bg-black/5 hover:opacity-100 focus-visible:outline-2"
      >
        <FiX aria-hidden="true" className="h-4 w-4" />
      </button>
    </div>
  );
}
