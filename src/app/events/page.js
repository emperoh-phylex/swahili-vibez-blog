"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/Supabase";

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase.from("events").select("*");
      setEvents(data || []);
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-orange-600 mb-8">Upcoming Events</h1>
      <div className="space-y-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-all">
            <h2 className="text-2xl font-semibold">{event.title}</h2>
            <p className="text-gray-500">{event.date}</p>
            <a href={event.link} target="_blank" className="text-pink-600 underline mt-2 block">
              Learn More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
