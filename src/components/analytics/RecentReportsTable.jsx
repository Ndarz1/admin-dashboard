import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const RecentReportsTable = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "http://localhost:5000/api/analytics/reports",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const json = await response.json();

      if (json.success) {
        setReports(json.data);
      }
    } catch (error) {
      console.error("Failed to fetch reports", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDownload = (fileName) => {
    Swal.fire({
      title: "Downloading...",
      text: `Starting download for ${fileName}`,
      timer: 1500,
      showConfirmButton: false,
      icon: "success",
    });
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-400">Loading reports...</div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 p-8 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-serif text-gray-900">Generated Reports</h3>
        <button className="text-xs uppercase tracking-widest text-ruby-red-600 hover:text-gray-900 transition-colors">
          View Archive
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-xs uppercase tracking-widest text-gray-400">
              <th className="pb-4 font-medium">File Name</th>
              <th className="pb-4 font-medium">Generated On</th>
              <th className="pb-4 font-medium">Size</th>
              <th className="pb-4 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {reports.map((file) => (
              <tr
                key={file.id}
                className="group hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 flex items-center gap-3">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded text-xs font-bold ${
                      file.type === "PDF"
                        ? "bg-red-50 text-red-600"
                        : "bg-green-50 text-green-600"
                    }`}
                  >
                    {file.type}
                  </div>
                  <span className="text-sm font-medium text-gray-700 font-serif">
                    {file.name}
                  </span>
                </td>
                <td className="py-4 text-xs text-gray-500">{file.date}</td>
                <td className="py-4 text-xs text-gray-500">{file.size}</td>
                <td className="py-4 text-right">
                  <button
                    onClick={() => handleDownload(file.name)}
                    className="text-gray-400 hover:text-ruby-red-600 transition-colors"
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
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentReportsTable;
