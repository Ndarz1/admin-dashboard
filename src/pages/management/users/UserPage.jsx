import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select from "react-select";
import UserCard from "../../../components/users/UserCard";
import UserModal from "../../../components/users/UserModal";
import UserProfileModal from "../../../components/users/UserProfileModal";

const MySwal = withReactContent(Swal);

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await response.json();

      if (json.success) {
        const formattedData = json.data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department || "-",
          status: user.is_active ? "Active" : "Suspended",
          joined_at: user.joined_at,
          avatar: user.name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase(),
        }));
        setUsers(formattedData);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      MySwal.fire("Error", "Failed to load users data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSaveUser = async (newUser) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      const json = await response.json();

      if (json.success) {
        setIsModalOpen(false);
        MySwal.fire({
          icon: "success",
          title: "Member Added",
          text: `${newUser.name} has been registered successfully.`,
          confirmButtonColor: "#be123c",
        });
        fetchUsers();
      } else {
        throw new Error(json.message);
      }
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "Something went wrong",
      });
    }
  };

  const handleToggleStatus = (id) => {
    const targetUser = users.find((u) => u.id === id);
    if (!targetUser) return;

    const isCurrentlySuspended = targetUser.status === "Suspended";
    const actionTitle = isCurrentlySuspended
      ? "Activate User?"
      : "Suspend User?";
    const confirmColor = isCurrentlySuspended ? "#059669" : "#be123c";

    MySwal.fire({
      title: <p className="font-serif text-2xl text-gray-800">{actionTitle}</p>,
      text: isCurrentlySuspended
        ? "User access will be restored."
        : "User access will be revoked.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: confirmColor,
      confirmButtonText: isCurrentlySuspended
        ? "Yes, Activate"
        : "Yes, Suspend",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("authToken");
          const response = await fetch(
            `http://localhost:5000/api/users/${id}/status`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                is_active: isCurrentlySuspended ? true : false,
              }),
            }
          );

          const json = await response.json();
          if (json.success) {
            MySwal.fire({
              icon: "success",
              title: "Updated",
              text: "User status has been updated.",
              confirmButtonColor: confirmColor,
              timer: 1500,
            });
            fetchUsers();
          } else {
            throw new Error(json.message);
          }
        } catch (error) {
          MySwal.fire("Error", error.message, "error");
        }
      }
    });
  };

  const handleDeleteUser = (id) => {
    const targetUser = users.find((u) => u.id === id);
    if (!targetUser) return;

    MySwal.fire({
      title: (
        <p className="font-serif text-2xl text-gray-800">Delete Permanently?</p>
      ),
      text: `Are you sure you want to delete ${targetUser.name}? This cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#be123c",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("authToken");
          const response = await fetch(
            `http://localhost:5000/api/users/${id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const json = await response.json();
          if (json.success) {
            MySwal.fire({
              icon: "success",
              title: "Deleted",
              text: "User has been removed from database.",
              confirmButtonColor: "#be123c",
              timer: 1500,
            });
            fetchUsers();
          } else {
            throw new Error(json.message);
          }
        } catch (error) {
          MySwal.fire("Error", error.message, "error");
        }
      }
    });
  };

  const handleViewProfile = (user) => {
    setSelectedProfile(user);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      filterRole === "All" ||
      user.role.toLowerCase() === filterRole.toLowerCase();
    return matchesSearch && matchesRole;
  });

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
      borderBottom: "1px solid #e5e7eb",
      borderRadius: 0,
      boxShadow: "none",
    }),
  };

  return (
    <div className="w-full fade-in pb-20 font-sans text-gray-800 relative">
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

      <div className="flex flex-col sm:flex-row gap-6 items-center justify-between mb-8 z-40 relative">
        <div className="relative w-full sm:w-96 group">
          <input
            type="text"
            placeholder="Search member..."
            className="w-full bg-transparent border-b border-gray-300 py-3 pl-2 pr-8 focus:outline-none focus:border-ruby-red-600 transition-colors font-serif text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <span className="text-xs uppercase tracking-widest text-gray-400 whitespace-nowrap">
            Filter Role:
          </span>
          <div className="w-full sm:w-auto min-w-[180px]">
            <Select
              options={roleOptions}
              value={roleOptions.find((opt) => opt.value === filterRole)}
              onChange={(opt) => setFilterRole(opt.value)}
              styles={customStyles}
              isSearchable={false}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400 animate-pulse">
          Loading directory...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-0">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onDeleteStatus={handleToggleStatus}
                onDeletePermanent={handleDeleteUser}
                onViewProfile={handleViewProfile}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-400">
              No members found matching your search.
            </div>
          )}
        </div>
      )}

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
      />

      <UserProfileModal
        isOpen={!!selectedProfile}
        onClose={() => setSelectedProfile(null)}
        user={selectedProfile}
      />
    </div>
  );
};

export default UserPage;
