"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TrendingSwiper({ posts = [], events = [] }) {
  const items = [...posts, ...events];
  const [current, setCurrent] = useState(0);

  // ✅ Auto slide every 4 seconds
  useEffect(() => {
    if (items.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, 4000); // ← Changed from 2000ms to 4000ms
    return () => clearInterval(interval);
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No trending posts or events yet.
      </div>
    );
  }

  const currentItem = items[current];

  return (
    <div className="relative h-[320px] md:h-[380px] w-full overflow-hidden rounded-2xl shadow-xl bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex flex-col md:flex-row items-center justify-between p-6 md:p-10 text-center md:text-left"
        >
          {/* 🖼️ Image Section */}
          {currentItem.image && (
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="w-full md:w-1/2 h-56 md:h-64 object-cover rounded-2xl shadow-md mb-4 md:mb-0 hover:scale-105 transition-transform duration-700"
            />
          )}

          {/* 🧠 Content Section */}
          <div className="md:w-1/2 md:pl-8">
            <h3 className="text-2xl font-bold text-indigo-700 mb-2">
              {currentItem.title}
            </h3>
            <p className="text-gray-700 text-sm md:text-base mb-3 line-clamp-4">
              {currentItem.description}
            </p>
            <p className="text-indigo-500 font-medium text-sm">
              {currentItem.date
                ? `📅 ${new Date(currentItem.date).toLocaleDateString()}`
                : "✨ Trending Now"}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 🔘 Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current ? "bg-indigo-600 scale-110" : "bg-indigo-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
