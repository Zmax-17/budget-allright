import { useForm } from "react-hook-form";
import { useAddTransaction } from "./useAddTransaction";
import { useUpdateTransaction } from "./useUpdateTransaction";
import { useModal } from "../../context/ModalContext";
import { useEffect } from "react";
import { format } from "date-fns";
import { categories } from "../categories/categories";

function TransactionForm({ transaction }) {
  const { closeModal } = useModal();
  const isEdit = Boolean(transaction?.id);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: transaction
      ? {
          amount: transaction.amount ?? "",
          description: transaction.description || "",
          main_category: transaction.main_category || "",
          sub_category: transaction.sub_category || "",
          date: transaction.date
            ? format(
                new Date(transaction.date),
                "yyyy-MM-dd"
              )
            : "",
          type: transaction.type || "",
        }
      : {},
  });

  useEffect(() => {
    if (transaction?.id) {
      reset({
        amount: transaction.amount ?? "",
        description: transaction.description || "",
        main_category: transaction.main_category || "",
        sub_category: transaction.sub_category || "",
        date: transaction.date
          ? format(new Date(transaction.date), "yyyy-MM-dd")
          : "",
        type: transaction.type || "",
      });
    }
  }, [transaction, reset]);

  const mainCategory = watch("main_category");
  const { isAdding, addTransaction } = useAddTransaction();
  const { isUpdating, updateTransaction } =
    useUpdateTransaction();

  const onSubmit = (data) => {
    const submitData = {
      ...data,
      amount: Number(data.amount),
    };
    if (isEdit && transaction?.id) {
      updateTransaction({
        ...submitData,
        id: transaction.id,
      });
    } else {
      addTransaction(submitData);
    }
    closeModal();
  };

  const labelCls =
    "block text-xs sm:text-sm lg:text-base min-[3840px]:text-lg font-medium text-gray-700 mb-1 sm:mb-1.5 lg:mb-2";
  const inputCls =
    "w-full border border-gray-300 rounded-md px-3 py-2 sm:py-2.5 lg:py-3 min-[3840px]:py-4 " +
    "text-sm sm:text-base lg:text-lg min-[3840px]:text-xl bg-white placeholder-gray-400 " +
    "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 " +
    "min-h-[42px] sm:min-h-[44px] lg:min-h-[48px] min-[3840px]:min-h-[56px]";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      role="form"
      aria-labelledby="transaction-form-title"
      className="
        bg-white shadow-lg w-full
        rounded-xl sm:rounded-2xl
        max-h-[85vh] overflow-y-auto
        p-4 sm:p-6 lg:p-8 xl:p-10 min-[3840px]:p-14
        max-w-[92vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl
        min-[2560px]:max-w-[1100px] min-[3840px]:max-w-[1400px]
      "
    >
      <h2
        id="transaction-form-title"
        className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl min-[3840px]:text-4xl font-semibold text-gray-800 mb-2 sm:mb-4"
      >
        {isEdit ? "Edit Transaction" : "Add Transaction"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 sm:gap-y-6 gap-x-4 sm:gap-x-6 lg:gap-x-8">
        <div className="col-span-1 md:col-span-2">
          <label className={labelCls}>Title</label>
          <input
            type="text"
            autoFocus
            {...register("description", {
              required: "Title required",
            })}
            className={inputCls}
          />
          {errors.description && (
            <p className="text-red-500 text-xs">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="col-span-1">
          <label className={labelCls}>Amount</label>
          <input
            type="number"
            inputMode="decimal"
            step="0.1"
            {...register("amount", {
              required: "Amount required",
              valueAsNumber: true,
            })}
            className={inputCls}
          />
          {errors.amount && (
            <p className="text-red-500 text-xs">
              {errors.amount.message}
            </p>
          )}
        </div>

        <div className="col-span-1">
          <label className={labelCls}>Type</label>
          <select
            {...register("type", {
              required: "Select type",
            })}
            className={inputCls}
          >
            <option value="">-- Select --</option>
            <option value="income">Income</option>
            <option value="withdraw">Withdraw</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-xs">
              {errors.type.message}
            </p>
          )}
        </div>

        <div className="col-span-1">
          <label className={labelCls}>Main Category</label>
          <select
            {...register("main_category", {
              required: "Select main category",
            })}
            onChange={(e) => {
              setValue("main_category", e.target.value);
              setValue("sub_category", ""); // Reset subcategory
            }}
            className={inputCls}
          >
            <option value="">-- Select --</option>
            {Object.keys(categories).map((main) => (
              <option
                key={main}
                value={main}
              >
                {main}
              </option>
            ))}
          </select>
          {errors.main_category && (
            <p className="text-red-500 text-xs">
              {errors.main_category.message}
            </p>
          )}
        </div>

        {mainCategory && (
          <div className="col-span-1">
            <label className={labelCls}>Sub Category</label>
            <select
              {...register("sub_category")}
              className={inputCls}
            >
              <option value="">
                {(categories[mainCategory]?.length ?? 0) > 0
                  ? "-- Select --"
                  : "No subcategories"}
              </option>
              {(categories[mainCategory] || []).map(
                (sub) => (
                  <option
                    key={sub}
                    value={sub}
                  >
                    {sub}
                  </option>
                )
              )}
            </select>
          </div>
        )}

        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <label className={labelCls}>Date</label>
          <input
            type="date"
            {...register("date", {
              required: "Date required",
            })}
            className={inputCls}
          />
          {errors.date && (
            <p className="text-red-500 text-xs">
              {errors.date.message}
            </p>
          )}
        </div>

        <div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            disabled={isAdding || isUpdating}
            aria-disabled={isAdding || isUpdating}
            className="
              w-full sm:flex-1 bg-emerald-600 text-white
              py-2.5 sm:py-3 lg:py-4 min-[3840px]:py-5
              rounded-md hover:bg-emerald-700 transition font-semibold
              disabled:opacity-70 disabled:cursor-not-allowed
            "
          >
            {isAdding && "Adding..."}
            {isUpdating && "Editing..."}
            {!isAdding &&
              !isUpdating &&
              (isEdit ? "Edit" : "Add")}
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              closeModal();
            }}
            className="
              w-full sm:flex-1 text-emerald-700 border border-emerald-600
              py-2.5 sm:py-3 lg:py-4 min-[3840px]:py-5
              rounded-md hover:bg-emerald-700 hover:text-white
              transition font-semibold
            "
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default TransactionForm;
