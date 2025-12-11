import React from "react";
import { motion } from "framer-motion";

const RequestCard = ({ data, onAction }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
      className="group bg-white border border-gray-100 p-6 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between hover:shadow-lg hover:border-ruby-red-600/30 transition-shadow duration-500 relative overflow-hidden"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-ruby-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="flex items-center gap-4 min-w-[250px]">
        <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-serif text-lg shrink-0">
          {data.avatar}
        </div>
        <div>
          <h3 className="font-serif text-lg text-gray-900 leading-tight">
            {data.user}
          </h3>
          <p className="text-[10px] uppercase tracking-wider text-gray-400 mt-1">
            {data.role}
          </p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-widest text-gray-400">
            Requested Space
          </span>
          <p className="text-sm font-medium text-gray-800 flex items-center gap-2">
            <svg
              className="w-4 h-4 text-ruby-red-600"
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
            {data.room}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-widest text-gray-400">
            Date & Time
          </span>
          <p className="text-sm font-medium text-gray-800">
            {data.date} <span className="text-gray-300 mx-1">|</span>{" "}
            {data.time}
          </p>
        </div>
        <div className="flex flex-col gap-1 md:col-span-2">
          <span className="text-[10px] uppercase tracking-widest text-gray-400">
            Purpose
          </span>
          <p className="text-sm text-gray-600 italic font-serif">
            "{data.purpose}" —{" "}
            <span className="not-italic font-sans text-xs text-gray-400">
              {data.pax} Pax
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0 w-full lg:w-auto mt-4 lg:mt-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100">
        <button
          onClick={() => onAction(data.id, "reject")}
          className="flex-1 lg:flex-none px-6 py-2 text-xs uppercase tracking-widest text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors border border-transparent hover:border-red-100"
        >
          Decline
        </button>
        <button
          onClick={() => onAction(data.id, "approve")}
          className="flex-1 lg:flex-none px-8 py-3 text-xs uppercase tracking-widest bg-gray-900 text-white hover:bg-ruby-red-600 transition-colors shadow-lg shadow-gray-200 hover:shadow-ruby-red-200"
        >
          Grant Access
        </button>
      </div>
    </motion.div>
  );
};

export default RequestCard;
