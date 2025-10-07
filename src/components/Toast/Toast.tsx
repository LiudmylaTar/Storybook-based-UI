import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./Toast.css";

type ToastType = "success" | "error" | "info" | "warning";
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number; // in ms
  onClose?: () => void;

  /** Customization */
  bgColor?: string;
  textColor?: string;
  iconColor?: string;
  fontSize?: number | string;
  position?: ToastPosition;
}

const Toast = ({
  message,
  type = "info",
  duration = 3000,
  onClose,
  bgColor,
  textColor = "#fff",
  iconColor = "#fff",
  fontSize = 15,
  position = "bottom-right",
}: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return createPortal(
    <div
      className={`toast toast-${type} toast-${position}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        fontSize: typeof fontSize === "number" ? `${fontSize}px` : fontSize,
      }}
    >
      <div className="toast-message">{message}</div>
      {onClose && (
        <button className="toast-close" onClick={onClose}>
          <svg width="12" height="12" style={{ stroke: iconColor }}>
            <use href={`/icons/sprite.svg#icon-close`} />
          </svg>
        </button>
      )}
    </div>,
    document.body
  );
};

export default Toast;
