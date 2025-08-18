import { format } from "date-fns";
import { useModal } from "../../context/ModalContext";
import { useDelTransaction } from "./useDelTransaction";
import { Link } from "react-router-dom";
import {
  MdDeleteOutline,
  MdOutlineModeEdit,
} from "react-icons/md";

function TransactionRow({ transaction }) {
  const { openModal } = useModal();

  const { isDeleting, delTransaction } =
    useDelTransaction();

  const {
    description,
    amount,
    main_category,
    // sub_category, // If need, change in the TransactionTable grid-cols-6 and below
    date,
  } = transaction;

  const onEditClick = (transaction) => {
    openModal("edit-transaction", transaction);
  };
  const handleDelete = () => {
    delTransaction(transaction.id); // pass the transaction id
  };

  return (
    <>
      <div className="grid grid-cols-5 gap-x-[2.4rem] gap-y-[2rem] items-center px-[2.4rem] py-[1.6rem] border-b border-emerald-200 text-emerald-950 ">
        <div>
          <Link
            to={`/transactions/category/${main_category}`}
            className="text-blue-600 underline hover:text-blue-800"
          >
            {main_category}
          </Link>
        </div>
        <div>
          <span
            className={
              transaction.type === "income"
                ? "text-green-600"
                : "text-red-600"
            }
          >
            {amount} kr
          </span>
        </div>
        <div>
          {date
            ? date && format(new Date(date), "dd.MM.yyyy")
            : "-"}
        </div>
        <div>{description}</div>
        {/* <div>{sub_category}</div> // If needed, uncomment this line and change grid-cols-6 in TransactionTable and this table */}
        <div className="flex items-center justify-start gap-2">
          <button
            className="px-2 py-1 text-sm rounded-md bg-emerald-800 text-white cursor-pointer flex items-center gap-1"
            onClick={() => onEditClick(transaction)}
          >
            <MdOutlineModeEdit className="text-2xl" />
          </button>
          <button
            className="px-2 py-1 text-sm rounded-md bg-emerald-600 text-white cursor-pointer flex items-center gap-1"
            disabled={isDeleting}
            onClick={handleDelete}
          >
            <MdDeleteOutline className="text-2xl" />
          </button>
        </div>
      </div>
    </>
  );
}

export default TransactionRow;
