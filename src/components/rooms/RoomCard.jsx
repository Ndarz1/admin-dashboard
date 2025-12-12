import React from "react";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-900/40 border border-green-500/30";
      case "Maintenance":
        return "bg-red-900/40 border border-red-500/30";
      default: // In Use
        return "bg-black/40 border border-white/30";
    }
  };

  return (
    <div className="group flex flex-col bg-white cursor-pointer">
      <div className="relative h-[22rem] overflow-hidden w-full">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
        />

        <div className="absolute top-6 left-6">
          <span
            className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-md ${getStatusClass(room.status)}`}
          >
            {room.status}
          </span>
        </div>

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <button className="bg-white text-black px-8 py-3 text-xs uppercase tracking-widest hover:bg-ruby-red-600 hover:text-white transition-colors duration-300 transform translate-y-4 group-hover:translate-y-0 duration-500">
            View Details
          </button>
        </div>
      </div>

      <div className="pt-6 text-center px-4">
        <p className="text-[10px] font-bold text-ruby-red-600 uppercase tracking-[0.25em] mb-3">
          {room.type}
        </p>
        <h3 className="font-serif text-2xl text-gray-900 mb-2 group-hover:text-ruby-red-600 transition-colors duration-300">
          {room.name}
        </h3>
        <div className="w-8 h-[1px] bg-gray-300 mx-auto my-4 group-hover:w-16 transition-all duration-500"></div>

        <div className="flex justify-center items-center gap-6 text-gray-500 text-sm font-light">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>{room.capacity} Pax</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span className="truncate max-w-[150px]">{room.location}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
        <Link
          to={`/rooms/edit/${room.id}`}
          className="text-xs uppercase tracking-wider text-gray-400 hover:text-gray-900 border-b border-transparent hover:border-gray-900 pb-1 transition-all"
        >
          Edit Room
        </Link>
        <button className="text-xs uppercase tracking-wider text-red-400 hover:text-red-700 border-b border-transparent hover:border-red-700 pb-1 transition-all">
          Remove
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
