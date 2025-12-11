import React from "react";

const RoomAmenitiesSection = ({ facilities, onToggle }) => {
  const options = [
    "AC",
    "Projector",
    "Whiteboard",
    "Smart TV",
    "Sound System",
    "Video Conf",
    "PC Workstation",
    "High-Speed WiFi",
  ];

  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">
        Amenities
      </label>
      <div className="grid grid-cols-2 gap-3">
        {options.map((facility) => (
          <div
            key={facility}
            onClick={() => onToggle(facility)}
            className={`cursor-pointer px-3 py-2 text-xs border transition-all duration-300 flex items-center gap-2 ${
              facilities.includes(facility)
                ? "border-ruby-red-600 bg-ruby-red-50 text-ruby-red-800"
                : "border-gray-200 text-gray-500 hover:border-gray-400"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                facilities.includes(facility)
                  ? "bg-ruby-red-600"
                  : "bg-gray-300"
              }`}
            ></div>
            {facility}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomAmenitiesSection;
