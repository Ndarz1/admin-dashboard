import React, { useState, useEffect } from "react";
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
  const [trendData, setTrendData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "http://localhost:5000/api/analytics/dashboard",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const json = await response.json();

      if (json.success) {
        setTrendData(json.data.trend || []);
        setPieData(json.data.popularity || []);
      }
    } catch (error) {
      console.error("Failed to fetch analytics", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const COLORS = ["#be123c", "#1f2937", "#9ca3af", "#e5e7eb", "#f87171"];

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 animate-pulse">
        <div className="lg:col-span-2 h-96 bg-gray-100 rounded-lg"></div>
        <div className="h-96 bg-gray-100 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
      <div className="lg:col-span-2 bg-white p-8 border border-gray-100 shadow-sm min-w-0">
        <h3 className="text-lg font-serif text-gray-900 mb-6">
          Weekly Utilization Trend
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
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

      <div className="bg-white p-8 border border-gray-100 shadow-sm min-w-0">
        <h3 className="text-lg font-serif text-gray-900 mb-6">
          Room Popularity
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
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
