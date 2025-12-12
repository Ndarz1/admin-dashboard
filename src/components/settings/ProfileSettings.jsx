import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ProfileSettings = () => {
  return (
    <div className="animate-fade-in-up">
      <h3 className="text-xl font-serif text-gray-900 mb-6">General Profile</h3>

      <div className="flex items-center gap-6 mb-8">
        <div className="w-24 h-24 rounded-full bg-gray-200 border-2 border-white shadow-md overflow-hidden relative group cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Admin"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 hidden group-hover:flex items-center justify-center text-white text-xs uppercase tracking-widest">
            Change
          </div>
        </div>
        <div>
          <h4 className="font-serif text-lg">Admin User</h4>
          <p className="text-xs text-gray-500 uppercase tracking-widest">
            Super Administrator
          </p>
          <button className="mt-2 text-xs text-ruby-red-600 hover:text-gray-900 border-b border-ruby-red-600 pb-0.5 hover:border-gray-900 transition-all">
            Upload New Picture
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="group">
          <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
            Full Name
          </label>
          <input
            type="text"
            defaultValue="Ahmad Dahlan"
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-ruby-red-600 transition-colors font-serif"
          />
        </div>
        <div className="group">
          <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
            Email Address
          </label>
          <input
            type="email"
            defaultValue="admin@uad.ac.id"
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-ruby-red-600 transition-colors"
          />
        </div>
        <div className="group">
          <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
            Phone Number
          </label>
          <input
            type="text"
            defaultValue="+62 812 3456 7890"
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-ruby-red-600 transition-colors"
          />
        </div>
        <div className="group">
          <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
            Department
          </label>
          <input
            type="text"
            defaultValue="IT Center"
            disabled
            className="w-full border-b border-gray-200 py-2 text-gray-400 bg-transparent cursor-not-allowed"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={() =>
            MySwal.fire({
              icon: "success",
              title: "Profile Updated",
              confirmButtonColor: "#be123c",
              timer: 1500,
            })
          }
          className="bg-gray-900 text-white px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-ruby-red-600 transition-colors shadow-lg"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
