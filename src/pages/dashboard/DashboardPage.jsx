import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardPage = () => {
  // Data Dummy untuk Statistik Atas
  const stats = [
    {
      title: "Total Reservasi",
      value: "124",
      desc: "Bulan ini",
      color: "bg-blue-500",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
    {
      title: "Menunggu Persetujuan",
      value: "3",
      desc: "Perlu tindakan segera",
      color: "bg-yellow-500",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Sedang Digunakan",
      value: "5",
      desc: "Ruangan aktif sekarang",
      color: "bg-green-500",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      title: "Total Pengguna",
      value: "450",
      desc: "Mahasiswa & Dosen",
      color: "bg-purple-500",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
  ];

  // Data Dummy untuk Tabel
  const recentBookings = [
    {
      id: 1,
      user: "Ahmad Dahlan",
      room: "Lab Komputer 1",
      date: "12 Des 2025",
      time: "08:00 - 10:00",
      status: "Approved",
    },
    {
      id: 2,
      user: "Siti Aminah",
      room: "Ruang Rapat A",
      date: "13 Des 2025",
      time: "13:00 - 15:00",
      status: "Pending",
    },
    {
      id: 3,
      user: "Budi Santoso",
      room: "Lab Jaringan",
      date: "14 Des 2025",
      time: "09:00 - 11:00",
      status: "Pending",
    },
    {
      id: 4,
      user: "Dewi Putri",
      room: "Aula Utama",
      date: "15 Des 2025",
      time: "08:00 - 12:00",
      status: "Rejected",
    },
  ];

  // Data Dummy untuk Grafik
  const chartData = [
    { name: "Jul", total: 40 },
    { name: "Agu", total: 30 },
    { name: "Sep", total: 98 },
    { name: "Okt", total: 110 },
    { name: "Nov", total: 85 },
    { name: "Des", total: 124 },
  ];

  return (
    <div className="flex flex-col gap-8 w-full fade-in pb-10">
      {/* --- HEADER SECTION (New) --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Dashboard Overview
          </h2>
          <p className="text-gray-500">Selamat datang kembali, Admin.</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Tombol Notifikasi */}
          <button className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 relative transition-colors duration-200">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>

          {/* Profil Admin Kecil */}
          <div className="flex items-center gap-3 bg-white pl-2 pr-4 py-1.5 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
            <div className="w-8 h-8 rounded-full bg-ruby-red-100 flex items-center justify-center text-ruby-red-600 font-bold text-sm">
              AD
            </div>
            <div className="text-left hidden md:block">
              <p className="text-sm font-bold text-gray-700 leading-none">
                Admin
              </p>
              <p className="text-[10px] text-gray-400">Super User</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-md transition-shadow duration-300"
          >
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">
                {stat.value}
              </h3>
              <p className="text-xs text-gray-400 mt-1">{stat.desc}</p>
            </div>
            <div
              className={`p-3 rounded-xl ${stat.color} shadow-lg shadow-opacity-20`}
            >
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* --- CHART & TABLE SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Grafik (Kiri) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-800 mb-6">
            Statistik Peminjaman
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: "#F3F4F6" }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar
                  dataKey="total"
                  fill="#E11D48"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Kolom Tabel (Kanan) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">
              Reservasi Terbaru
            </h3>
            <button className="text-sm text-ruby-red-600 hover:text-ruby-red-800 font-medium">
              Lihat Semua
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-3 text-sm font-semibold text-gray-500">
                    Info
                  </th>
                  <th className="py-3 text-sm font-semibold text-gray-500 text-right">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-gray-50 last:border-none"
                  >
                    <td className="py-3">
                      <p className="text-sm font-medium text-gray-800">
                        {booking.room}
                      </p>
                      <p className="text-xs text-gray-500">{booking.user}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {booking.date}, {booking.time}
                      </p>
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className={`inline-block px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          booking.status === "Approved"
                            ? "bg-green-50 text-green-600"
                            : booking.status === "Pending"
                              ? "bg-yellow-50 text-yellow-600"
                              : "bg-red-50 text-red-600"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
