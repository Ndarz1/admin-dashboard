import React from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2, MapPin, Users } from "lucide-react";

const RoomCard = ({ room, onDelete }) => {
  // Status Badge Logic
  const getStatusStyle = (status) => {
    switch (status) {
      case "available":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "maintenance":
        return "bg-red-50 text-red-700 border-red-100";
      default: // booked
        return "bg-gray-100 text-gray-500 border-gray-200";
    }
  };

  return (
    <div className="group bg-white border border-gray-100 hover:border-[#967D69]/30 transition-all duration-500 flex flex-col h-full hover:shadow-xl hover:shadow-[#967D69]/5">
      {/* IMAGE SECTION */}
      <div className="relative h-64 overflow-hidden w-full">
        {/* Badge Status */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className={`px-3 py-1 text-[10px] uppercase tracking-[0.15em] font-medium border ${getStatusStyle(
              room.status
            )}`}
          >
            {room.status}
          </span>
        </div>

        {/* Image with Zoom Effect */}
        {room.image ? (
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 font-serif italic">
            No Image Available
          </div>
        )}

        {/* Overlay Actions (Muncul saat hover) */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4 backdrop-blur-[2px]">
          <Link
            to={`/rooms/edit/${room.id}`}
            className="w-10 h-10 bg-white text-gray-900 flex items-center justify-center hover:bg-[#967D69] hover:text-white transition-colors duration-300 rounded-sm"
            title="Edit Room"
          >
            <Edit size={16} />
          </Link>
          <button
            onClick={() => onDelete(room.id)}
            className="w-10 h-10 bg-white text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors duration-300 rounded-sm"
            title="Delete Room"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="p-6 flex flex-col flex-1 text-center">
        {/* Category */}
        <p className="text-[10px] font-bold text-[#967D69] uppercase tracking-[0.25em] mb-2">
          {room.category}
        </p>

        {/* Title */}
        <h3 className="font-serif text-xl text-gray-900 mb-4 group-hover:text-[#967D69] transition-colors duration-300 line-clamp-1">
          {room.name}
        </h3>

        {/* Separator Line */}
        <div className="w-8 h-[1px] bg-gray-200 mx-auto mb-5 group-hover:w-16 group-hover:bg-[#967D69] transition-all duration-500"></div>

        {/* Details (Capacity & Location) */}
        <div className="flex justify-center items-center gap-6 text-gray-500 text-xs font-medium uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <Users size={14} className="text-gray-400" />
            <span>{room.capacity} Pax</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-gray-400" />
            <span className="truncate max-w-[120px]" title={room.location}>
              {room.location}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
