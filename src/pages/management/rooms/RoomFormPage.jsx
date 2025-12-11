import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Import Sub-Components
import RoomInfoSection from "../../../components/rooms/form/RoomInfoSection";
import RoomImageSection from "../../../components/rooms/form/RoomImageSection";
import RoomAmenitiesSection from "../../../components/rooms/form/RoomAmenitiesSection";

const RoomFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    type: "Laboratorium",
    capacity: "",
    location: "",
    description: "",
    facilities: [],
    status: "Available",
    imagePreview: null,
    imageFile: null,
  });

  useEffect(() => {
    if (isEditMode) {
      // Simulasi Fetch Data
      const dummyDataFromDB = {
        name: "Laboratorium Komputer 1",
        type: "Laboratorium",
        capacity: "40",
        location: "Gedung A, Lantai 2",
        description:
          "Ruangan laboratorium utama dengan spesifikasi PC high-end.",
        facilities: ["AC", "Projector", "PC Workstation", "High-Speed WiFi"],
        status: "Available",
        imagePreview:
          "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=1000",
      };
      setFormData((prev) => ({ ...prev, ...dummyDataFromDB }));
    }
  }, [isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleFacility = (facility) => {
    setFormData((prev) => {
      if (prev.facilities.includes(facility)) {
        return {
          ...prev,
          facilities: prev.facilities.filter((f) => f !== facility),
        };
      } else {
        return { ...prev, facilities: [...prev.facilities, facility] };
      }
    });
  };

  const handleDropImage = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        imagePreview: previewUrl,
        imageFile: file,
      }));
    }
  }, []);

  const handleRemoveImage = (e) => {
    if (e) e.stopPropagation();
    setFormData((prev) => ({ ...prev, imagePreview: null, imageFile: null }));
  };

  return (
    <div className="w-full fade-in pb-20 font-sans text-gray-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-6 gap-4 mb-10">
        <div>
          <h2 className="text-4xl font-serif text-gray-900 tracking-tight">
            {isEditMode ? "Edit Residence" : "New Residence"}
          </h2>
          <p className="text-gray-500 mt-2 font-light tracking-wide">
            {isEditMode
              ? "Update details for this exclusive space."
              : "Add a new space to the exclusive collection."}
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 text-xs uppercase tracking-[0.2em] text-gray-500 hover:text-gray-900 transition-colors"
          >
            Cancel
          </button>
          <button className="bg-gray-900 text-white px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-ruby-red-600 transition-colors duration-500 shadow-lg">
            {isEditMode ? "Update Changes" : "Save Residence"}
          </button>
        </div>
      </div>

      {/* Main Form Layout */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Column: Info Inputs */}
        <RoomInfoSection formData={formData} onChange={handleChange} />

        {/* Right Column: Image & Amenities */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          <RoomImageSection
            imagePreview={formData.imagePreview}
            onDrop={handleDropImage}
            onRemove={handleRemoveImage}
          />
          <RoomAmenitiesSection
            facilities={formData.facilities}
            onToggle={handleToggleFacility}
          />
        </div>
      </div>
    </div>
  );
};

export default RoomFormPage;
