/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Save, ArrowLeft, Upload, Loader2, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { renderAmenityIcon } from "../../../utils/amenityUtils";

const RoomFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditMode);
  const [amenitiesList, setAmenitiesList] = useState([]);

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Meeting Room",
    capacity: "",
    location: "",
    price: "",
    status: "available",
    description: "",
    amenities: [],
  });

  const categories = [
    "Laboratorium",
    "Meeting Room",
    "Auditorium",
    "Classroom",
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const amenitiesRes = await fetch("http://localhost:5000/api/amenities");
        const amenitiesJson = await amenitiesRes.json();

        if (amenitiesJson.success) {
          setAmenitiesList(amenitiesJson.data);
        }

        if (isEditMode) {
          const roomRes = await fetch(`http://localhost:5000/api/rooms/${id}`);
          const roomJson = await roomRes.json();

          if (roomJson.success) {
            const data = roomJson.data;

            let parsedAmenities = [];
            if (typeof data.amenities === "string") {
              try {
                parsedAmenities = JSON.parse(data.amenities);
              } catch (e) {
                parsedAmenities = [];
              }
            } else {
              parsedAmenities = data.amenities || [];
            }

            setFormData({
              name: data.name,
              category: data.category,
              capacity: data.capacity,
              location: data.location,
              price: data.price,
              status: data.status,
              description: data.description,
              amenities: parsedAmenities,
            });
            setImagePreview(data.image);
          } else {
            toast.error("Failed to load room data");
            navigate("/rooms");
          }
        }
      } catch (error) {
        toast.error("Server error");
        console.error(error);
      } finally {
        setInitialLoading(false);
      }
    };

    loadData();
  }, [id, isEditMode, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenityToggle = (amenityItem) => {
    setFormData((prev) => {
      const current = prev.amenities;
      const exists = current.find((a) =>
        typeof a === "string"
          ? a === amenityItem.name
          : a.name === amenityItem.name
      );

      if (exists) {
        return {
          ...prev,
          amenities: current.filter((a) =>
            typeof a === "string"
              ? a !== amenityItem.name
              : a.name !== amenityItem.name
          ),
        };
      } else {
        return {
          ...prev,
          amenities: [
            ...current,
            { name: amenityItem.name, icon: amenityItem.icon },
          ],
        };
      }
    });
  };

  const isAmenitySelected = (amenityName) => {
    return formData.amenities.some((a) =>
      typeof a === "string" ? a === amenityName : a.name === amenityName
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("category", formData.category);
      data.append("capacity", formData.capacity);
      data.append("location", formData.location);
      data.append("price", formData.price);
      data.append("status", formData.status);
      data.append("description", formData.description);
      data.append("amenities", JSON.stringify(formData.amenities));

      if (imageFile) {
        data.append("image", imageFile);
      }

      const token = localStorage.getItem("authToken");
      const url = isEditMode
        ? `http://localhost:5000/api/rooms/${id}`
        : "http://localhost:5000/api/rooms";

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const json = await response.json();

      if (json.success) {
        toast.success(
          `Room ${isEditMode ? "updated" : "created"} successfully!`
        );
        setTimeout(() => navigate("/rooms"), 1500);
      } else {
        toast.error(json.message || "Failed to save room");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server connection error");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading)
    return (
      <div className="flex h-screen items-center justify-center text-gray-400">
        Loading details...
      </div>
    );

  return (
    <div className="font-sans text-gray-800 pb-20 fade-in">
      <Toaster position="top-right" />

      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/rooms"
          className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-gray-900 hover:border-gray-900 transition-all rounded-full"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900 tracking-wide">
            {isEditMode ? "Edit Residence" : "New Residence"}
          </h1>
          <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">
            {isEditMode
              ? `Update details for ${formData.name}`
              : "Add a new space to collection"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 bg-white p-8 border border-gray-100 shadow-sm h-fit">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                Room Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Grand Ballroom A"
                className="w-full border-b border-gray-200 py-3 text-lg font-serif text-gray-900 focus:outline-none focus:border-[#967D69] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border-b border-gray-200 py-3 text-sm text-gray-900 focus:outline-none focus:border-[#967D69] bg-transparent"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                Capacity (Pax)
              </label>
              <input
                type="number"
                name="capacity"
                required
                value={formData.capacity}
                onChange={handleChange}
                placeholder="0"
                className="w-full border-b border-gray-200 py-3 text-sm text-gray-900 focus:outline-none focus:border-[#967D69]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Building A, 2nd Floor"
                className="w-full border-b border-gray-200 py-3 text-sm text-gray-900 focus:outline-none focus:border-[#967D69]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                Price Label
              </label>
              <input
                type="text"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. Free for Students"
                className="w-full border-b border-gray-200 py-3 text-sm text-gray-900 focus:outline-none focus:border-[#967D69]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                Current Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border-b border-gray-200 py-3 text-sm text-gray-900 focus:outline-none focus:border-[#967D69] bg-transparent"
              >
                <option value="available">Available</option>
                <option value="maintenance">Maintenance</option>
                <option value="booked">Booked (Manual)</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-200 p-4 text-sm text-gray-600 focus:outline-none focus:border-[#967D69] resize-none"
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3">
              Select Amenities
            </label>
            {amenitiesList.length === 0 ? (
              <p className="text-sm text-gray-400 italic">
                No amenities found in inventory. Please add them in Facility
                page first.
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {amenitiesList.map((item) => {
                  const isSelected = isAmenitySelected(item.name);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleAmenityToggle(item)}
                      className={`flex items-center gap-2 px-3 py-2 text-xs border rounded transition-all duration-300 ${
                        isSelected
                          ? "bg-gray-900 text-white border-gray-900"
                          : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <span
                        className={isSelected ? "text-white" : "text-gray-400"}
                      >
                        {renderAmenityIcon(item.icon, 14)}
                      </span>
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#967D69] text-white px-8 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#856d5b] transition-all shadow-lg flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <Save size={16} />
              )}
              {isEditMode ? "Save Changes" : "Create Room"}
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="bg-white p-6 border border-gray-100 shadow-sm sticky top-6">
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-4">
              Cover Image
            </label>

            <div className="relative w-full aspect-[4/3] bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden hover:bg-gray-100 transition-colors group cursor-pointer">
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white text-xs uppercase tracking-widest">
                      Change Image
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center p-6">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
                    <Upload size={20} />
                  </div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">
                    Click to upload
                  </p>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            {imageFile && (
              <div className="mt-4 flex items-center justify-between bg-emerald-50 px-3 py-2 border border-emerald-100">
                <span className="text-[10px] text-emerald-700 truncate max-w-[200px]">
                  {imageFile.name}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                  className="text-emerald-700 hover:text-emerald-900"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default RoomFormPage;
