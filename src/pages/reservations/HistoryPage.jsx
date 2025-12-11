import React, { useState } from "react";
import HistoryTableRow from "../../components/reservations/HistoryTableRow";

const HistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const historyData = [
    {
      id: 101,
      user: "Himpunan Mahasiswa TI",
      room: "Aula Serbaguna",
      date: "10 Dec 2025",
      time: "08:00 - 12:00",
      status: "Approved",
      actionBy: "Admin",
      actionDate: "05 Dec 2025",
    },
    {
      id: 102,
      user: "Dosen Tamu (Mr. John)",
      room: "Ruang Rapat Utama",
      date: "09 Dec 2025",
      time: "09:00 - 11:00",
      status: "Done",
      actionBy: "System",
      actionDate: "09 Dec 2025",
    },
    {
      id: 103,
      user: "Mahasiswa Semester 1",
      room: "Laboratorium Jaringan",
      date: "08 Dec 2025",
      time: "13:00 - 15:00",
      status: "Rejected",
      actionBy: "Admin",
      actionDate: "01 Dec 2025",
    },
    {
      id: 104,
      user: "UKM Musik",
      room: "Aula Serbaguna",
      date: "01 Dec 2025",
      time: "15:00 - 18:00",
      status: "Cancelled",
      actionBy: "User",
      actionDate: "30 Nov 2025",
    },
  ];

  const filteredHistory = historyData.filter(
    (item) =>
      item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.room.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full fade-in pb-20 font-sans text-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-6 gap-4 mb-10">
        <div>
          <h2 className="text-4xl font-serif text-gray-900 tracking-tight">
            Reservation Archives
          </h2>
          <p className="text-gray-500 mt-2 font-light tracking-wide">
            A complete history of all past bookings and decisions.
          </p>
        </div>

        <div className="relative w-full md:w-64 group">
          <input
            type="text"
            placeholder="Search archive..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-b border-gray-300 py-2 pr-8 text-sm focus:outline-none focus:border-ruby-red-600 transition-colors"
          />
          <svg
            className="w-4 h-4 text-gray-400 absolute right-0 top-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-500">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-6 text-xs uppercase tracking-[0.15em] text-gray-400 font-medium">
                  Guest / User
                </th>
                <th className="py-4 px-6 text-xs uppercase tracking-[0.15em] text-gray-400 font-medium">
                  Room & Time
                </th>
                <th className="py-4 px-6 text-xs uppercase tracking-[0.15em] text-gray-400 font-medium">
                  Processed By
                </th>
                <th className="py-4 px-6 text-xs uppercase tracking-[0.15em] text-gray-400 font-medium text-right">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((item) => (
                  <HistoryTableRow key={item.id} item={item} />
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="py-10 text-center text-gray-400 text-sm"
                  >
                    No records found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 bg-gray-50/30">
          <span className="text-xs text-gray-400">
            Showing {filteredHistory.length} records
          </span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 text-xs border border-gray-200 text-gray-500 hover:bg-white transition-colors disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button className="px-3 py-1 text-xs border border-gray-200 text-gray-500 hover:bg-white transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
