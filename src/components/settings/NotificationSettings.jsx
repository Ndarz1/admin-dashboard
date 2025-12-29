import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const NotificationSettings = () => {
  const [emailNotif, setEmailNotif] = useState({
    bookings: true,
    cancellations: true,
    reminders: false,
    marketing: false,
  });

  const handleToggle = (key) => {
    setEmailNotif((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    MySwal.fire({
      icon: "success",
      title: "Preferences Saved",
      text: "Your notification settings have been updated.",
      confirmButtonColor: "#be123c",
      timer: 1500,
    });
  };

  return (
    <div className="animate-fade-in-up">
      <h3 className="text-xl font-serif text-gray-900 mb-6">
        Notification Preferences
      </h3>

      <div className="space-y-8">
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4 border-b border-gray-100 pb-2">
            Email Alerts
          </h4>
          <div className="space-y-4">
            {[
              {
                id: "bookings",
                label: "New Booking Confirmation",
                desc: "Receive an email when a new reservation is created.",
              },
              {
                id: "cancellations",
                label: "Booking Cancellations",
                desc: "Get notified when a reservation is cancelled or rejected.",
              },
              {
                id: "reminders",
                label: "Upcoming Reservation Reminders",
                desc: "Receive a reminder 24 hours before the event starts.",
              },
            ].map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between group"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800 font-serif">
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => handleToggle(item.id)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    emailNotif[item.id] ? "bg-ruby-red-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      emailNotif[item.id] ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4 border-b border-gray-100 pb-2">
            Marketing & Updates
          </h4>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-800 font-serif">
                University News & Promotions
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Receive updates about new facilities and semester events.
              </p>
            </div>
            <button
              onClick={() => handleToggle("marketing")}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                emailNotif.marketing ? "bg-ruby-red-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  emailNotif.marketing ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <button
          onClick={handleSave}
          className="bg-gray-900 text-white px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-ruby-red-600 transition-colors shadow-lg"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;
