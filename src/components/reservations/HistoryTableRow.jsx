import React from "react";

const HistoryTableRow = ({ item }) => {
  // Helper untuk menentukan warna badge status
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Approved":
        return "border-green-200 text-green-700 bg-green-50";
      case "Rejected":
        return "border-red-200 text-red-700 bg-red-50";
      case "Done":
        return "border-gray-200 text-gray-600 bg-gray-50";
      default: // Cancelled / Lainnya
        return "border-gray-200 text-gray-400 line-through";
    }
  };

  return (
    <tr className="group hover:bg-gray-50/50 transition-colors">
      <td className="py-5 px-6">
        <p className="font-serif text-gray-900">{item.user}</p>
        <p className="text-[10px] uppercase tracking-wider text-gray-400 mt-1">
          ID: #{item.id}
        </p>
      </td>
      <td className="py-5 px-6">
        <p className="text-sm font-medium text-gray-700">{item.room}</p>
        <p className="text-xs text-gray-400 mt-1">
          {item.date}, {item.time}
        </p>
      </td>
      <td className="py-5 px-6">
        <p className="text-sm text-gray-600">{item.actionBy}</p>
        <p className="text-[10px] text-gray-400 italic">on {item.actionDate}</p>
      </td>
      <td className="py-5 px-6 text-right">
        <span
          className={`inline-block px-3 py-1 text-[10px] uppercase tracking-[0.2em] border ${getStatusBadgeClass(
            item.status,
          )}`}
        >
          {item.status}
        </span>
      </td>
    </tr>
  );
};

export default HistoryTableRow;
