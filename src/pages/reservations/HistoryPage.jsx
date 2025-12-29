import React, { useState, useEffect } from "react";
import HistoryTableRow from "../../components/reservations/HistoryTableRow";
import { ShieldAlert } from "lucide-react";

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const response = await fetch("http://localhost:5000/api/reservations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const contentType = response.headers.get("content-type");

        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server response is not JSON");
        }

        const json = await response.json();

        if (json.success) {
          const formattedData = json.data.map((item) => {
            let manualName = null;

            if (item.purpose && item.purpose.includes("[Data Pemohon]")) {
              const details = item.purpose.split("[Data Pemohon]")[1];
              const nameMatch = details.match(/Nama:\s*(.*)/);
              if (nameMatch) manualName = nameMatch[1].trim();
            }

            return {
              id: item.id,
              user: manualName || (item.user ? item.user.name : "Unknown User"),
              room: item.room ? item.room.name : "Unknown Room",
              date: new Date(item.event_date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }),
              time: `${item.start_time} - ${item.end_time}`,
              status: item.status,
              actionBy: "Admin",
              actionDate: new Date(item.updatedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }),
            };
          });
          setHistoryData(formattedData);
        } else {
          throw new Error(json.message || "Failed to fetch history");
        }
      } catch (err) {
        console.error("Error fetching history:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const filteredHistory = historyData.filter(
    (item) =>
      item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center text-gray-400 gap-4">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-[#967D69] rounded-full animate-spin"></div>
        Loading archives...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center text-center px-6">
        <ShieldAlert size={48} className="text-gray-300 mb-4" />
        <h2 className="text-xl font-serif text-gray-800 mb-2">
          Unable to Load History
        </h2>
        <p className="text-gray-500 text-sm mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-[#967D69] font-bold text-xs hover:underline uppercase tracking-widest"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full fade-in pb-20 font-sans text-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-6 gap-4 mb-10">
        <div>
          <h2 className="text-4xl font-serif text-gray-900 tracking-tight">
            Reservation Archives
          </h2>
          <p className="text-gray-500 mt-2 font-light tracking-wide">
            A complete history of all past bookings.
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
