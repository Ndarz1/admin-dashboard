import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

const RoomListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  const typeOptions = [
    { value: "All", label: "All Categories" },
    { value: "Laboratorium", label: "Laboratorium" },
    { value: "Meeting Room", label: "Meeting Room" },
    { value: "Aula", label: "Aula" },
    { value: "Kelas", label: "Classroom" },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "none",
      boxShadow: "none",
      cursor: "pointer",
      minWidth: "180px",
      borderBottom: "1px solid #e5e7eb",
      borderRadius: 0,
      "&:hover": {
        borderBottom: "1px solid #be123c",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#be123c"
        : state.isFocused
          ? "#fff1f2"
          : "white",
      color: state.isSelected ? "white" : "#374151",
      padding: 10,
      cursor: "pointer",
      fontSize: "0.875rem",
    }),
    singleValue: (provided) => ({
      ...provided,
      fontFamily: "serif",
      color: "#1f2937",
      fontWeight: 500,
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#9ca3af",
      "&:hover": {
        color: "#be123c",
      },
    }),
    indicatorSeparator: () => ({ display: "none" }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0.5rem",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      zIndex: 50,
    }),
  };

  const rooms = [
    {
      id: 1,
      name: "Laboratorium Komputer 1",
      type: "Laboratorium",
      capacity: 40,
      location: "Gedung A, Lantai 2",
      status: "Available",
      image:
        "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=1000",
    },
    {
      id: 2,
      name: "Ruang Rapat Utama",
      type: "Meeting Room",
      capacity: 15,
      location: "Gedung B, Lantai 1",
      status: "In Use",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000",
    },
    {
      id: 3,
      name: "Aula Serbaguna",
      type: "Aula",
      capacity: 200,
      location: "Gedung C, Lantai Dasar",
      status: "Maintenance",
      image:
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=1000",
    },
    {
      id: 4,
      name: "Laboratorium Jaringan",
      type: "Laboratorium",
      capacity: 30,
      location: "Gedung A, Lantai 3",
      status: "Available",
      image:
        "https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80&w=1000",
    },
    {
      id: 5,
      name: "Kelas Teori 101",
      type: "Kelas",
      capacity: 60,
      location: "Gedung D, Lantai 2",
      status: "Available",
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000",
    },
  ];

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = filterType === "All" || room.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="flex flex-col gap-10 w-full fade-in pb-20 font-sans text-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-6 gap-4">
        <div>
          <h2 className="text-4xl font-serif text-gray-900 tracking-tight">
            The Collection
          </h2>
          <p className="text-gray-500 mt-2 font-light tracking-wide">
            Manage your exclusive spaces and facilities.
          </p>
        </div>
        <Link
          to="/rooms/add"
          className="bg-gray-900 text-white px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-ruby-red-600 transition-colors duration-500"
        >
          Add New Room
        </Link>
      </div>

      {/* --- FILTER & SEARCH TOOLBAR --- */}
      <div className="flex flex-col sm:flex-row gap-6 items-center justify-between z-40 relative">
        <div className="relative w-full sm:w-96 group">
          <input
            type="text"
            placeholder="Search residence..."
            className="w-full bg-transparent border-b border-gray-300 py-3 pl-2 pr-8 focus:outline-none focus:border-ruby-red-600 transition-colors font-serif text-lg placeholder:font-sans placeholder:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="w-4 h-4 text-gray-400 absolute right-0 top-4 group-focus-within:text-ruby-red-600 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <span className="text-xs uppercase tracking-widest text-gray-400 whitespace-nowrap">
            Filter By:
          </span>
          <div className="w-full sm:w-auto min-w-[200px]">
            <Select
              options={typeOptions}
              value={typeOptions.find((option) => option.value === filterType)}
              onChange={(selectedOption) => setFilterType(selectedOption.value)}
              styles={customStyles}
              isSearchable={false}
              placeholder="Select Type"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 z-0">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className="group flex flex-col bg-white cursor-pointer"
          >
            <div className="relative h-[22rem] overflow-hidden w-full">
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
              />
              <div className="absolute top-6 left-6">
                <span
                  className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-md ${
                    room.status === "Available"
                      ? "bg-green-900/40 border border-green-500/30"
                      : room.status === "Maintenance"
                        ? "bg-red-900/40 border border-red-500/30"
                        : "bg-black/40 border border-white/30"
                  }`}
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
                  <span className="truncate max-w-[150px]">
                    {room.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
              <button className="text-xs uppercase tracking-wider text-gray-400 hover:text-gray-900 border-b border-transparent hover:border-gray-900 pb-1 transition-all">
                Edit Room
              </button>
              <button className="text-xs uppercase tracking-wider text-red-400 hover:text-red-700 border-b border-transparent hover:border-red-700 pb-1 transition-all">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomListPage;
