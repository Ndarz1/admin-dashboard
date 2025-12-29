import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import {
  Calendar,
  Users,
  Clock,
  CheckCircle,
  MoreHorizontal,
  Activity,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    stats: { total: 0, hours: 0, occupancy: 0, pending: 0 },
    chartData: [],
    topRooms: [],
    todayEvents: [],
    recentActivity: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/reservations",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const json = await response.json();

        if (json.success) {
          const data = json.data;

          const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          const monthlyCounts = new Array(12).fill(0);
          data.forEach((item) => {
            const d = new Date(item.event_date);
            monthlyCounts[d.getMonth()] += 1;
          });
          const processedChart = months.map((name, index) => ({
            name,
            bookings: monthlyCounts[index],
          }));

          const roomCounts = {};
          data.forEach((item) => {
            const roomName = item.room?.name || "Unknown";
            roomCounts[roomName] = (roomCounts[roomName] || 0) + 1;
          });
          const processedRooms = Object.keys(roomCounts)
            .map((key) => ({ name: key, value: roomCounts[key] }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 4);

          const today = new Date().toISOString().split("T")[0];
          const todays = data
            .filter(
              (item) => item.event_date === today && item.status === "approved"
            )
            .sort((a, b) => a.start_time.localeCompare(b.start_time));

          const totalHours = data.length * 3;

          setDashboardData({
            stats: {
              total: data.length,
              hours: totalHours,
              occupancy: 82,
              pending: data.filter((r) => r.status === "pending").length,
            },
            chartData: processedChart,
            topRooms: processedRooms,
            todayEvents: todays.length > 0 ? todays : [],
            recentActivity: data.slice(0, 5),
          });
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to sync dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FCFCFC]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#967D69] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 animate-pulse">
            Loading System...
          </p>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-8 w-full pb-12 font-sans text-gray-800 bg-[#FCFCFC] min-h-screen">
      <Toaster position="top-center" />

      {/* HEADER SECTION - No Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-end pb-8 border-b border-gray-100">
        <div>
          <h1 className="text-3xl lg:text-4xl font-serif font-medium text-gray-900 tracking-tight">
            Campus Overview
          </h1>
          <p className="text-gray-400 mt-2 text-sm font-light tracking-wide">
            Welcome back, Administrator. Real-time facility utilization
            insights.
          </p>
        </div>

        {/* Date Display */}
        <div className="text-right hidden sm:block">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">
            Current Session
          </p>
          <p className="font-serif text-lg text-gray-800">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* STATS MATRIX */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Utilization",
            val: `${dashboardData.stats.hours.toLocaleString()} Hours`,
            sub: "Total usage time this year",
            icon: <Activity size={20} />,
            color: "text-[#967D69]",
          },
          {
            label: "Occupancy Rate",
            val: `${dashboardData.stats.occupancy}%`,
            sub: "High demand period",
            icon: <CheckCircle size={20} />,
            color: "text-emerald-700",
          },
          {
            label: "Pending Approvals",
            val: dashboardData.stats.pending,
            sub: "Requires verification",
            icon: <Clock size={20} />,
            color: "text-amber-600",
          },
          {
            label: "Total Events",
            val: dashboardData.stats.total,
            valSize: "text-3xl",
            sub: "Academic & Non-Academic",
            icon: <Calendar size={20} />,
            color: "text-gray-900",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#967D69]/30 transition-all duration-500 group relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4 relative z-10">
              <span
                className={`p-3 bg-gray-50 rounded-full ${item.color} group-hover:bg-white transition-colors`}
              >
                {item.icon}
              </span>
            </div>
            <div className="relative z-10">
              <h3
                className={`font-serif text-gray-900 mb-2 ${
                  item.valSize || "text-2xl"
                }`}
              >
                {item.val}
              </h3>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-[#967D69] transition-colors">
                {item.label}
              </p>
              <p className="text-xs text-gray-400 mt-2 font-light italic">
                {item.sub}
              </p>
            </div>
            {/* Background Decoration */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gray-50 rounded-full group-hover:bg-[#967D69]/5 transition-colors duration-500 z-0" />
          </div>
        ))}
      </div>

      {/* CHART & POPULAR ROOMS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CHART: Activity Trends */}
        <div className="bg-white border border-gray-100 p-8 lg:col-span-2 shadow-sm relative">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-serif text-gray-900">
                Activity Trends
              </h3>
              <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">
                Reservation Volume per Month
              </p>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dashboardData.chartData}>
                <defs>
                  <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#967D69" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#967D69" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0",
                    fontFamily: "serif",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="bookings"
                  stroke="#967D69"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorVol)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* MOST POPULAR ROOMS */}
        <div className="bg-white border border-gray-100 p-8 shadow-sm flex flex-col">
          <h3 className="text-xl font-serif text-gray-900 mb-1">
            Top Facilities
          </h3>
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-8">
            Most Frequently Booked
          </p>
          <div className="flex-grow w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={dashboardData.topRooms}
                barSize={20}
              >
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  width={100}
                  tick={{
                    fill: "#4B5563",
                    fontSize: 11,
                    fontFamily: "serif",
                    fontWeight: 600,
                  }}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{ fontFamily: "serif" }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {dashboardData.topRooms.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? "#967D69" : "#E5E7EB"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              <span className="font-bold text-[#967D69]">
                {dashboardData.topRooms[0]?.name}
              </span>{" "}
              is currently the most active facility, hosting{" "}
              <span className="font-bold">major academic events</span>.
            </p>
          </div>
        </div>
      </div>

      {/* AGENDA & RECENT REQUESTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* TODAY'S AGENDA (Dark Theme) */}
        <div className="lg:col-span-1 bg-[#2C2C2C] text-white p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Clock size={120} />
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-serif mb-6 text-[#D4C5B9]">
              Today's Schedule
            </h3>

            {dashboardData.todayEvents.length > 0 ? (
              <div className="space-y-6">
                {dashboardData.todayEvents.map((ev, i) => (
                  <div key={i} className="flex gap-4 items-start group">
                    <div className="w-16 text-right shrink-0">
                      <p className="text-sm font-bold text-white">
                        {ev.start_time}
                      </p>
                      <p className="text-[10px] text-gray-400">{ev.end_time}</p>
                    </div>
                    {/* Timeline Line */}
                    <div className="w-[1px] bg-gray-600 group-last:bg-transparent relative h-full">
                      <div className="absolute top-1.5 -left-[3px] w-1.5 h-1.5 bg-[#967D69] rounded-full" />
                    </div>
                    <div className="pb-6">
                      <p className="text-sm font-serif text-[#F3F4F6]">
                        {ev.room?.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {ev.user?.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-40 flex flex-col items-center justify-center text-gray-500">
                <Calendar size={32} className="mb-2 opacity-50" />
                <p className="text-xs uppercase tracking-widest">
                  No Events Scheduled
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RECENT REQUESTS TABLE */}
        <div className="lg:col-span-2 bg-white border border-gray-100 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-serif text-gray-900">
                Incoming Requests
              </h3>
              <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">
                Latest academic & organization bookings
              </p>
            </div>
            <button className="text-gray-400 hover:text-[#967D69] transition-colors">
              <MoreHorizontal size={24} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-[10px] uppercase tracking-widest text-gray-400">
                  <th className="pb-4 font-normal">Applicant</th>
                  <th className="pb-4 font-normal">Facility</th>
                  <th className="pb-4 font-normal">Schedule</th>
                  <th className="pb-4 font-normal text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {dashboardData.recentActivity.map((booking) => (
                  <tr
                    key={booking.id}
                    className="group hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-5 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-serif font-bold text-gray-600">
                          {booking.user?.name?.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 font-serif">
                            {booking.user?.name}
                          </p>
                          <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                            {booking.user?.department || "Student"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 text-sm text-gray-600 font-light">
                      {booking.room?.name}
                    </td>
                    <td className="py-5 text-sm text-gray-600 font-light">
                      {booking.event_date}{" "}
                      <span className="text-gray-300 mx-1">|</span>{" "}
                      {booking.start_time}
                    </td>
                    <td className="py-5 text-right">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                          booking.status === "approved"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : booking.status === "pending"
                            ? "bg-amber-50 text-amber-700 border-amber-100"
                            : "bg-red-50 text-red-700 border-red-100"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            booking.status === "approved"
                              ? "bg-emerald-500"
                              : booking.status === "pending"
                              ? "bg-amber-500"
                              : "bg-red-500"
                          }`}
                        />
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
