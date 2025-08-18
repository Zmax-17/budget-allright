import { useState } from "react";
import TransactionRow from "./TransactionRow";
import { useTransactionsByFilter } from "./useTransactionsByFilter";
import LoadingSpinner from "../../ui/LoadingSpinner";

function TransactionsTable() {
  const [filter, setFilter] = useState({ type: "all" });
  const [activeType, setActiveType] = useState("all");

  const handleClick = (type) => {
    setFilter({ type });
    setActiveType(type);
  };

  const { isLoading, error, transactions } =
    useTransactionsByFilter(filter);

  if (isLoading)
    return (
      <LoadingSpinner message="Transaction loading..." />
    );
  if (error)
    return "An error has occurred: " + error.message;

  // Extracting data
  const transactionList = transactions || [];

  return (
    <div>
      <header>
        <div className="w-full sm:w-fit rounded-sm flex gap-2 m-2 border border-emerald-100 flex-wrap">
          {["all", "income", "withdraw"].map((type) => (
            <button
              key={type}
              disabled={activeType === type}
              onClick={() => handleClick(type)}
              className={`p-2 rounded-sm cursor-pointer disabled:cursor-not-allowed hover:bg-emerald-800 active:text-white ${
                activeType === type
                  ? "bg-emerald-600 text-white transition delay-150 duration-300 ease-in-out "
                  : "bg-transparent text-emerald-600 "
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto max-w-full">
          <div className="p-[1.6rem_2.4rem] grid grid-cols-5 gap-x-[2.4rem] items-center bg-emerald-300 dark:bg-emerald-950 border-b border-emerald-700 uppercase tracking-[0.4px] font-semibold text-white max-w-full sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5">
            <div>Main category</div>
            <div>Amount</div>
            <div>Date</div>
            <div>Description</div>
            {/* <div>Sub category</div> // If needed, uncomment this line and change grid-cols-6 in this table and TransactionRow */}
            <div>Options</div>
          </div>
        </div>
      </header>

      <section>
        {transactionList.map((tx) => (
          <TransactionRow
            key={tx.id}
            transaction={tx}
          />
        ))}
      </section>
    </div>
  );
}

export default TransactionsTable;
