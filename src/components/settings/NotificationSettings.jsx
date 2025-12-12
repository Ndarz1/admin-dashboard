import React, { useState } from "react";

const ToggleItem = ({ label, desc, active, onClick }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-none">
    <div>
      <p className="text-sm font-medium text-gray-800">{label}</p>
      <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
    </div>
    <button
      onClick={onClick}
      className={`w-11 h-6 rounded-full flex items-center transition-colors duration-300 px-1 ${
        active ? "bg-ruby-red-600" : "bg-gray-200"
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${
          active ? "translate-x-5" : "translate-x-0"
        }`}
      ></div>
    </button>
  </div>
);

const NotificationSettings = () => {
  const [toggles, setToggles] = useState({
    emailRequest: true,
    emailApprove: false,
    pushReminder: true,
    weeklyReport: true,
  });

  const handleToggle = (key) =>
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="animate-fade-in-up">
      <h3 className="text-xl font-serif text-gray-900 mb-6">Notifications</h3>
      <div className="bg-white rounded-lg">
        <ToggleItem
          label="New Request Alerts"
          desc="Receive email when a new reservation is made."
          active={toggles.emailRequest}
          onClick={() => handleToggle("emailRequest")}
        />
        <ToggleItem
          label="Approval Confirmation"
          desc="Notify me when I approve or reject a request."
          active={toggles.emailApprove}
          onClick={() => handleToggle("emailApprove")}
        />
        <ToggleItem
          label="Push Reminders"
          desc="Browser notifications for upcoming schedules."
          active={toggles.pushReminder}
          onClick={() => handleToggle("pushReminder")}
        />
        <ToggleItem
          label="Weekly Report"
          desc="Send summary statistics every Monday."
          active={toggles.weeklyReport}
          onClick={() => handleToggle("weeklyReport")}
        />
      </div>
    </div>
  );
};

export default NotificationSettings;
