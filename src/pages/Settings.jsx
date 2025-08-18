import toast from "react-hot-toast";
import { insertDemoTransactions } from "../services/insertDemoData";

function Settings() {
  const handleLoadDemo = async () => {
    try {
      await insertDemoTransactions();
      toast("Demo data loaded successfully ✅");
    } catch (err) {
      toast("Loading error: " + err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        ⚙️ Settings
      </h1>

      {/* Upload demo data */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          🧪 Demo-data
        </h2>
        <button
          onClick={handleLoadDemo}
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition cursor-pointer"
        >
          Load demo-transaction
        </button>
      </section>

      {/* Extra settings*/}
    </div>
  );
}

export default Settings;
