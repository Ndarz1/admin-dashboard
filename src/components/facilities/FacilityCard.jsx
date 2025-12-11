import React from "react";

const FacilityCard = ({ item, onEdit, onDelete }) => {
  // Helper Ikon (Dipindah ke sini agar rapi)
  const renderIcon = (type) => {
    switch (type) {
      case "video":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        );
      case "board":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
          />
        );
      case "speaker":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
        );
      case "chair":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        );
      default: // Electronic / AC
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        );
    }
  };

  return (
    <div className="group bg-white border border-gray-100 p-8 flex flex-col items-center text-center hover:shadow-xl hover:border-ruby-red-600/20 transition-all duration-500 relative overflow-hidden">
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors duration-500 ${
          item.condition === "Good"
            ? "bg-gray-50 text-gray-800 group-hover:bg-ruby-red-50 group-hover:text-ruby-red-600"
            : "bg-red-50 text-red-600"
        }`}
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {renderIcon(item.icon)}
        </svg>
      </div>

      <h3 className="font-serif text-xl text-gray-900 mb-1">{item.name}</h3>
      <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">
        {item.category}
      </p>

      <div className="flex items-center gap-4 text-sm w-full justify-center border-t border-gray-50 pt-4 mt-auto">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">
            Stock
          </span>
          <span className="font-bold text-gray-800">{item.stock}</span>
        </div>
        <div className="w-[1px] h-8 bg-gray-100"></div>
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">
            Status
          </span>
          <span
            className={`font-bold ${item.condition === "Good" ? "text-green-600" : "text-red-500"}`}
          >
            {item.condition}
          </span>
        </div>
      </div>

      {/* Hover Actions */}
      <div className="absolute inset-0 bg-white/90 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => onEdit(item)}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="w-10 h-10 rounded-full border border-red-200 flex items-center justify-center text-red-500 hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FacilityCard;
