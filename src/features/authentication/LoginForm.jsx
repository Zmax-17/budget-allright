import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FiEye,
  FiEyeOff,
  FiMail,
  FiLock,
} from "react-icons/fi";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.message || "Login failed");
    }
  };

  const handleDemoLogin = async () => {
    try {
      await login("demo@budgetallright.com", "demo123");
      navigate("/dashboard");
    } catch (err) {
      toast.error(
        "Demo login failed",
        err?.message || "Please try again"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5 bg-white p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center text-emerald-800">
          Sign in
        </h2>

        {/* Email */}
        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        {/* Password */}
        <div className="relative">
          <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition"
        >
          Sign in
        </button>

        {/* Footer */}
        <div className="text-sm flex justify-between text-emerald-700">
          <a
            href="#"
            className="hover:underline"
          >
            Forgot password?
          </a>
          <a
            href="/signup"
            className="hover:underline"
          >
            Sign up
          </a>
        </div>

        {/* Demo login */}
        <div className="pt-4 text-center">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="text-sm text-blue-600 underline hover:text-blue-800"
          >
            Login as demo user
          </button>
          <p className="mt-1 text-xs text-gray-500">
            newtest@test.com test1234
          </p>
          <p className="mt-1 text-xs text-gray-500">
            demo@budgetallright.com demo1234
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
