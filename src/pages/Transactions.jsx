import TransactionsTable from "../features/transactions/TransactionsTable";
import Modal from "../components/Modal";
import AddTransactionButton from "../features/transactions/AddTransactionButton";

function Transactions() {
  return (
    <div>
      <AddTransactionButton />
      <Modal />
      <TransactionsTable />
    </div>
  );
}

export default Transactions;
