"use client";

import { useState } from "react";
import { supabase } from "../../lib/Supabase";

export default function AdminPage() {
  const [mode, setMode] = useState("posts");
  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    image: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const table = mode === "posts" ? "posts" : "events";

    const dataToInsert =
      mode === "posts"
        ? {
            title: form.title,
            summary: form.summary,
            content: form.content,
            image: form.image,
          }
        : {
            title: form.title,
            description: form.description,
            date: form.date,
            image: form.image,
          };

    const { data, error } = await supabase.from(table).insert([dataToInsert]);

    if (error) {
      console.error("Supabase insert error:", error);
      alert("❌ Failed to add item — check console for details.");
    } else {
      console.log("✅ Inserted:", data);
      alert(`✅ ${mode === "posts" ? "Post" : "Event"} added successfully!`);
      setForm({
        title: "",
        summary: "",
        content: "",
        image: "",
        date: "",
        description: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Admin Dashboard
        </h1>

        <div className="flex justify-center mb-6 gap-4">
          <button
            className={`px-6 py-2 rounded-lg font-semibold ${
              mode === "posts"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setMode("posts")}
          >
            Manage Posts
          </button>
          <button
            className={`px-6 py-2 rounded-lg font-semibold ${
              mode === "events"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setMode("events")}
          >
            Manage Events
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Common Fields */}
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />
          <input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          {mode === "posts" ? (
            <>
              <input
                name="summary"
                placeholder="Short Summary"
                value={form.summary}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg"
              />
              <textarea
                name="content"
                placeholder="Full Content"
                value={form.content}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg h-40"
              />
            </>
          ) : (
            <>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg"
              />
              <textarea
                name="description"
                placeholder="Event Description"
                value={form.description}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg h-40"
              />
            </>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all"
          >
            Add {mode === "posts" ? "Post" : "Event"}
          </button>
        </form>
      </div>
    </div>
  );
}
