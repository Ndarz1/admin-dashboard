import React from "react";
import { X, User, Mail, Briefcase, Calendar, Hash, MapPin } from "lucide-react";

const UserProfileModal = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 fade-in">
      <div className="bg-white w-full max-w-lg shadow-2xl relative border-t-4 border-ruby-red-600 overflow-hidden">
        {/* Header Background */}
        <div className="h-24 bg-gray-50 border-b border-gray-100 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 bg-white p-1 rounded-full shadow-sm"
          >
            <X size={20} />
          </button>
        </div>

        {/* Profile Content */}
        <div className="px-8 pb-8 -mt-12 relative">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gray-900 text-white rounded-full flex items-center justify-center font-serif text-3xl shadow-xl border-4 border-white">
              {user.avatar}
            </div>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-serif text-gray-900">{user.name}</h3>
            <span
              className={`inline-block px-3 py-1 mt-2 text-[10px] uppercase tracking-widest font-bold rounded-full ${
                user.status === "Active"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {user.status}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-4 p-3 border border-gray-100 hover:border-ruby-red-600/30 transition-colors bg-gray-50/50">
              <div className="p-2 bg-white text-ruby-red-600 shadow-sm">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400">
                  Email Address
                </p>
                <p className="text-sm font-medium text-gray-800">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1 flex items-center gap-4 p-3 border border-gray-100 hover:border-ruby-red-600/30 transition-colors bg-gray-50/50">
                <div className="p-2 bg-white text-ruby-red-600 shadow-sm">
                  <Briefcase size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">
                    Role
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    {user.role}
                  </p>
                </div>
              </div>
              <div className="flex-1 flex items-center gap-4 p-3 border border-gray-100 hover:border-ruby-red-600/30 transition-colors bg-gray-50/50">
                <div className="p-2 bg-white text-ruby-red-600 shadow-sm">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">
                    Department
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    {user.department}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 border border-gray-100 hover:border-ruby-red-600/30 transition-colors bg-gray-50/50">
              <div className="p-2 bg-white text-ruby-red-600 shadow-sm">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400">
                  Joined Date
                </p>
                <p className="text-sm font-medium text-gray-800">
                  {user.joined_at
                    ? new Date(user.joined_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "-"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={onClose}
              className="w-full py-3 text-xs uppercase tracking-[0.2em] bg-gray-900 text-white hover:bg-ruby-red-600 transition-colors shadow-lg"
            >
              Close Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
