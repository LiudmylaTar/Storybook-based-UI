import React from "react";
import Toast from "./Toast";
import type { ToastItem } from "../../hooks/useToast";

interface ToastContainerProps {
  toasts: ToastItem[];
  onClose: (id: number) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  return (
    <>
      {toasts.map((t) => (
        <Toast
          key={t.id}
          message={t.message}
          type={t.type}
          duration={t.duration}
          onClose={() => onClose(t.id)}
        />
      ))}
    </>
  );
};

export default ToastContainer;
