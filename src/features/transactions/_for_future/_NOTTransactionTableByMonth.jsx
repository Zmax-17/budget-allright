// For future use, this file is currently not being used.
// import { useMemo, useState } from "react";
// import TransactionRow from "./TransactionRow";
// import LoadingSpinner from "../../ui/LoadingSpinner";
// import { useTransactionsByMonth } from "./useTransactionByMonth";
// import { useMonth } from "../../context/MonthContext";

// function TransactionsTableByMonth() {

//   const { selectedMonth, setSelectedMonth } = useMonth();
//   const [activeType, setActiveType] = useState("all");

//   const { isLoading, error, transactions } =
//     useTransactionsByMonth(selectedMonth);

//   // Client filtering by type
//   const displayedTransactions = useMemo(() => {
//     if (activeType === "all") return transactions;
//     return transactions.filter(
//       (t) => t.type === activeType
//     );
//   }, [transactions, activeType]);

//   if (isLoading)
//     return (
//       <LoadingSpinner message="Transaction loading..." />
//     );
//   if (error)
//     return "An error has occurred: " + error.message;

//   return (
//     <div>
//       <header>
//         {/* Select month */}
//         <div className="flex flex-wrap items-center gap-3 m-2">
//           <label
//             htmlFor="month"
//             className="text-emerald-700 dark:text-emerald-200"
//           >
//             Month
//           </label>
//           <input
//             id="month"
//             type="month"
//             value={selectedMonth}
//             onChange={(e) =>
//               setSelectedMonth(e.target.value)
//             }
//             className="border border-emerald-200 rounded-sm p-2 outline-none focus:ring-2 focus:ring-emerald-500"
//           />

//           {/* Filters by type (client filtering) */}
//           <div className="w-full sm:w-fit rounded-sm flex gap-2 border border-emerald-100 flex-wrap p-1">
//             {["all", "income", "withdraw"].map((type) => (
//               <button
//                 key={type}
//                 disabled={activeType === type}
//                 onClick={() => setActiveType(type)}
//                 className={`p-2 rounded-sm cursor-pointer disabled:cursor-not-allowed hover:bg-emerald-800 active:text-white ${
//                   activeType === type
//                     ? "bg-emerald-600 text-white transition delay-150 duration-300 ease-in-out"
//                     : "bg-transparent text-emerald-600"
//                 }`}
//               >
//                 {type.charAt(0).toUpperCase() +
//                   type.slice(1)}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="overflow-x-auto max-w-full">
//           <div className="p-[1.6rem_2.4rem] grid grid-cols-5 gap-x-[2.4rem] items-center bg-emerald-300 dark:bg-emerald-950 border-b border-emerald-700 uppercase tracking-[0.4px] font-semibold text-white max-w-full sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5">
//             <div>Main category</div>
//             <div>Amount</div>
//             <div>Date</div>
//             <div>Description</div>
//             <div>Options</div>
//           </div>
//         </div>
//       </header>

//       <section>
//         {displayedTransactions.length === 0 ? (
//           <div className="p-4 text-emerald-700 dark:text-emerald-200">
//             No transactions for the selected month
//           </div>
//         ) : (
//           displayedTransactions.map((tx) => (
//             <TransactionRow
//               key={tx.id}
//               transaction={tx}
//             />
//           ))
//         )}
//       </section>
//     </div>
//   );
// }

// export default TransactionsTableByMonth;
