import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select from "react-select";

// Import Komponen Terpisah
import UserCard from "../../../components/users/UserCard";
import UserModal from "../../../components/users/UserModal";

const MySwal = withReactContent(Swal);

const UserPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initial Data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Dr. Siti Aminah",
      email: "siti.aminah@med.uad.ac.id",
      role: "Dosen",
      department: "Fakultas Kedokteran",
      status: "Active",
      joinDate: "2020-08-15",
      avatar: "SA",
    },
    {
      id: 2,
      name: "Ahmad Dahlan",
      email: "ahmad.dahlan@mhs.uad.ac.id",
      role: "Mahasiswa",
      department: "Informatika",
      status: "Active",
      joinDate: "2023-09-01",
      avatar: "AD",
    },
    {
      id: 4,
      name: "Dewi Putri",
      email: "dewi.p@mhs.uad.ac.id",
      role: "Mahasiswa",
      department: "Ilmu Komunikasi",
      status: "Suspended", // Contoh user yang sudah disuspend
      joinDate: "2022-09-01",
      avatar: "DP",
    },
  ]);

  // React Select Options & Styles
  const roleOptions = [
    { value: "All", label: "All Roles" },
    { value: "Dosen", label: "Lecturers" },
    { value: "Mahasiswa", label: "Students" },
    { value: "Staff", label: "Staff" },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "none",
      boxShadow: "none",
      cursor: "pointer",
      minWidth: "150px",
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

  // Logic: Filter Data
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "All" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  // --- PERBAIKAN LOGIC HANDLE DELETE/SUSPEND/ACTIVATE ---
  const handleToggleStatus = (id) => {
    // 1. Cari user yang dituju untuk mengecek statusnya saat ini
    const targetUser = users.find((u) => u.id === id);
    if (!targetUser) return;

    // 2. Tentukan variabel berdasarkan status saat ini
    const isCurrentlySuspended = targetUser.status === "Suspended";

    const actionTitle = isCurrentlySuspended
      ? "Activate User?"
      : "Suspend User?";
    const actionText = isCurrentlySuspended
      ? "User access will be restored immediately."
      : "User access will be revoked immediately.";
    const confirmBtnText = isCurrentlySuspended
      ? "Yes, Activate"
      : "Yes, Suspend";
    const confirmColor = isCurrentlySuspended ? "#059669" : "#be123c"; // Hijau (Active) vs Merah (Suspend)

    MySwal.fire({
      title: <p className="font-serif text-2xl text-gray-800">{actionTitle}</p>,
      text: actionText,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: confirmColor,
      cancelButtonColor: "#d1d5db",
      confirmButtonText: confirmBtnText,
      customClass: { popup: "rounded-none font-sans" },
    }).then((result) => {
      if (result.isConfirmed) {
        // 3. Update State (Toggle Status)
        setUsers((prev) =>
          prev.map((user) =>
            user.id === id
              ? {
                  ...user,
                  status: isCurrentlySuspended ? "Active" : "Suspended",
                }
              : user,
          ),
        );

        MySwal.fire({
          icon: "success",
          title: isCurrentlySuspended ? "Activated" : "Suspended",
          confirmButtonColor: confirmColor,
          timer: 1500,
        });
      }
    });
  };

  // Logic: Handle Add New User
  const handleSaveUser = (newUser) => {
    if (!newUser.name || !newUser.email || !newUser.department) {
      MySwal.fire({
        icon: "error",
        title: "Incomplete Data",
        confirmButtonColor: "#be123c",
      });
      return;
    }

    const initials = newUser.name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    const newEntry = {
      id: Date.now(),
      ...newUser,
      status: "Active",
      joinDate: new Date().toISOString().split("T")[0],
      avatar: initials,
    };

    setUsers([newEntry, ...users]);
    setIsModalOpen(false);

    MySwal.fire({
      icon: "success",
      title: "Member Added",
      text: `${newUser.name} has been registered.`,
      confirmButtonColor: "#be123c",
      timer: 2000,
    });
  };

  return (
    <div className="w-full fade-in pb-20 font-sans text-gray-800 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-6 gap-4 mb-10">
        <div>
          <h2 className="text-4xl font-serif text-gray-900 tracking-tight">
            Member Registry
          </h2>
          <p className="text-gray-500 mt-2 font-light tracking-wide">
            Directory of registered students, lecturers, and staff.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-900 text-white px-6 py-3 text-xs uppercase tracking-[0.2em] hover:bg-ruby-red-600 transition-colors shadow-lg"
        >
          Add New Member
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-6 items-center justify-between mb-8 z-40 relative">
        <div className="relative w-full sm:w-96 group">
          <input
            type="text"
            placeholder="Search member..."
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
            Filter Role:
          </span>
          <div className="w-full sm:w-auto min-w-[180px]">
            <Select
              options={roleOptions}
              value={roleOptions.find((option) => option.value === filterRole)}
              onChange={(selectedOption) => setFilterRole(selectedOption.value)}
              styles={customStyles}
              isSearchable={false}
              placeholder="Select Role"
            />
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-0">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} onDelete={handleToggleStatus} />
        ))}
      </div>

      {/* Modal */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
      />
    </div>
  );
};

export default UserPage;
