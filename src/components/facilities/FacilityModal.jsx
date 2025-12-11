import React, { useState, useEffect } from "react";

const FacilityModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "Electronic",
    stock: "",
    condition: "Good",
    icon: "default", // Default icon
  });

  // Efek untuk mengisi form saat Edit Mode (initialData berubah)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Reset jika Add Mode
      setFormData({
        name: "",
        category: "Electronic",
        stock: "",
        condition: "Good",
        icon: "default",
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = () => {
    // Basic validation
    if (!formData.name || !formData.stock) return;
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 fade-in">
      <div className="bg-white w-full max-w-md p-8 shadow-2xl relative">
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
          {initialData ? "Edit Item" : "Add New Amenity"}
        </h3>

        <div className="flex flex-col gap-6">
          <div className="group">
            <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
              Item Name
            </label>
            <input
              type="text"
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-ruby-red-600 transition-colors font-serif"
              placeholder="e.g. Laser Pointer"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="flex gap-4">
            <div className="group flex-1">
              <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
                Stock
              </label>
              <input
                type="number"
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-ruby-red-600 transition-colors"
                placeholder="0"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
              />
            </div>
            <div className="group flex-1">
              <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
                Condition
              </label>
              <select
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-ruby-red-600 transition-colors bg-transparent"
                value={formData.condition}
                onChange={(e) =>
                  setFormData({ ...formData, condition: e.target.value })
                }
              >
                <option value="Good">Good</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Broken">Broken</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-4 bg-gray-900 text-white py-3 uppercase tracking-[0.2em] text-xs hover:bg-ruby-red-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacilityModal;
