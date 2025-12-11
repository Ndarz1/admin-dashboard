import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AnimatePresence } from "framer-motion";
import RequestCard from "../../components/reservations/RequestCard";

const MySwal = withReactContent(Swal);

const RequestPage = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      user: "Ahmad Dahlan",
      role: "Mahasiswa - Informatika",
      room: "Laboratorium Komputer 1",
      date: "12 Dec 2025",
      time: "08:00 - 10:00",
      purpose: "Praktikum Pemrograman Web Lanjut",
      pax: 35,
      status: "Pending",
      avatar: "AD",
    },
    {
      id: 2,
      user: "Dr. Siti Aminah",
      role: "Dosen - Kedokteran",
      room: "Ruang Rapat Utama",
      date: "13 Dec 2025",
      time: "13:00 - 15:00",
      purpose: "Rapat Koordinasi Akreditasi",
      pax: 12,
      status: "Pending",
      avatar: "SA",
    },
    {
      id: 3,
      user: "BEM Fakultas",
      role: "Organisasi Mahasiswa",
      room: "Aula Serbaguna",
      date: "15 Dec 2025",
      time: "08:00 - 16:00",
      purpose: "Seminar Nasional Teknologi",
      pax: 150,
      status: "Pending",
      avatar: "BF",
    },
  ]);

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
      customClass: {
        popup: "rounded-none font-sans",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setRequests((prev) => prev.filter((req) => req.id !== id));

        MySwal.fire({
          title: action === "approve" ? "Access Granted" : "Declined",
          text: "The request has been processed successfully.",
          icon: "success",
          confirmButtonColor: "#be123c",
          timer: 2000,
          timerProgressBar: true,
        });
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
            {requests.length}
          </span>
        </div>
      </div>

      {requests.length === 0 ? (
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
