import React, { useState } from "react";

const UserModal = ({ isOpen, onClose, onSave }) => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Mahasiswa",
    department: "",
  });

  const handleSave = () => {
    // Kirim data ke parent
    onSave(newUser);
    // Reset form setelah simpan
    setNewUser({ name: "", email: "", role: "Mahasiswa", department: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 fade-in">
      <div className="bg-white w-full max-w-md p-8 shadow-2xl relative border-t-4 border-ruby-red-600">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h3 className="text-2xl font-serif text-gray-900 mb-6">
          New Registration
        </h3>

        <div className="flex flex-col gap-5">
          <div className="group">
            <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
              Full Name
            </label>
            <input
              type="text"
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-ruby-red-600 transition-colors font-serif text-lg"
              placeholder="e.g. John Doe"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
          </div>

          <div className="group">
            <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-ruby-red-600 transition-colors"
              placeholder="john@uad.ac.id"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
          </div>

          <div className="flex gap-4">
            <div className="group flex-1">
              <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
                Role
              </label>
              <select
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-ruby-red-600 transition-colors bg-transparent cursor-pointer"
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
              >
                <option value="Mahasiswa">Mahasiswa</option>
                <option value="Dosen">Dosen</option>
                <option value="Staff">Staff</option>
              </select>
            </div>
            <div className="group flex-1">
              <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
                Department
              </label>
              <input
                type="text"
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-ruby-red-600 transition-colors"
                placeholder="Informatika"
                value={newUser.department}
                onChange={(e) =>
                  setNewUser({ ...newUser, department: e.target.value })
                }
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            className="mt-6 bg-gray-900 text-white py-3 uppercase tracking-[0.2em] text-xs hover:bg-ruby-red-600 transition-colors shadow-lg"
          >
            Register Member
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
