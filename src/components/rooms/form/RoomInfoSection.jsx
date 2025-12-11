import React from "react";

const RoomInfoSection = ({ formData, onChange }) => {
  return (
    <div className="flex-1 flex flex-col gap-8">
      <div className="group">
        <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2 group-focus-within:text-ruby-red-600 transition-colors">
          Room Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          className="w-full bg-transparent border-b border-gray-300 py-3 text-xl font-serif text-gray-900 focus:outline-none focus:border-ruby-red-600 transition-colors placeholder:text-gray-300"
          placeholder="e.g. Grand Laboratory One"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 group">
          <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2 group-focus-within:text-ruby-red-600 transition-colors">
            Category
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={onChange}
            className="w-full bg-transparent border-b border-gray-300 py-3 text-base text-gray-700 focus:outline-none focus:border-ruby-red-600 transition-colors cursor-pointer"
          >
            <option value="Laboratorium">Laboratorium</option>
            <option value="Meeting Room">Meeting Room</option>
            <option value="Aula">Aula</option>
            <option value="Kelas">Classroom</option>
          </select>
        </div>

        <div className="flex-1 group">
          <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2 group-focus-within:text-ruby-red-600 transition-colors">
            Capacity (Pax)
          </label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={onChange}
            className="w-full bg-transparent border-b border-gray-300 py-3 text-base text-gray-900 focus:outline-none focus:border-ruby-red-600 transition-colors"
            placeholder="0"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-[2] group">
          <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2 group-focus-within:text-ruby-red-600 transition-colors">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={onChange}
            className="w-full bg-transparent border-b border-gray-300 py-3 text-base text-gray-900 focus:outline-none focus:border-ruby-red-600 transition-colors placeholder:text-gray-300"
            placeholder="e.g. Building A, 2nd Floor"
          />
        </div>

        <div className="flex-1 group">
          <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2 group-focus-within:text-ruby-red-600 transition-colors">
            Initial Status
          </label>
          <div className="relative">
            <select
              name="status"
              value={formData.status}
              onChange={onChange}
              className={`w-full bg-transparent border-b border-gray-300 py-3 text-base focus:outline-none focus:border-ruby-red-600 transition-colors cursor-pointer appearance-none ${
                formData.status === "Available"
                  ? "text-green-700 font-medium"
                  : formData.status === "Maintenance"
                    ? "text-red-600 font-medium"
                    : "text-gray-900"
              }`}
            >
              <option value="Available">Available (Ready)</option>
              <option value="Maintenance">Maintenance (Closed)</option>
              <option value="In Use">In Use (Occupied)</option>
            </select>
            <div className="absolute right-0 top-4 pointer-events-none text-gray-400">
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="group">
        <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2 group-focus-within:text-ruby-red-600 transition-colors">
          Description
        </label>
        <textarea
          name="description"
          rows="4"
          value={formData.description}
          onChange={onChange}
          className="w-full bg-gray-50 border-none p-4 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-ruby-red-600 transition-all resize-none"
          placeholder="Describe the elegant features of this room..."
        ></textarea>
      </div>
    </div>
  );
};

export default RoomInfoSection;
