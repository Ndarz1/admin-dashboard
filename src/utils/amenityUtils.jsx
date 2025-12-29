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
  Zap,
  Projector,
  Video,
  Tablet,
  Armchair,
  PanelTop,
  Archive,
  Presentation,
  Lightbulb,
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

export const renderAmenityIcon = (iconName, size = 16) => {
  switch (iconName) {
    case "projector":
      return <Projector size={size} />;
    case "audio":
      return <Speaker size={size} />;
    case "vc":
      return <Video size={size} />;
    case "display":
      return <Tv size={size} />;
    case "wifi":
      return <Wifi size={size} />;
    case "control":
      return <Tablet size={size} />;
    case "chair":
      return <Armchair size={size} />;
    case "table":
      return <PanelTop size={size} />;
    case "storage":
      return <Archive size={size} />;
    case "board":
      return <Presentation size={size} />;
    case "light":
      return <Lightbulb size={size} />;
    case "ac":
      return <Wind size={size} />;
    case "acoustic":
      return <Waves size={size} />;
    case "access":
      return <Accessibility size={size} />;
    case "drink":
      return <Coffee size={size} />;
    case "food":
      return <Utensils size={size} />;
    case "fridge":
      return <Refrigerator size={size} />;
    case "atk":
      return <PenTool size={size} />;
    case "printer":
      return <Printer size={size} />;
    case "logistics":
      return <Tags size={size} />;
    case "security":
      return <ShieldCheck size={size} />;
    case "stream":
      return <Radio size={size} />;
    case "lang":
      return <Languages size={size} />;
    case "stage":
      return <Layers size={size} />;
    case "vip":
      return <UserCheck size={size} />;
    case "video":
      return <Monitor size={size} />;
    case "computer":
      return <PcCase size={size} />;
    case "car":
      return <Car size={size} />;
    case "zap":
      return <Zap size={size} />;
    case "box":
      return <Box size={size} />;
    case "square":
      return <Square size={size} />;

    default:
      return <AlertCircle size={size} />;
  }
};
