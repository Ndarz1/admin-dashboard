import React from "react";
import AnalyticsCharts from "../../components/analytics/AnalyticsCharts";
import RecentReportsTable from "../../components/analytics/RecentReportsTable";

const ReportsPage = () => {
  return (
    <div className="w-full fade-in pb-20 font-sans text-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-6 gap-4 mb-10">
        <div>
          <h2 className="text-4xl font-serif text-gray-900 tracking-tight">
            Reports & Insights
          </h2>
          <p className="text-gray-500 mt-2 font-light tracking-wide">
            Analyze facility usage and export data for administration.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 text-xs uppercase tracking-[0.2em] text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors bg-white">
            <span>Date Range</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <button className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 text-xs uppercase tracking-[0.2em] hover:bg-ruby-red-600 transition-colors shadow-lg">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      <AnalyticsCharts />

      <RecentReportsTable />
    </div>
  );
};

export default ReportsPage;
