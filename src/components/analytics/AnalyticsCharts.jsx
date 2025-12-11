import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const AnalyticsCharts = () => {
  const trendData = [
    { name: "Mon", bookings: 12 },
    { name: "Tue", bookings: 19 },
    { name: "Wed", bookings: 15 },
    { name: "Thu", bookings: 25 },
    { name: "Fri", bookings: 32 },
    { name: "Sat", bookings: 20 },
    { name: "Sun", bookings: 8 },
  ];

  const pieData = [
    { name: "Labs", value: 45 },
    { name: "Aula", value: 25 },
    { name: "Meeting", value: 20 },
    { name: "Class", value: 10 },
  ];

  const COLORS = ["#be123c", "#1f2937", "#9ca3af", "#e5e7eb"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
      <div className="lg:col-span-2 bg-white p-8 border border-gray-100 shadow-sm">
        <h3 className="text-lg font-serif text-gray-900 mb-6">
          Weekly Utilization Trend
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#be123c" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#be123c" stopOpacity={0} />
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
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="bookings"
                stroke="#be123c"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorBookings)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-8 border border-gray-100 shadow-sm">
        <h3 className="text-lg font-serif text-gray-900 mb-6">
          Room Popularity
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                formatter={(value) => (
                  <span className="text-xs uppercase tracking-wider text-gray-500 ml-2">
                    {value}
                  </span>
                )}
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
