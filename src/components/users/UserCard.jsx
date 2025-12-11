import React from "react";

const UserCard = ({ user, onDelete }) => {
  return (
    <div className="group bg-white border border-gray-100 p-8 flex flex-col items-center text-center hover:shadow-xl hover:border-ruby-red-600/20 transition-all duration-500 relative overflow-hidden">
      {/* Status Dot */}
      <div className="absolute top-4 right-4">
        <span
          className={`w-2 h-2 rounded-full inline-block ${
            user.status === "Active" ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
      </div>

      {/* Avatar */}
      <div className="w-20 h-20 bg-gray-900 text-white rounded-full flex items-center justify-center font-serif text-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500">
        {user.avatar}
      </div>

      {/* Info */}
      <h3 className="font-serif text-xl text-gray-900 mb-1">{user.name}</h3>
      <p className="text-xs uppercase tracking-widest text-ruby-red-600 mb-4">
        {user.role}
      </p>

      <div className="w-full border-t border-gray-50 pt-4 mt-2">
        <p className="text-sm text-gray-600 mb-1">{user.department}</p>
        <p className="text-xs text-gray-400 italic">{user.email}</p>
      </div>

      {/* Action Buttons (Slide Up Effect) */}
      <div className="absolute inset-x-0 bottom-0 bg-gray-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex border-t border-gray-100">
        <button className="flex-1 py-3 text-xs uppercase tracking-widest text-gray-500 hover:text-gray-900 hover:bg-white transition-colors">
          View Profile
        </button>
        <div className="w-[1px] bg-gray-200"></div>
        <button
          onClick={() => onDelete(user.id)}
          className="flex-1 py-3 text-xs uppercase tracking-widest text-red-400 hover:text-red-700 hover:bg-white transition-colors"
        >
          {user.status === "Active" ? "Suspend" : "Activate"}
        </button>
      </div>
    </div>
  );
};

export default UserCard;
