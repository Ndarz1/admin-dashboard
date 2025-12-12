import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const SecuritySettings = () => {
  return (
    <div className="animate-fade-in-up">
      <h3 className="text-xl font-serif text-gray-900 mb-6">
        Security & Login
      </h3>

      <div className="flex flex-col gap-6 max-w-md ">
        <div className="group">
          <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
            Current Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-ruby-red-600 transition-colors"
          />
        </div>
        <div className="group">
          <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
            New Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-ruby-red-600 transition-colors"
          />
        </div>
        <div className="group">
          <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-ruby-red-600 transition-colors"
          />
        </div>

        <button
          onClick={() =>
            MySwal.fire({
              icon: "success",
              title: "Password Updated",
              confirmButtonColor: "#be123c",
            })
          }
          className="mt-4 bg-gray-900 text-white px-6 py-3 text-xs uppercase tracking-[0.2em] hover:bg-ruby-red-600 transition-colors shadow-lg self-start"
        >
          Update Password
        </button>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100">
        <h4 className="text-sm font-bold text-red-600 uppercase tracking-widest mb-2">
          Danger Zone
        </h4>
        <p className="text-xs text-gray-500 mb-4">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <button className="border border-red-200 text-red-500 px-6 py-2 text-xs uppercase tracking-widest hover:bg-red-50 transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default SecuritySettings;
