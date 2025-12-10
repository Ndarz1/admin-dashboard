import React from "react";
import { Outlet } from "react-router-dom"; // 1. Import Outlet
import logo from "../../assets/logo.png";

const SidebarLayout = () => {
  return (
    <section className="flex bg-white min-h-screen">
      <aside className="w-64 pt-8 pb-0 px-6 h-screen sticky top-0 flex flex-col bg-white shadow-lg drop-shadow-white">
        <div className="flex gap-4 items-center justify-center flex-row mb-10">
          <img src={logo} alt="logo" className="w-10 h-auto" />
          <h1 className="text-4xl font-serif font-bold text-ruby-red-600">
            SRR
          </h1>
        </div>
        <div className="flex mt-4">
          <h3 className="font-bold font-sans text-ruby-red-600 text-2xl">
            Room Manage
          </h3>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto h-screen p-2">
        <Outlet />
      </main>
    </section>
  );
};

export default SidebarLayout;
