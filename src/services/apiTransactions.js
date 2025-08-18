import supabase from "./supabase";

export async function getAllTransactions(user_id) {
  if (!user_id) throw new Error("User ID is required");
  const { data: transactions, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user_id)
    .order("date", { ascending: false });

  if (error) throw new Error("Get error: " + error.message);
  return { data: transactions };
}



export async function createTransaction(transaction, user_id) {
  //   // { description, amount, main_category, sub_category, date, type; }
  if (!user_id) throw new Error("User ID is required");

  const requiredFields = ["description", "amount", "main_category", "date", "type"];
  const missingFields = requiredFields.filter((field) => !transaction[field]);
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }

  const validatedTransaction = {
    ...transaction,
    user_id,
    amount: Number(transaction.amount), // Convert to number
    date: transaction.date || new Date().toISOString().split("T")[0], // Sets the current date if not specified.
  };

  const { error, data } = await supabase
    .from("transactions")
    .insert(validatedTransaction); // Simplify to the object

  if (error) throw new Error("Create error: " + error.message);
  return { data };
}

export async function updateTransactionApi(newTransaction, user_id) {
  if (!user_id) throw new Error("User ID is required");

  const { id, ...updateData } = newTransaction;
  if (!id) throw new Error("Transaction ID is required");

  const { error, data } = await supabase
    .from("transactions")
    .update(updateData)
    .eq("id", id)
    .eq("user_id", user_id)
    .select();

  if (error) throw new Error("Update error: " + error.message);

  return { data };
}

export async function deleteTransaction(id, user_id) {
  if (!user_id) throw new Error("User ID is required");
  const { error, count } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id)
    .eq("user_id", user_id); // Avoid accidentally deleting someone else's transaction


  if (error) throw new Error("Delete error: " + error.message);
  return { count };
}

export async function getTransactionsByFilter(filter = {}, user_id) {
  if (!user_id) throw new Error("User ID is required");

  let query = supabase.from("transactions").select("*").eq("user_id", user_id);

  // Apply each filter
  Object.entries(filter).forEach(([key, value]) => {

    if (key === "type" && value === "all") return; // Skip filter by type if "all"
    if (key === "user_id") return; // Ignore user_id from filter
    if (value !== undefined && value !== null && value !== "") {
      query = query.eq(key, value);
    }
  });

  const { data, error } = await query.order("date", { ascending: false });

  if (error) throw new Error("Filtered transactions error: " + error.message);

  return { data };
}

export async function getTransactionsByCategory(category) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not logged in");
  if (authError) throw new Error("Auth error: " + authError.message);

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id)
    .eq("main_category", category)
    .order("date", { ascending: false });

  if (error) throw new Error("Fetch error: " + error.message);

  return data;
}

// TEMPORARY UNUSED
// import { getMonthDateRange } from "../utils/dataRange";
// export async function getAllMonthTransactions(selectedMonth, user_id) {
//   if (!user_id) throw new Error("User ID is required");

//   const { fromDate, toDate } = getMonthDateRange(selectedMonth);

//   const { data: monthTransactions, error } = await supabase
//     .from("transactions")
//     .select("*")
//     .eq("user_id", user_id)
//     .in("type", ["income", "withdraw"])
//     .gte("date", fromDate)
//     .lte("date", toDate);

//   if (error) throw new Error("Month transaction error: " + error.message);

//   // return data;
//   return { data: monthTransactions };
// }