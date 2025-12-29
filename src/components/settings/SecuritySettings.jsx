import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const SecuritySettings = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic integrasi API akan disini nanti
    MySwal.fire({
      icon: "success",
      title: "Password Updated",
      text: "Your security credentials have been successfully changed.",
      confirmButtonColor: "#be123c",
    });
  };

  return (
    <div className="animate-fade-in-up">
      <h3 className="text-xl font-serif text-gray-900 mb-6">
        Login & Security
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
        <div className="group relative">
          <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
            Current Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-ruby-red-600 transition-colors font-sans tracking-wide"
            placeholder="••••••••"
          />
        </div>

        <div className="group relative">
          <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
            New Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-ruby-red-600 transition-colors font-sans tracking-wide"
            placeholder="Minimum 8 characters"
          />
        </div>

        <div className="group relative">
          <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
            Confirm New Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-ruby-red-600 transition-colors font-sans tracking-wide"
            placeholder="Re-enter new password"
          />
        </div>

        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            id="showPass"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="rounded border-gray-300 text-ruby-red-600 focus:ring-ruby-red-500"
          />
          <label
            htmlFor="showPass"
            className="text-xs text-gray-500 cursor-pointer select-none"
          >
            Show Passwords
          </label>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="bg-gray-900 text-white px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-ruby-red-600 transition-colors shadow-lg"
          >
            Update Password
          </button>
        </div>
      </form>

      <div className="mt-12 border-t border-gray-100 pt-8">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-serif text-gray-900 font-bold">
              Two-Factor Authentication (2FA)
            </h4>
            <p className="text-xs text-gray-500 mt-1 max-w-md leading-relaxed">
              Add an extra layer of security to your account by requiring a code
              from your phone in addition to your password.
            </p>
          </div>
          <button
            onClick={() =>
              MySwal.fire({
                title: "Coming Soon",
                text: "2FA configuration will be available in the next update.",
                icon: "info",
                confirmButtonColor: "#be123c",
              })
            }
            className="text-xs border border-gray-300 px-4 py-2 uppercase tracking-widest hover:border-gray-900 hover:bg-gray-50 transition-all"
          >
            Enable 2FA
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
