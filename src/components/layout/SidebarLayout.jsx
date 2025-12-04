import React from "react";
import { Outlet } from "react-router-dom"; // 1. Import Outlet
import logo from "../../assets/logo.png";

const SidebarLayout = () => {
  return (
    <section className="flex bg-ruby-red-50 min-h-screen">
      <aside className="w-64 pt-8 pb-0 px-6 h-screen sticky top-0 flex flex-col bg-white border-r border-gray-200">
        <div className="flex gap-4 items-center justify-center flex-row mb-10">
          <img src={logo} alt="logo" className="w-10 h-auto" />
          <h1 className="text-4xl font-serif font-bold text-ruby-red-600">
            SRR
          </h1>
        </div>
        <div className="flex-1"></div>
      </aside>
      <main className="flex-1 overflow-y-auto h-screen">
        <Outlet />
      </main>
    </section>
  );
};

export default SidebarLayout;
