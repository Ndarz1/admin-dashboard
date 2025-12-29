import React from "react";
import {
  Monitor,
  Square,
  Speaker,
  Wind,
  Box,
  PcCase,
  Tv,
  Wifi,
  Coffee,
  Car,
  AlertCircle,
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

const FacilityCard = ({ item, onEdit, onDelete }) => {
  const renderIcon = (type) => {
    switch (type) {
      case "projector":
        return <Projector size={24} />;
      case "audio":
        return <Speaker size={24} />;
      case "vc":
        return <Video size={24} />;
      case "display":
        return <Tv size={24} />;
      case "wifi":
        return <Wifi size={24} />;
      case "control":
        return <Tablet size={24} />;
      case "chair":
        return <Armchair size={24} />;
      case "table":
        return <PanelTop size={24} />;
      case "storage":
        return <Archive size={24} />;
      case "board":
        return <Presentation size={24} />;
      case "light":
        return <Lightbulb size={24} />;
      case "ac":
        return <Wind size={24} />;
      case "acoustic":
        return <Waves size={24} />;
      case "access":
        return <Accessibility size={24} />;
      case "drink":
        return <Coffee size={24} />;
      case "food":
        return <Utensils size={24} />;
      case "fridge":
        return <Refrigerator size={24} />;
      case "atk":
        return <PenTool size={24} />;
      case "printer":
        return <Printer size={24} />;
      case "logistics":
        return <Tags size={24} />;
      case "security":
        return <ShieldCheck size={24} />;
      case "stream":
        return <Radio size={24} />;
      case "lang":
        return <Languages size={24} />;
      case "stage":
        return <Layers size={24} />;
      case "vip":
        return <UserCheck size={24} />;
      default:
        return <AlertCircle size={24} />;
    }
  };

  return (
    <div className="group bg-white border border-gray-100 p-8 flex flex-col items-center text-center hover:shadow-xl hover:border-ruby-red-600/20 transition-all duration-500 relative overflow-hidden rounded-xl">
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors duration-500 ${
          item.condition === "Good"
            ? "bg-gray-50 text-gray-800 group-hover:bg-ruby-red-50 group-hover:text-ruby-red-600"
            : "bg-red-50 text-red-600"
        }`}
      >
        {renderIcon(item.icon)}
      </div>

      <h3 className="font-serif text-xl text-gray-900 mb-1">{item.name}</h3>
      <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 truncate w-full">
        {item.category}
      </p>

      <div className="flex items-center gap-4 text-sm w-full justify-center border-t border-gray-50 pt-4 mt-auto">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">
            Stock
          </span>
          <span className="font-bold text-gray-800">{item.stock}</span>
        </div>
        <div className="w-[1px] h-8 bg-gray-100"></div>
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">
            Status
          </span>
          <span
            className={`font-bold ${
              item.condition === "Good" ? "text-green-600" : "text-red-500"
            }`}
          >
            {item.condition}
          </span>
        </div>
      </div>

      <div className="absolute inset-0 bg-white/90 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-default">
        <button
          onClick={() => onEdit(item)}
          className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors shadow-sm"
          title="Edit Item"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="w-12 h-12 rounded-full border border-red-200 flex items-center justify-center text-red-500 hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors shadow-sm"
          title="Delete Item"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FacilityCard;
