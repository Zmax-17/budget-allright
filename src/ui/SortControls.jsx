import { FaSort } from "react-icons/fa";
import { HiArrowUp, HiArrowDown } from "react-icons/hi";

function SortControls({ sortConfig, setSortConfig }) {
  const sortButtons = [
    {
      icon: <FaSort />,
      title: "Default",
      config: { key: null, direction: null },
      isActive: sortConfig.key === null,
    },
    {
      icon: <HiArrowUp />,
      title: "Sort Ascending",
      config: { key: "withdraw", direction: "asc" },
      isActive: sortConfig.direction === "asc",
    },
    {
      icon: <HiArrowDown />,
      title: "Sort Descending",
      config: { key: "withdraw", direction: "desc" },
      isActive: sortConfig.direction === "desc",
    },
  ];

  return (
    <div className="w-fit sm:w-fit rounded-sm flex gap-2 m-2 border border-emerald-100 flex-wrap">
      {sortButtons.map(
        ({ icon, title, config, isActive }, index) => (
          <button
            key={index}
            className={`p-2 rounded-sm cursor-pointer disabled:cursor-not-allowed hover:bg-emerald-800 active:text-white transition duration-200 ${
              isActive
                ? "bg-emerald-600 text-white"
                : "bg-transparent text-emerald-600"
            }`}
            onClick={() => setSortConfig(config)}
            title={title}
          >
            {icon}
          </button>
        )
      )}
    </div>
  );
}

export default SortControls;
