import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  return (
    <div className="@container">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default Layout;
