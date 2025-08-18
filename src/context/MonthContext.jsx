import { format, startOfMonth } from "date-fns";

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const MonthContext = createContext();
function MonthProvider({ children }) {
  const [selectedMonth, setSelectedMonth] = useState(
    format(startOfMonth(new Date()), "yyyy-MM")
  );

  const value = useMemo(
    () => ({ selectedMonth, setSelectedMonth }),
    [selectedMonth]
  );

  return (
    <MonthContext.Provider value={value}>
      {children}
    </MonthContext.Provider>
  );
}
export function useMonth() {
  const context = useContext(MonthContext);
  if (!context) {
    throw new Error(
      "useMonth must be used within MonthProvider"
    );
  }
  return context;
}
export default MonthProvider;
