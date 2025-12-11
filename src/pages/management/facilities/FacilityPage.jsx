import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// Import Komponen
import FacilityCard from "../../../components/facilities/FacilityCard";
import FacilityModal from "../../../components/facilities/FacilityModal";

const MySwal = withReactContent(Swal);

const FacilityPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // Menyimpan item yang sedang diedit

  const [facilities, setFacilities] = useState([
    {
      id: 1,
      name: "HD Projector",
      category: "Electronic",
      stock: 12,
      condition: "Good",
      icon: "video",
    },
    {
      id: 2,
      name: "Whiteboard",
      category: "Stationery",
      stock: 25,
      condition: "Good",
      icon: "board",
    },
    {
      id: 3,
      name: "Sound System",
      category: "Electronic",
      stock: 5,
      condition: "Maintenance",
      icon: "speaker",
    },
    {
      id: 4,
      name: "Air Conditioner",
      category: "Electronic",
      stock: 30,
      condition: "Good",
      icon: "ac",
    },
    {
      id: 5,
      name: "Ergonomic Chair",
      category: "Furniture",
      stock: 150,
      condition: "Good",
      icon: "chair",
    },
  ]);

  // Logic: Buka Modal (Bisa Mode Add atau Edit)
  const handleOpenModal = (item = null) => {
    setEditingItem(item); // Jika item null = Add Mode
    setIsModalOpen(true);
  };

  // Logic: Delete Item
  const handleDelete = (id) => {
    MySwal.fire({
      title: <p className="font-serif text-2xl text-gray-800">Remove Item?</p>,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#be123c",
      cancelButtonColor: "#d1d5db",
      confirmButtonText: "Yes, Remove",
      customClass: { popup: "rounded-none font-sans" },
    }).then((result) => {
      if (result.isConfirmed) {
        setFacilities((prev) => prev.filter((item) => item.id !== id));
        MySwal.fire({
          icon: "success",
          title: "Deleted",
          confirmButtonColor: "#be123c",
          timer: 1500,
        });
      }
    });
  };

  // Logic: Simpan Data (Add atau Update)
  const handleSaveFacility = (formData) => {
    if (editingItem) {
      // Logic UPDATE
      setFacilities((prev) =>
        prev.map((item) =>
          item.id === editingItem.id ? { ...formData, id: item.id } : item,
        ),
      );
    } else {
      // Logic ADD NEW
      const newItem = {
        ...formData,
        id: Date.now(),
        icon: "default", // Di real app, user pilih icon
      };
      setFacilities((prev) => [newItem, ...prev]);
    }

    setIsModalOpen(false);

    MySwal.fire({
      icon: "success",
      title: "Saved",
      text: "Inventory updated successfully",
      confirmButtonColor: "#be123c",
      timer: 1500,
    });
  };

  return (
    <div className="w-full fade-in pb-20 font-sans text-gray-800 relative">
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-6 gap-4 mb-10">
        <div>
          <h2 className="text-4xl font-serif text-gray-900 tracking-tight">
            Amenities
          </h2>
          <p className="text-gray-500 mt-2 font-light tracking-wide">
            Manage inventory and facility conditions.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal(null)} // null = Add New
          className="bg-gray-900 text-white px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-ruby-red-600 transition-colors duration-500 shadow-lg"
        >
          Add New Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {facilities.map((item) => (
          <FacilityCard
            key={item.id}
            item={item}
            onEdit={handleOpenModal}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Modal Terpisah */}
      <FacilityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveFacility}
        initialData={editingItem}
      />
    </div>
  );
};

export default FacilityPage;
