import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AnimatePresence } from "framer-motion";
import RequestCard from "../../components/reservations/RequestCard";

const MySwal = withReactContent(Swal);

const RequestPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch("http://localhost:5000/api/reservations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await response.json();

      if (json.success) {
        const pendingRequests = json.data.filter((r) => r.status === "pending");

        const formattedData = pendingRequests.map((item) => {
          let manualName = null;
          let manualRole = "Mahasiswa";

          if (item.purpose && item.purpose.includes("[Data Pemohon]")) {
            const details = item.purpose.split("[Data Pemohon]")[1];
            const nameMatch = details.match(/Nama:\s*(.*)/);
            if (nameMatch) manualName = nameMatch[1].trim();
          }

          const cleanPurpose = item.purpose
            ? item.purpose.split("[Data Pemohon]")[0].trim()
            : "-";

          return {
            id: item.id,
            user: manualName || (item.user ? item.user.name : "Unknown User"),
            role: manualRole,
            room: item.room ? item.room.name : "Unknown Room",
            date: item.event_date,
            time: `${item.start_time} - ${item.end_time}`,
            purpose: cleanPurpose,
            pax: 50,
            status: item.status,
            avatar: manualName
              ? manualName.charAt(0).toUpperCase()
              : item.user
              ? item.user.name.charAt(0).toUpperCase()
              : "U",
          };
        });

        setRequests(formattedData);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
      MySwal.fire({
        icon: "error",
        title: "Connection Error",
        text: "Failed to load reservation requests.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (id, action) => {
    MySwal.fire({
      title: <p className="font-serif text-2xl text-gray-800">Are you sure?</p>,
      text: `Do you want to ${action} this request?`,
      icon: action === "approve" ? "question" : "warning",
      showCancelButton: true,
      confirmButtonColor: action === "approve" ? "#be123c" : "#374151",
      cancelButtonColor: "#d1d5db",
      confirmButtonText:
        action === "approve" ? "Yes, Grant Access" : "Yes, Decline",
      cancelButtonText: "Cancel",
      input: action === "reject" ? "textarea" : undefined,
      inputPlaceholder: "Reason for rejection...",
      customClass: {
        popup: "rounded-none font-sans",
      },
      preConfirm: (reason) => {
        if (action === "reject" && !reason) {
          Swal.showValidationMessage("Please enter a rejection reason");
        }
        return reason;
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const rejectionReason = result.value;
        const statusPayload = action === "approve" ? "approved" : "rejected";

        const previousRequests = [...requests];
        setRequests((prev) => prev.filter((req) => req.id !== id));

        try {
          const token = localStorage.getItem("authToken");

          const response = await fetch(
            `http://localhost:5000/api/reservations/admin/${id}/status`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                status: statusPayload,
                rejection_reason: rejectionReason,
              }),
            }
          );

          const json = await response.json();

          if (json.success) {
            MySwal.fire({
              title: action === "approve" ? "Access Granted" : "Declined",
              text: "The request has been processed successfully.",
              icon: "success",
              confirmButtonColor: "#be123c",
              timer: 2000,
              timerProgressBar: true,
            });
          } else {
            throw new Error(json.message);
          }
        } catch (error) {
          setRequests(previousRequests);
          MySwal.fire({
            icon: "error",
            title: "Error",
            text: error.message || "Failed to update status",
          });
        }
      }
    });
  };

  return (
    <div className="w-full fade-in pb-20 font-sans text-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-6 gap-4 mb-10">
        <div>
          <h2 className="text-4xl font-serif text-gray-900 tracking-tight">
            Concierge Desk
          </h2>
          <p className="text-gray-500 mt-2 font-light tracking-wide">
            Review and manage incoming reservation requests.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-gray-400">
            Pending Items:
          </span>
          <span className="text-xl font-serif font-bold text-ruby-red-600">
            {loading ? "..." : requests.length}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400 animate-pulse">
          Loading requests data...
        </div>
      ) : requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <svg
            className="w-16 h-16 mb-4 opacity-20"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-sm uppercase tracking-widest">
            All caught up. No pending requests.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <AnimatePresence>
            {requests.map((req) => (
              <RequestCard key={req.id} data={req} onAction={handleAction} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default RequestPage;
