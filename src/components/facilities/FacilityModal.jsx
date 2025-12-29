import React, { useState, useEffect } from "react";
import {
  Monitor,
  Mic,
  Wifi,
  Wind,
  Speaker,
  Square,
  Box,
  PcCase,
  Tv,
  Coffee,
  Car,
  Projector,
  Video,
  Tablet,
  Armchair,
  PanelTop,
  Archive,
  Presentation,
  Lightbulb,
  Thermometer,
  Waves,
  Accessibility,
  Utensils,
  Refrigerator,
  PenTool,
  Printer,
  Tags,
  ShieldCheck,
  Radio,
  Languages,
  Layers,
  UserCheck,
} from "lucide-react";

const ICON_OPTIONS = [
  {
    label: "Projector/Screen",
    value: "projector",
    icon: <Projector size={20} />,
  },
  { label: "Audio System", value: "audio", icon: <Speaker size={20} /> },
  { label: "Video Conf", value: "vc", icon: <Video size={20} /> },
  { label: "TV/Display", value: "display", icon: <Tv size={20} /> },
  { label: "Connectivity", value: "wifi", icon: <Wifi size={20} /> },
  { label: "Control Panel", value: "control", icon: <Tablet size={20} /> },
  { label: "Chair/Seating", value: "chair", icon: <Armchair size={20} /> },
  { label: "Desk/Table", value: "table", icon: <PanelTop size={20} /> },
  { label: "Storage", value: "storage", icon: <Archive size={20} /> },
  { label: "Whiteboard", value: "board", icon: <Presentation size={20} /> },
  { label: "Lighting", value: "light", icon: <Lightbulb size={20} /> },
  { label: "AC/Temp", value: "ac", icon: <Wind size={20} /> },
  { label: "Acoustic", value: "acoustic", icon: <Waves size={20} /> },
  {
    label: "Accessibility",
    value: "access",
    icon: <Accessibility size={20} />,
  },
  { label: "Beverages", value: "drink", icon: <Coffee size={20} /> },
  { label: "Food/Snack", value: "food", icon: <Utensils size={20} /> },
  { label: "Cooler/Fridge", value: "fridge", icon: <Refrigerator size={20} /> },
  { label: "Stationery", value: "atk", icon: <PenTool size={20} /> },
  { label: "Print/Scan", value: "printer", icon: <Printer size={20} /> },
  { label: "Logistics", value: "logistics", icon: <Tags size={20} /> },
  { label: "Security", value: "security", icon: <ShieldCheck size={20} /> },
  { label: "Live Stream", value: "stream", icon: <Radio size={20} /> },
  { label: "Interpreter", value: "lang", icon: <Languages size={20} /> },
  { label: "Stage", value: "stage", icon: <Layers size={20} /> },
  { label: "Green Room", value: "vip", icon: <UserCheck size={20} /> },
];

const FacilityModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "Technology",
    stock: "",
    condition: "Good",
    icon: "projector",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        category: "Technology",
        stock: "",
        condition: "Good",
        icon: "projector",
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = () => {
    if (!formData.name || !formData.stock) return;

    const payload = {
      ...formData,
      stock: parseInt(formData.stock),
    };

    onSave(payload);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 fade-in">
      <div className="bg-white w-full max-w-2xl p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto rounded-xl">
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
          {initialData ? "Edit Amenity" : "Add New Amenity"}
        </h3>

        <div className="flex flex-col gap-6">
          <div className="group">
            <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
              Item Name
            </label>
            <input
              type="text"
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-ruby-red-600 transition-colors font-serif text-lg"
              placeholder="e.g. 4K Laser Projector"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="flex gap-4">
            <div className="group flex-1">
              <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
                Category
              </label>
              <select
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-ruby-red-600 bg-transparent"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="Technology">Technology & Presentation</option>
                <option value="Furniture">Furniture & Setup</option>
                <option value="Comfort">Comfort & Environment</option>
                <option value="F&B">F&B & Hosting</option>
                <option value="Admin">Admin & Support</option>
                <option value="Special">Special Add-ons</option>
              </select>
            </div>

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
          </div>

          <div className="group">
            <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
              Condition
            </label>
            <select
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-ruby-red-600 bg-transparent"
              value={formData.condition}
              onChange={(e) =>
                setFormData({ ...formData, condition: e.target.value })
              }
            >
              <option value="Good">Good Condition</option>
              <option value="Maintenance">Under Maintenance</option>
              <option value="Broken">Broken / Lost</option>
            </select>
          </div>

          <div className="group">
            <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">
              Select Icon
            </label>
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-3 max-h-60 overflow-y-auto p-1">
              {ICON_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFormData({ ...formData, icon: opt.value })}
                  className={`flex flex-col items-center justify-center p-3 rounded border transition-all ${
                    formData.icon === opt.value
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-100 text-gray-400 hover:border-gray-300 hover:text-gray-600"
                  }`}
                  title={opt.label}
                >
                  {opt.icon}
                  <span className="text-[10px] mt-1 truncate w-full text-center">
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-4 bg-gray-900 text-white py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-ruby-red-600 transition-colors shadow-lg rounded"
          >
            {initialData ? "Save Changes" : "Create Amenity"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacilityModal;
