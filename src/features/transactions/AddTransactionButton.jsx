import { useModal } from "../../context/ModalContext";

function AddTransactionButton() {
  const { openModal } = useModal();

  return (
    <button
      className="bg-white text-emerald-500 font-bold p-2 rounded-xl cursor-pointer hover:bg-emerald-600 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-emerald-900 active:text-white active:bg-emerald-700 active:translate-y-0.5 transition-colors duration-200"
      onClick={() => openModal("add-transaction")}
    >
      Add Transaction
    </button>
  );
}

export default AddTransactionButton;
