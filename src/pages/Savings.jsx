import { useNavigate } from "react-router-dom";

function Savings() {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-2xl font-semibold mb-4">
        Savings
      </h1>
      <p className="text-lg mb-6">
        This feature is currently under development.
      </p>
      <button
        onClick={() => navigate("/dashboard")}
        className="bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition"
      >
        Back to Dashboard
      </button>
    </div>
  );
}

export default Savings;
