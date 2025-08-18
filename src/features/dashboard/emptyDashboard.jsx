import { FaWallet } from "react-icons/fa";
import { Link } from "react-router-dom";
import AddTransactionButton from "../transactions/AddTransactionButton";

function EmptyDashboard() {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh] bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <FaWallet className="text-5xl text-emerald-500 mb-4" />
      <h2 className="text-2xl font-semibold mb-2">
        No transactions yet
      </h2>
      <p className="text-lg mb-6 text-center">
        Start tracking your finances by adding a
        transaction.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <AddTransactionButton />
        <Link
          to="/transactions"
          className="text-center bg-transparent border border-emerald-500 text-emerald-500 font-bold py-2 px-4 rounded-xl hover:bg-emerald-500 hover:text-white active:translate-y-0.5 transition-colors duration-200"
        >
          Go to Transactions
        </Link>
      </div>
    </div>
  );
}

export default EmptyDashboard;
