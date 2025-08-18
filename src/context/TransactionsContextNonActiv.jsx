// import { createContext, useContext, useState } from "react";

// const TransactionsContext = createContext(null);
// function TransactionsProvider({ children }) {
//   const [transaction, setTransaction] = useState([]);

//   const addTransaction = (title, amount, type) => {
//     return setTransaction(title, amount, type);
//   };
//   const delTransaction = () => setTransaction([]);

//   return (
//     <TransactionsContext.Provider
//       value={{
//         transaction,
//         addTransaction,
//         delTransaction,
//       }}
//     >
//       {children}
//     </TransactionsContext.Provider>
//   );
// }

// export default TransactionsContext;
// export function useTransactions() {
//   return useContext(TransactionsContext);
// }
