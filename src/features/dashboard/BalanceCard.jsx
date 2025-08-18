import { format } from "date-fns";
import {
  FaArrowCircleDown,
  FaArrowCircleUp,
} from "react-icons/fa";

import { TbMoneybag } from "react-icons/tb";

function BalanceCard({
  balance,
  income,
  withdraw,
  selectedMonth,
}) {
  console.log(selectedMonth);
  const formattedMonth = format(
    new Date(selectedMonth),
    "MMMM"
  ); // return "May"

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("no-NO", {
      style: "currency",
      currency: "NOK",
    }).format(value);
  };
  return (
    <div className="container-sm flex flex-wrap justify-center gap-4">
      {/* Month central card */}
      <div className="w-full flex justify-center mb-6">
        <h3 className="text-2xl font-bold text-center text-white bg-gradient-to-r from-green-300 via-emerald-500 to-emerald-800  p-4 rounded-xl shadow-lg transition-all duration-300 ease-in-out">
          {formattedMonth} {/* For example May */}
        </h3>
      </div>
      {/* Balance */}
      <div className=" bg-white rounded-2xl shadow-lg p-6 min-w-[200px] max-w-md space-y-4">
        <p className="flex items-center gap-2 transition-all duration-300">
          <TbMoneybag className="text-yellow-700 text-xl" />
          <span>Balance:</span> {formatCurrency(balance)}
        </p>
      </div>
      {/* Income */}
      <div className="bg-emerald-200 rounded-2xl shadow-lg p-6 min-w-[200px] max-w-md space-y-4 flex flex-wrap gap-4 justify-between">
        <p className="flex items-center gap-2 transition-all duration-300">
          <FaArrowCircleUp className="text-green-600 text-xl" />
          <span>Income:</span> {formatCurrency(income)}
        </p>
      </div>
      {/* Withdraw */}
      <div className="bg-red-300 rounded-2xl shadow-lg p-6 min-w-[200px] max-w-md space-y-4 flex flex-wrap gap-4 justify-between">
        <p className="flex items-center gap-2 transition-all duration-300">
          <FaArrowCircleDown className="text-red-600 text-xl" />
          <span>Withdraw:</span>
          {formatCurrency(withdraw)}
        </p>
      </div>
    </div>
  );
}

export default BalanceCard;
