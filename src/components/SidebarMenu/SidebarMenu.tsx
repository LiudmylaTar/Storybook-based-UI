import { useEffect, useState } from "react";
import "./SidebarMenu.css";

interface SidebarItem {
  id?: string;
  label: string;
  children?: SidebarItem[];
  onClick?: () => void;
}

interface SidebarMenuProps {
  title?: string;
  items: SidebarItem[];
  onClose?: () => void;
  mode?: "overlay" | "push"; // <-- новий проп
  closeOnBgClick?: boolean;
  isOpen?: boolean;
  bgColor?: string;
  textColor?: string;
  fontSize?: number | string;
  maxWidth?: number | string;
  position?: "left" | "right";
}

const SidebarMenu = ({
  title = "Menu",
  items,
  isOpen = true,
  onClose,
  bgColor = "#fff",
  textColor = "#111",
  fontSize = "16px",
  maxWidth = 320,
  position = "right",
  mode = "overlay",
  closeOnBgClick = true,
}: SidebarMenuProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const toggleItem = (label: string) => {
    setOpenItems((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );
  };

  // handle escape to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);
  if (!isOpen && mode === "overlay") {
    return null;
  }

  return (
    <>
      {/* Overlay only when overlay-mode */}
      {mode === "overlay" && isOpen && (
        <div
          className={`sm-overlay ${position}`}
          onClick={closeOnBgClick ? onClose : undefined}
          aria-hidden={!isOpen}
        />
      )}

      {/* Push-mode wrapper class added to allow external content shifting via CSS variable */}
      <aside
        className={[
          "sm-sidebar",
          position === "left" ? "left" : "right",
          mode === "push" ? "push" : "overlay",
          isOpen ? "open" : "closed",
        ].join(" ")}
        style={{
          backgroundColor: bgColor,
          color: textColor,
          fontSize,
          maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
        }}
        role="dialog"
        aria-modal={mode === "overlay"}
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="sm-header">
          <h2 className="sm-title">{title}</h2>
          <button
            type="button"
            className="sm-close-btn"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M6 6L18 18M6 18L18 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </header>

        <nav className="sm-menu">
          {items.map((item) => {
            const isOpenItem = openItems.includes(item.label);
            return (
              <div className="sm-menu-block" key={item.id ?? item.label}>
                <button
                  type="button"
                  onClick={() =>
                    item.children ? toggleItem(item.label) : item.onClick?.()
                  }
                  className="sm-menu-item"
                  aria-expanded={item.children ? isOpenItem : undefined}
                >
                  <span>{item.label}</span>
                  {item.children && (
                    <svg
                      width="14"
                      height="14"
                      className={`sm-chevron ${isOpenItem ? "open" : ""}`}
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        d="M6 9l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  )}
                </button>

                {item.children && (
                  <div
                    className={`sm-submenu-wrapper ${
                      isOpenItem ? "open" : "closed"
                    }`}
                    aria-hidden={!isOpenItem}
                  >
                    {item.children.map((child) => (
                      <button
                        key={child.id ?? child.label}
                        type="button"
                        className="sm-submenu-item"
                        onClick={child.onClick}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default SidebarMenu;
