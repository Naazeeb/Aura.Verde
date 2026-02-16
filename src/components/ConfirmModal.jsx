import React, { useEffect } from "react";

export default function ConfirmModal({
  open,
  title = "Confirmar",
  description = "¿Querés continuar?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    function onKey(e) {
      if (!open) return;
      if (e.key === "Escape") onCancel?.();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="modalBackdrop isOpen" role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal">
        <h4>{title}</h4>
        <p>{description}</p>

        <div className="modalActions">
          <button className="btnSmall" onClick={onCancel}>{cancelText}</button>
          <button className="btnSmall btnSmall--primary" onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
}

