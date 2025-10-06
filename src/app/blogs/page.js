"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/Supabase";
import { motion } from "framer-motion";

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("events").select("*").order("date", { ascending: true });

      if (error) {
        console.error("Error fetching events:", error.message);
      } else {
        setEvents(data);
      }
    };

    fetchEvents();
  }, []);

  if (!events.length) return <p className="text-center mt-10 text-gray-600">No upcoming events yet.</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold text-blue-700 text-center mb-10">
        🎉 Upcoming Events
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            className="bg-gradient-to-br from-blue-50 to-purple-100 shadow-xl rounded-3xl overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            {event.image && (
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-56 object-cover rounded-t-3xl"
              />
            )}

            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-2xl font-bold text-blue-800">{event.title}</h2>
              <p className="text-gray-500 text-sm mt-1">{event.date}</p>

              <p className="mt-4 text-gray-700 leading-relaxed flex-grow">
                {event.description}
              </p>

              {event.link && (
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block bg-blue-600 text-white text-center py-2 px-4 rounded-xl hover:bg-blue-700 transition"
                >
                  Visit Event Page
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
