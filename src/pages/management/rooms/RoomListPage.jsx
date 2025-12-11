import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import RoomCard from "../../../components/rooms/RoomCard"; // Import Component Baru

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

  // React Select Custom Styles (Raffles Theme)
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "none",
      boxShadow: "none",
      cursor: "pointer",
      minWidth: "180px",
      borderBottom: "1px solid #e5e7eb",
      borderRadius: 0,
      "&:hover": { borderBottom: "1px solid #be123c" },
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
      "&:hover": { color: "#be123c" },
    }),
    indicatorSeparator: () => ({ display: "none" }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0.5rem",
      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
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

      {/* --- ROOM GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 z-0">
        {filteredRooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default RoomListPage;
