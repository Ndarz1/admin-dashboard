/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Plus, Search, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import RoomCard from "../../../components/rooms/RoomCard"; // Pastikan path benar

const MySwal = withReactContent(Swal);

const RoomListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. FETCH REAL DATA
  const fetchRooms = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/rooms");
      const json = await response.json();
      if (json.success) {
        setRooms(json.data);
      } else {
        toast.error("Failed to fetch rooms");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server connection error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // 2. FILTER DATA (Search & Category)
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = filterType === "All" || room.category === filterType;
    return matchesSearch && matchesType;
  });

  // 3. DELETE FUNCTION
  const handleDelete = (id) => {
    MySwal.fire({
      title: (
        <p className="font-serif text-2xl text-gray-900">
          Remove from Collection?
        </p>
      ),
      text: "This action cannot be undone. The room will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#111827", // Black Elegant
      cancelButtonColor: "#E5E7EB", // Gray Light
      confirmButtonText: "Yes, Remove",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-sm font-sans",
        confirmButton: "px-6 py-3 text-xs uppercase tracking-widest rounded-sm",
        cancelButton:
          "px-6 py-3 text-xs uppercase tracking-widest text-gray-600 rounded-sm",
      },
      buttonsStyling: false, // Custom styling enabled
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("authToken");
          const response = await fetch(
            `http://localhost:5000/api/rooms/${id}`,
            {
              method: "DELETE",
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const json = await response.json();

          if (json.success) {
            setRooms((prev) => prev.filter((room) => room.id !== id));
            toast.success("Room removed successfully");
          } else {
            toast.error(json.message || "Failed to delete");
          }
        } catch (error) {
          toast.error("Error deleting room");
        }
      }
    });
  };

  // --- STYLING UNTUK REACT-SELECT (ELEGANT STYLE) ---
  const typeOptions = [
    { value: "All", label: "All Categories" },
    { value: "Laboratorium", label: "Laboratorium" },
    { value: "Meeting Room", label: "Meeting Room" },
    { value: "Auditorium", label: "Auditorium" },
    { value: "Classroom", label: "Classroom" },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "none",
      borderBottom: state.isFocused ? "1px solid #967D69" : "1px solid #E5E7EB",
      boxShadow: "none",
      cursor: "pointer",
      borderRadius: 0,
      minWidth: "200px",
      "&:hover": { borderBottom: "1px solid #967D69" },
    }),
    singleValue: (provided) => ({
      ...provided,
      fontFamily: "serif",
      color: "#1F2937",
      fontSize: "1rem",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#967D69"
        : state.isFocused
        ? "#F9FAFB"
        : "white",
      color: state.isSelected ? "white" : "#374151",
      fontFamily: "sans-serif",
      fontSize: "0.875rem",
      padding: "10px 15px",
      cursor: "pointer",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0px",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      marginTop: "8px",
      zIndex: 50,
    }),
  };

  return (
    <div className="flex flex-col gap-10 w-full fade-in pb-20 font-sans text-gray-800">
      <Toaster position="top-right" />

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-100 pb-8 gap-6">
        <div>
          <h2 className="text-4xl font-serif text-gray-900 tracking-tight">
            The Collection
          </h2>
          <p className="text-gray-400 mt-2 font-light tracking-wide text-sm">
            Curated spaces designed for excellence.
          </p>
        </div>
        <Link
          to="/rooms/add"
          className="bg-gray-900 text-white px-8 py-4 text-[10px] uppercase tracking-[0.25em] font-bold hover:bg-[#967D69] transition-all duration-500 shadow-lg active:scale-95 flex items-center gap-2"
        >
          <Plus size={14} /> Add New Room
        </Link>
      </div>

      {/* FILTERS TOOLBAR */}
      <div className="flex flex-col sm:flex-row gap-8 items-center justify-between z-40 bg-white sticky top-0 py-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-96 group">
          <input
            type="text"
            placeholder="Search residence..."
            className="w-full bg-transparent border-b border-gray-200 py-3 pl-0 pr-8 focus:outline-none focus:border-[#967D69] transition-colors font-serif text-lg placeholder:font-sans placeholder:text-gray-300 placeholder:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="w-4 h-4 text-gray-400 absolute right-0 top-4 group-focus-within:text-[#967D69] transition-colors" />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <span className="text-[10px] uppercase tracking-widest text-gray-400 whitespace-nowrap hidden md:block">
            Filter By:
          </span>
          <div className="w-full sm:w-auto min-w-[220px]">
            <Select
              options={typeOptions}
              value={typeOptions.find((opt) => opt.value === filterType)}
              onChange={(opt) => setFilterType(opt.value)}
              styles={customStyles}
              isSearchable={false}
              placeholder="All Categories"
            />
          </div>
        </div>
      </div>

      {/* GRID CONTENT */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 animate-pulse">
          <Loader2 className="animate-spin mb-4" size={32} />
          <p className="text-xs uppercase tracking-widest">
            Loading Collection...
          </p>
        </div>
      ) : filteredRooms.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-gray-200 bg-gray-50/50">
          <p className="text-gray-400 font-serif italic text-lg">
            No rooms found in the collection.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setFilterType("All");
            }}
            className="mt-4 text-xs uppercase tracking-widest text-[#967D69] hover:text-gray-900 underline"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomListPage;
