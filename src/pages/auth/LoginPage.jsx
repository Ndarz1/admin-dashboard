import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (json.success) {
        if (json.user.role !== "admin" && json.user.role !== "Admin") {
          toast.error("Access Denied: You do not have admin privileges.");
          setIsLoading(false);
          return;
        }

        toast.success("Welcome back, Administrator!");

        localStorage.setItem("authToken", json.token);
        localStorage.setItem("userRole", json.user.role);
        localStorage.setItem("userName", json.user.name);

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast.error(json.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Cannot connect to server. Is backend running?");
    } finally {
      if (!localStorage.getItem("authToken")) {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex h-screen w-full bg-white font-sans overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="hidden lg:flex w-1/2 relative bg-gray-900">
        <img
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1920&auto=format&fit=crop"
          alt="Campus Building"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 p-16 flex flex-col justify-between h-full text-white">
          <h1 className="text-4xl font-serif font-bold tracking-widest">SRR</h1>
          <div>
            <h2 className="text-5xl font-serif mb-6 leading-tight">
              Excellence in <br /> Every Space.
            </h2>
            <p className="text-sm uppercase tracking-[0.2em] opacity-80">
              Smart Room Reservation System
            </p>
          </div>
          <div className="text-xs opacity-50">
            © 2025 Ahmad Dahlan University. All Rights Reserved.
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-24 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-12">
            <h3 className="text-3xl font-serif text-gray-900 mb-2">
              Welcome Back
            </h3>
            <p className="text-gray-500 text-sm font-light">
              Please sign in to access your admin dashboard.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <div className="group">
              <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
                Email Address
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                className="w-full border-b border-gray-300 py-3 text-lg text-gray-900 focus:outline-none focus:border-[#967D69] transition-colors placeholder:text-gray-200"
                placeholder="admin@uad.ac.id"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="group">
              <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
                Password
              </label>
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                className="w-full border-b border-gray-300 py-3 text-lg text-gray-900 focus:outline-none focus:border-[#967D69] transition-colors placeholder:text-gray-200"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-gray-500 hover:text-gray-900">
                <input type="checkbox" className="accent-[#967D69]" />
                <span>Remember me</span>
              </label>
              <a
                href="#"
                className="text-[#967D69] hover:text-gray-900 transition-colors border-b border-transparent hover:border-gray-900 pb-0.5"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 bg-gray-900 text-white py-4 text-xs uppercase tracking-[0.25em] hover:bg-[#967D69] transition-all duration-500 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-3"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
