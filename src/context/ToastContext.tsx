import { createContext, useContext, useState, type ReactNode } from "react";
import { Toast as ToastItem } from "../components/ui/Toast";

export type ToastStatus = "success" | "error" | "info";

export interface Toast {
  id: string;
  message: string;
  status: ToastStatus;
}

interface ToastContextValue {
  showToast: (message: string, status?: ToastStatus) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function removeToast(id: string) {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }

  function showToast(message: string, status: ToastStatus = "info") {
    const id = crypto.randomUUID();
    setToasts((prevToasts) => [...prevToasts, { id, message, status }]);
    setTimeout(() => removeToast(id), 3000);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        className="fixed right-4 bottom-4 z-50 flex flex-col gap-2"
      >
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
