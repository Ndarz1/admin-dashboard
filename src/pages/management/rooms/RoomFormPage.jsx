import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

const RoomFormPage = () => {
  const navigate = useNavigate();

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

  const facilityOptions = [
    "AC",
    "Projector",
    "Whiteboard",
    "Smart TV",
    "Sound System",
    "Video Conf",
    "PC Workstation",
    "High-Speed WiFi",
  ];

  const onDrop = useCallback((acceptedFiles) => {
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const toggleFacility = (facility) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const removeImage = (e) => {
    e.stopPropagation();
    setFormData((prev) => ({ ...prev, imagePreview: null, imageFile: null }));
  };

  return (
    <div className="w-full fade-in pb-20 font-sans text-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-6 gap-4 mb-10">
        <div>
          <h2 className="text-4xl font-serif text-gray-900 tracking-tight">
            New Residence
          </h2>
          <p className="text-gray-500 mt-2 font-light tracking-wide">
            Add a new space to the exclusive collection.
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
            Save Residence
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 flex flex-col gap-8">
          <div className="group">
            <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2 group-focus-within:text-ruby-red-600 transition-colors">
              Room Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-300 py-3 text-xl font-serif text-gray-900 focus:outline-none focus:border-ruby-red-600 transition-colors placeholder:text-gray-300"
              placeholder="e.g. Grand Laboratory One"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 group">
              <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2 group-focus-within:text-ruby-red-600 transition-colors">
                Category
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-gray-300 py-3 text-base text-gray-700 focus:outline-none focus:border-ruby-red-600 transition-colors cursor-pointer"
              >
                <option value="Laboratorium">Laboratorium</option>
                <option value="Meeting Room">Meeting Room</option>
                <option value="Aula">Aula</option>
                <option value="Kelas">Classroom</option>
              </select>
            </div>

            <div className="flex-1 group">
              <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2 group-focus-within:text-ruby-red-600 transition-colors">
                Capacity (Pax)
              </label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-gray-300 py-3 text-base text-gray-900 focus:outline-none focus:border-ruby-red-600 transition-colors"
                placeholder="0"
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2 group-focus-within:text-ruby-red-600 transition-colors">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-300 py-3 text-base text-gray-900 focus:outline-none focus:border-ruby-red-600 transition-colors placeholder:text-gray-300"
              placeholder="e.g. Building A, 2nd Floor, West Wing"
            />
          </div>

          <div className="group">
            <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2 group-focus-within:text-ruby-red-600 transition-colors">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-gray-50 border-none p-4 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-ruby-red-600 transition-all resize-none"
              placeholder="Describe the elegant features of this room..."
            ></textarea>
          </div>
        </div>

        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">
              Visual Preview
            </label>

            <div
              {...getRootProps()}
              className={`w-full h-64 border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer group relative overflow-hidden ${
                isDragActive
                  ? "border-ruby-red-600 bg-ruby-red-50"
                  : "border-gray-300 bg-gray-100 hover:border-ruby-red-400 hover:bg-ruby-red-50"
              }`}
            >
              <input {...getInputProps()} />

              {formData.imagePreview ? (
                <>
                  <img
                    src={formData.imagePreview}
                    alt="Room Preview"
                    className="w-full h-full object-cover absolute inset-0 z-10"
                  />
                  <div className="absolute inset-0 z-20 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={removeImage}
                      className="bg-white text-red-600 px-4 py-2 text-xs uppercase tracking-widest rounded shadow hover:bg-red-50"
                    >
                      Remove Image
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center text-gray-400 group-hover:text-ruby-red-600 z-10">
                  <svg
                    className={`w-10 h-10 mb-2 transition-transform ${
                      isDragActive ? "scale-110" : "group-hover:scale-110"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-xs uppercase tracking-widest px-4 text-center">
                    {isDragActive
                      ? "Drop image here..."
                      : "Click or Drag Image"}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">
              Amenities
            </label>
            <div className="grid grid-cols-2 gap-3">
              {facilityOptions.map((facility) => (
                <div
                  key={facility}
                  onClick={() => toggleFacility(facility)}
                  className={`cursor-pointer px-3 py-2 text-xs border transition-all duration-300 flex items-center gap-2 ${
                    formData.facilities.includes(facility)
                      ? "border-ruby-red-600 bg-ruby-red-50 text-ruby-red-800"
                      : "border-gray-200 text-gray-500 hover:border-gray-400"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      formData.facilities.includes(facility)
                        ? "bg-ruby-red-600"
                        : "bg-gray-300"
                    }`}
                  ></div>
                  {facility}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomFormPage;
