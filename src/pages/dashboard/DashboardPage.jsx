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
  const stats = [
    {
      title: "Total Reservations",
      value: "124",
      desc: "Current Month",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
    {
      title: "Pending Requests",
      value: "3",
      desc: "Requires Action",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Active Rooms",
      value: "5",
      desc: "Currently Occupied",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      title: "Total Guests",
      value: "450",
      desc: "Registered Members",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
  ];

  const recentBookings = [
    {
      id: 1,
      user: "Ahmad Dahlan",
      room: "Lab Komputer 1",
      date: "12 Dec",
      time: "08:00",
      status: "Approved",
    },
    {
      id: 2,
      user: "Siti Aminah",
      room: "Ruang Rapat A",
      date: "13 Dec",
      time: "13:00",
      status: "Pending",
    },
    {
      id: 3,
      user: "Budi Santoso",
      room: "Lab Jaringan",
      date: "14 Dec",
      time: "09:00",
      status: "Pending",
    },
    {
      id: 4,
      user: "Dewi Putri",
      room: "Aula Utama",
      date: "15 Dec",
      time: "08:00",
      status: "Rejected",
    },
  ];

  const chartData = [
    { name: "Jul", total: 40 },
    { name: "Agu", total: 30 },
    { name: "Sep", total: 98 },
    { name: "Okt", total: 110 },
    { name: "Nov", total: 85 },
    { name: "Des", total: 124 },
  ];

  return (
    <div className="flex flex-col gap-10 w-full fade-in pb-10 font-sans text-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-6 gap-4">
        <div>
          <h2 className="text-4xl font-serif text-gray-900 tracking-tight">
            The Dashboard
          </h2>
          <p className="text-gray-500 mt-2 font-light tracking-wide">
            Overview & Performance Metrics.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
              Today
            </p>
            <p className="font-serif text-lg text-gray-700">Dec 12, 2025</p>
          </div>

          <button className="relative p-2 text-gray-400 hover:text-ruby-red-600 transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-ruby-red-600 rounded-full border border-white"></span>
          </button>

          <div className="flex items-center gap-3 border-l border-gray-200 pl-6">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900 tracking-wide">
                Admin
              </p>
              <p className="text-[10px] uppercase tracking-widest text-gray-400">
                Super User
              </p>
            </div>
            <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-serif text-lg">
              A
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 border border-gray-100 flex flex-col justify-between hover:border-ruby-red-600 hover:shadow-lg transition-all duration-500 group"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="p-3 bg-gray-50 text-gray-400 rounded-full group-hover:bg-ruby-red-600 group-hover:text-white transition-colors duration-500">
                {stat.icon}
              </span>
            </div>
            <div>
              <h3 className="text-4xl font-serif text-gray-900 mb-2">
                {stat.value}
              </h3>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-1">
                {stat.title}
              </p>
              <p className="text-[10px] text-gray-400 font-serif italic">
                {stat.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white border border-gray-100 p-8 lg:col-span-2 hover:shadow-md transition-shadow duration-500">
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h3 className="text-lg font-serif text-gray-900">
                Booking Analytics
              </h3>
              <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">
                Monthly Performance
              </p>
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f3f4f6"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#9CA3AF",
                    fontSize: 10,
                    fontFamily: "sans-serif",
                  }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#9CA3AF",
                    fontSize: 10,
                    fontFamily: "sans-serif",
                  }}
                />
                <Tooltip
                  cursor={{ fill: "#f9fafb" }}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    borderRadius: "0px",
                    fontFamily: "serif",
                  }}
                />
                <Bar
                  dataKey="total"
                  fill="#be123c"
                  barSize={30}
                  radius={[0, 0, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-gray-100 p-8 hover:shadow-md transition-shadow duration-500">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-serif text-gray-900">Concierge</h3>
            <button className="text-[10px] uppercase tracking-widest text-ruby-red-600 hover:text-gray-900 transition-colors border-b border-ruby-red-600 pb-0.5 hover:border-gray-900">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <tbody className="divide-y divide-gray-50">
                {recentBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="group hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4">
                      <p className="text-sm font-bold text-gray-800 font-serif">
                        {booking.room}
                      </p>
                      <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
                        {booking.user}
                      </p>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex flex-col items-end gap-1">
                        <span
                          className={`text-[10px] uppercase tracking-widest px-2 py-1 ${
                            booking.status === "Approved"
                              ? "text-green-700 bg-green-50"
                              : booking.status === "Pending"
                                ? "text-yellow-700 bg-yellow-50"
                                : "text-red-700 bg-red-50"
                          }`}
                        >
                          {booking.status}
                        </span>
                        <span className="text-[10px] text-gray-300">
                          {booking.date}, {booking.time}
                        </span>
                      </div>
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
