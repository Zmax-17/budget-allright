import { useNavigate, useParams } from "react-router-dom";
import { useTransactionsByCategory } from "./useTransactionsByCategory";
import {
  CATEGORY_COLORS,
  SUB_CATEGORY_COLORS,
} from "../categories/categories";

import { FiArrowLeft } from "react-icons/fi";
function CategoryDetailsPage() {
  const navigate = useNavigate();
  const { category } = useParams();
  const { transactions, isLoading, error } =
    useTransactionsByCategory(category);

  if (isLoading)
    return (
      <p className="text-center text-lg">Loading...</p>
    );
  if (error)
    return (
      <p className="text-center text-red-500">
        An error has occurred: {error.message}
      </p>
    );

  // Get category color
  const categoryColor =
    CATEGORY_COLORS[category] || "#BDC3C7"; // Default to "Uncategorized" color if not found

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <button
        onClick={() => navigate("/transactions")}
        className="bg-white text-emerald-500 font-bold p-2 rounded-xl cursor-pointer hover:bg-emerald-600 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-emerald-900 active:text-white active:bg-emerald-700 active:translate-y-0.5 transition-colors duration-200 inline-flex items-center"
      >
        <FiArrowLeft className="mr-2 text-lg" />
        Back to Transactions
      </button>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Transactions in category:{" "}
        <span
          className="font-semibold"
          style={{ color: categoryColor }} // Inline style for category color
        >
          {category}
        </span>
      </h2>
      <ul className="space-y-4">
        {transactions.map((t) => {
          // Get sub-category color
          const subCategoryColor =
            SUB_CATEGORY_COLORS[t.sub_category] ||
            categoryColor; // Default to category color if not found
          return (
            <li
              key={t.id}
              style={{
                backgroundColor: `${subCategoryColor}20`, // Lightened background color for sub-category
                borderLeft: `4px solid ${subCategoryColor}`, // Border color for sub-category
              }}
              className="p-4 rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-semibold">
                  {t.description}
                </span>
                <span
                  className={
                    t.type === "income"
                      ? "text-green-600 text-xl font-bold"
                      : "text-red-600 text-xl font-bold"
                  }
                >
                  {t.amount} kr
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {t.date}
              </div>
              <div className="text-sm text-gray-500">
                {t.sub_category}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CategoryDetailsPage;
