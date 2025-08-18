import { useEffect, useRef } from "react";
import { useModal } from "../context/ModalContext";
import TransactionForm from "../features/transactions/TransactionsForm";

function Modal() {
  const { isOpen, name, data, closeModal } = useModal();
  const contentRef = useRef(null);

  // Close by Esc
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKeyDown);
    return () =>
      document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex justify-center items-center z-50 px-2"
      onMouseDown={(e) => {
        // Click outside the content - close
        if (
          contentRef.current &&
          !contentRef.current.contains(e.target)
        ) {
          closeModal();
        }
      }}
    >
      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        className="relative p-4 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl"
      >
        {name === "add-transaction" && <TransactionForm />}
        {name === "edit-transaction" && data && (
          <TransactionForm transaction={data} />
        )}
        {/* Add another modals */}
      </div>
    </div>
  );
}

export default Modal;
