import { parse, startOfMonth, endOfMonth, format } from "date-fns";

// Gets the start and end date of the month based on the string "yyyy-MM" for ex "2025-05"
export function getMonthDateRange(selectedMonth) {
  const parsedDate = parse(selectedMonth, "yyyy-MM", new Date());
  const fromDate = format(startOfMonth(parsedDate), "yyyy-MM-dd");
  const toDate = format(endOfMonth(parsedDate), "yyyy-MM-dd");

  return { fromDate, toDate };
}
