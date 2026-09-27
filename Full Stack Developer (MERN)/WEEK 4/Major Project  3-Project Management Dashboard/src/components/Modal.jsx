import {
  useEffect,
  useRef,
} from "react";

import {
  X,
} from "lucide-react";

export default function Modal({
  open,
  onClose,
  title,
  children,
  size = "medium",
  closeOnBackdrop = true,
  showCloseButton = true,
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose?.();
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    const firstFocusableElement =
      modalRef.current?.querySelector(
        "button, input, textarea, select, [href], [tabindex]:not([tabindex='-1'])"
      );

    firstFocusableElement?.focus();

    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  function handleBackdropMouseDown(
    event
  ) {
    if (
      closeOnBackdrop &&
      event.target === event.currentTarget
    ) {
      onClose?.();
    }
  }

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={
        handleBackdropMouseDown
      }
    >
      <div
        ref={modalRef}
        className={`modal modal-${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <div className="modal-head">
          <div className="modal-title-wrapper">
            <h2 id="modal-title">
              {title}
            </h2>
          </div>

          {showCloseButton && (
            <button
              type="button"
              className="modal-close"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X
                size={20}
                strokeWidth={2}
              />
            </button>
          )}
        </div>

        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}