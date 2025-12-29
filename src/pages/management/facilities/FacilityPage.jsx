/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import FacilityCard from "../../../components/facilities/FacilityCard";
import FacilityModal from "../../../components/facilities/FacilityModal";

const MySwal = withReactContent(Swal);

const FacilityPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFacilities = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/amenities");
      const json = await response.json();
      if (json.success) {
        setFacilities(json.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  const handleOpenModal = (item = null) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`http://localhost:5000/api/amenities/${id}`, {
            method: "DELETE",
          });
          setFacilities((prev) => prev.filter((item) => item.id !== id));
          MySwal.fire({
            icon: "success",
            title: "Deleted",
            confirmButtonColor: "#be123c",
            timer: 1500,
          });
        } catch (error) {
          MySwal.fire("Error", "Failed to delete", "error");
        }
      }
    });
  };

  const handleSaveFacility = async (formData) => {
    try {
      const url = editingItem
        ? `http://localhost:5000/api/amenities/${editingItem.id}`
        : "http://localhost:5000/api/amenities";

      const method = editingItem ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await response.json();

      if (json.success) {
        fetchFacilities();
        setIsModalOpen(false);
        MySwal.fire({
          icon: "success",
          title: "Saved",
          text: "Inventory updated successfully",
          confirmButtonColor: "#be123c",
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
    }
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
          onClick={() => handleOpenModal(null)}
          className="bg-gray-900 text-white px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-ruby-red-600 transition-colors duration-500 shadow-lg"
        >
          Add New Item
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-400">Loading amenities...</div>
      ) : (
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
      )}

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
