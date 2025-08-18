import { Routes, Route } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Dashboard from "../src/pages/Dashboard";
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";

import Settings from "../src/pages/Settings";
import Layout from "./ui/Layout";
import PrivateRoute from "./components/PrivateRoute";
import AuthProvider from "./context/AuthContext";
import ModalProvider from "./context/ModalContext";
import Transactions from "./pages/Transactions";
import Modal from "./components/Modal";
import MonthProvider from "./context/MonthContext";
import CategoryDetailsPage from "./features/transactions/CategoryDetailsPage";
import NotFound from "./pages/NotFound";
import Savings from "./pages/Savings";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModalProvider>
          <MonthProvider>
            <Routes>
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Layout />
                  </PrivateRoute>
                }
              >
                {/* by default renders Dashboard */}
                <Route
                  index
                  element={<Dashboard />}
                />
                <Route
                  path="dashboard"
                  element={<Dashboard />}
                />
                <Route
                  path="transactions"
                  element={<Transactions />}
                />
                <Route
                  path="transactions/category/:category"
                  element={<CategoryDetailsPage />}
                />
                <Route
                  path="savings"
                  element={<Savings />}
                />
                <Route
                  path="settings"
                  element={<Settings />}
                />
                <Route
                  path="*"
                  element={<NotFound />}
                />{" "}
                {/* Handling non-existent nested paths */}
              </Route>
              <Route
                path="*"
                element={<NotFound />}
              />{" "}
              {/* Handling root non-existent paths */}
            </Routes>
            <Modal />
          </MonthProvider>
        </ModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
