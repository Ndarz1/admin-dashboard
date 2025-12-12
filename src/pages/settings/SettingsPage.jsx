import React, { useState } from "react";
import ProfileSettings from "../../components/settings/ProfileSettings";
import NotificationSettings from "../../components/settings/NotificationSettings";
import SecuritySettings from "../../components/settings/SecuritySettings";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="w-full fade-in pb-20 font-sans text-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-6 gap-4 mb-10">
        <div>
          <h2 className="text-4xl font-serif text-gray-900 tracking-tight">
            Settings
          </h2>
          <p className="text-gray-500 mt-2 font-light tracking-wide">
            Manage your account preferences and system configurations.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-64 flex flex-col gap-1 shrink-0">
          {["profile", "notifications", "security", "system"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-left px-4 py-3 text-xs uppercase tracking-[0.2em] border-l-2 transition-all duration-300 ${
                activeTab === tab
                  ? "border-ruby-red-600 text-ruby-red-800 font-bold bg-gray-50"
                  : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex-1 bg-white border border-gray-100 p-8 shadow-sm min-h-125">
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "notifications" && <NotificationSettings />}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "system" && (
            <div className="flex items-center justify-center h-full text-gray-400 flex-col gap-2">
              <svg
                className="w-10 h-10 opacity-20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-xs uppercase tracking-widest">
                System settings coming soon
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
