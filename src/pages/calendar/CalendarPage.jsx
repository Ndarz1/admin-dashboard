import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  User,
  X,
  AlignLeft,
} from "lucide-react";

const CalendarPage = () => {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentDateTitle, setCurrentDateTitle] = useState("");

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:5000/api/reservations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await response.json();

      if (json.success) {
        const approvedReservations = json.data.filter(
          (r) => r.status === "approved"
        );

        const formattedEvents = approvedReservations.map((res) => {
          return {
            id: res.id,
            title: res.room ? res.room.name : "Unknown Room",
            start: `${res.event_date}T${res.start_time}`,
            end: `${res.event_date}T${res.end_time}`,
            backgroundColor: "#967D69",
            borderColor: "#967D69",
            extendedProps: {
              purpose: res.purpose,
              user: res.user ? res.user.name : "Unknown",
              department: res.user ? res.user.department : "-",
              roomCategory: res.room ? res.room.category : "General",
              location: res.room ? res.room.location : "",
            },
          };
        });

        setEvents(formattedEvents);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
    updateTitle(calendarApi);
  };

  const handleNext = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next();
    updateTitle(calendarApi);
  };

  const handleToday = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.today();
    updateTitle(calendarApi);
  };

  const updateTitle = (api) => {
    setCurrentDateTitle(api.view.title);
  };

  useEffect(() => {
    if (calendarRef.current) {
      updateTitle(calendarRef.current.getApi());
    }
  }, [loading]);

  const handleEventClick = (info) => {
    setSelectedEvent({
      title: info.event.title,
      start: info.event.start,
      end: info.event.end,
      ...info.event.extendedProps,
    });
    setIsDrawerOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-[#FDFDFD] font-sans text-gray-800 relative overflow-hidden">
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full md:w-[400px] bg-white shadow-2xl transform transition-transform duration-500 ease-in-out ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedEvent && (
          <div className="h-full flex flex-col">
            <div className="p-8 bg-[#967D69] text-white relative">
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <p className="text-xs uppercase tracking-[0.2em] opacity-80 mb-2">
                Event Details
              </p>
              <h3 className="text-2xl font-serif leading-tight">
                {selectedEvent.title}
              </h3>
              <div className="flex items-center gap-2 mt-4 text-white/90 text-sm">
                <MapPin size={14} />
                <span>{selectedEvent.location}</span>
              </div>
            </div>

            <div className="p-8 flex-1 overflow-y-auto">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-[#967D69] shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                      Time & Date
                    </p>
                    <p className="font-medium text-gray-900">
                      {selectedEvent.start.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedEvent.start.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -
                      {selectedEvent.end
                        ? selectedEvent.end.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-[#967D69] shrink-0">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                      Booked By
                    </p>
                    <p className="font-medium text-gray-900">
                      {selectedEvent.user}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedEvent.department}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-[#967D69] shrink-0">
                    <AlignLeft size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                      Purpose
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed italic">
                      "
                      {selectedEvent.purpose
                        ? selectedEvent.purpose.split("[Data Pemohon]")[0]
                        : "-"}
                      "
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-full py-3 border border-gray-300 text-gray-600 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:border-[#967D69] hover:text-[#967D69] transition-all"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      <div className="pb-10">
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-8 mb-8 gap-6">
          <div>
            <h2 className="text-3xl lg:text-4xl font-serif text-gray-900 tracking-tight">
              Event Calendar
            </h2>
            <p className="text-gray-500 mt-2 font-light tracking-wide text-sm">
              Manage and view room occupancies.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center bg-white border border-gray-200 rounded-sm shadow-sm">
              <button
                onClick={handlePrev}
                className="p-3 hover:bg-gray-50 text-gray-600 hover:text-[#967D69] transition-colors border-r border-gray-100"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleToday}
                className="px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-50 text-gray-600 hover:text-[#967D69] transition-colors"
              >
                Today
              </button>
              <button
                onClick={handleNext}
                className="p-3 hover:bg-gray-50 text-gray-600 hover:text-[#967D69] transition-colors border-l border-gray-100"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="hidden md:block text-right min-w-[150px]">
              <p className="text-xl font-serif text-gray-900">
                {currentDateTitle}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-2 md:p-8 border border-gray-100 shadow-sm relative">
          <style>{`
            .fc { font-family: 'Inter', sans-serif; }
            .fc-theme-standard td, .fc-theme-standard th { border-color: #f3f4f6; }
            .fc-col-header-cell-cushion { 
              padding: 16px 0 !important; 
              text-transform: uppercase; 
              font-size: 11px; 
              letter-spacing: 0.1em; 
              color: #9CA3AF; 
              font-weight: 600;
            }
            .fc-daygrid-day-number {
              font-family: 'Playfair Display', serif;
              font-size: 14px;
              color: #374151;
              padding: 8px 12px !important;
            }
            .fc-day-today { background-color: #FAFAF9 !important; }
            .fc-event {
              border: none;
              border-radius: 0px;
              padding: 4px 8px;
              font-size: 11px;
              letter-spacing: 0.05em;
              box-shadow: 0 2px 4px rgba(0,0,0,0.05);
              transition: all 0.3s ease;
            }
            .fc-event:hover {
              transform: translateY(-1px);
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              filter: brightness(110%);
            }
            .fc-header-toolbar { display: none !important; } 
          `}</style>

          {loading && (
            <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-[#967D69] border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs uppercase tracking-widest text-[#967D69]">
                  Loading...
                </span>
              </div>
            </div>
          )}

          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            height="auto"
            contentHeight={700}
            editable={false}
            selectable={true}
            dayMaxEvents={3}
            eventClick={handleEventClick}
            eventDisplay="block"
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
