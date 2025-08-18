import { FaSpinner } from "react-icons/fa";

function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <FaSpinner className="animate-spin text-emerald-600 text-4xl mb-4" />
      <p className="text-lg">{message}</p>
    </div>
  );
}

export default LoadingSpinner;
