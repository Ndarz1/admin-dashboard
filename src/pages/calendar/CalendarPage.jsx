import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const CalendarPage = () => {
  const events = [
    {
      title: "Meeting - Lab 1",
      start: new Date().toISOString().split("T")[0] + "T10:00:00",
      end: new Date().toISOString().split("T")[0] + "T12:00:00",
      backgroundColor: "#be123c",
      borderColor: "#be123c",
    },
    {
      title: "Seminar - Aula",
      start: new Date(Date.now() + 86400000).toISOString().split("T")[0],
      backgroundColor: "#1f2937",
      borderColor: "#1f2937",
    },
    {
      title: "Maintenance - Lab Jaringan",
      start: new Date(Date.now() + 172800000).toISOString().split("T")[0],
      backgroundColor: "#b91c1c",
      borderColor: "#b91c1c",
    },
  ];

  return (
    <div className="w-full fade-in pb-20 font-sans text-gray-800">
      <style>{`
        .fc-toolbar-title {
            font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
            font-size: 1.5rem !important;
            color: #111827;
        }
        .fc-button-primary {
            background-color: white !important;
            border-color: #e5e7eb !important;
            color: #374151 !important;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-size: 0.75rem !important;
            font-weight: 600 !important;
            padding: 0.5rem 1rem !important;
            box-shadow: none !important;
            transition: all 0.2s;
        }
        .fc-button-primary:hover, .fc-button-primary.fc-button-active {
            background-color: #be123c !important;
            border-color: #be123c !important;
            color: white !important;
        }
        .fc-daygrid-day.fc-day-today {
            background-color: #fff1f2 !important;
        }
        .fc-event {
            border-radius: 2px;
            font-size: 0.75rem;
            padding: 2px 4px;
            border: none;
            cursor: pointer;
        }
        .fc-col-header-cell-cushion {
            text-transform: uppercase;
            font-size: 0.75rem;
            letter-spacing: 0.1em;
            color: #6b7280;
            padding-bottom: 10px !important;
        }
        .fc-theme-standard td, .fc-theme-standard th {
            border-color: #f3f4f6;
        }
      `}</style>

      <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-6 gap-4 mb-10">
        <div>
          <h2 className="text-4xl font-serif text-gray-900 tracking-tight">
            Schedule Overview
          </h2>
          <p className="text-gray-500 mt-2 font-light tracking-wide">
            Manage room availability and upcoming events.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-ruby-red-600 rounded-full"></div>
            <span className="text-xs uppercase tracking-wider text-gray-500">
              Booked
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
            <span className="text-xs uppercase tracking-wider text-gray-500">
              Event
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-700 rounded-full"></div>
            <span className="text-xs uppercase tracking-wider text-gray-500">
              Maintenance
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-500">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          height="auto"
          contentHeight={600}
          editable={true}
          selectable={true}
          dayMaxEvents={true}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
