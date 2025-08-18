import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

// Icons
import {
  FiEye,
  FiEyeOff,
  FiMail,
  FiLock,
} from "react-icons/fi";

function Signup() {
  const { signup } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async ({ email, password }) => {
    try {
      await signup(email, password);
      toast.success(
        "Check your email to confirm registration."
      );
      reset();
    } catch (err) {
      toast.error(
        err?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-5 bg-white p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center text-emerald-800">
          Sign up
        </h2>

        {/* Email */}
        <div>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                  message: "Invalid email format",
                },
              })}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Minimum 8 characters",
                },
              })}
              className="w-full pl-10 pr-10 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password ||
                  "Passwords do not match",
              })}
              className="w-full pl-10 pr-10 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="button"
              onClick={() =>
                setShowConfirm((prev) => !prev)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600"
            >
              {showConfirm ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition disabled:opacity-60"
        >
          {isSubmitting ? "Signing up..." : "Sign up"}
        </button>

        <p className="text-center text-sm text-emerald-700">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-emerald-800 underline"
          >
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
