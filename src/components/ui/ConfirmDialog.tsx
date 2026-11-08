import { useEffect, useId, useRef } from "react";

type ConfirmDialogProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
  confirmText?: string;
};

export function ConfirmDialog({
  isOpen,
  onConfirm,
  onCancel,
  title,
  message,
  confirmText = "Confirm",
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const id = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen) {
      dialog?.showModal();
    } else {
      dialog?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      onCancel={onCancel}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-message`}
      className="fixed inset-0 m-auto h-fit w-[calc(100%-2rem)] max-w-md rounded-2xl bg-white p-6 shadow-xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      <h2
        id={`${id}-title`}
        className="mb-2 text-lg font-semibold text-gray-900"
      >
        {title}
      </h2>
      <p id={`${id}-message`} className="mb-6 text-sm text-gray-600">
        {message}
      </p>
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="focus-visible:outline-mint-700 bg-mint-50 rounded-full border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="bg-korall-600 hover:bg-korall-700 focus-visible:outline-korall-700 rounded-full px-4 py-2 font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {confirmText}
        </button>
      </div>
    </dialog>
  );
}
