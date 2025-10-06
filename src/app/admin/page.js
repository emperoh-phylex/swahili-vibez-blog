"use client";

import { useState } from "react";
import { supabase } from "../../lib/Supabase";

export default function AdminPage() {
  const [mode, setMode] = useState("posts");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [link, setLink] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem("adminLoggedIn", "true");
    } else {
      alert("❌ Incorrect password!");
    }
  };

  // Persist session (so you don’t log in every refresh)
  if (typeof window !== "undefined" && localStorage.getItem("adminLoggedIn") === "true" && !isAuthenticated) {
    setIsAuthenticated(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "posts") {
      const { data, error } = await supabase
        .from("posts")
        .insert([{ title, summary, content, image }]);

      if (error) {
        console.error("Supabase insert error:", error);
        alert("❌ Failed to add post");
      } else {
        alert("✅ Post added successfully!");
        setTitle("");
        setSummary("");
        setContent("");
        setImage("");
      }
    } else if (mode === "events") {
      const { data, error } = await supabase
        .from("events")
        .insert([{ title, date, link, summary }]);

      if (error) {
        console.error("Supabase insert error:", error);
        alert("❌ Failed to add event");
      } else {
        alert("✅ Event added successfully!");
        setTitle("");
        setDate("");
        setLink("");
        setSummary("");
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-orange-100 to-yellow-200">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Login</h2>
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-br from-orange-50 to-yellow-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-orange-700">Admin Dashboard</h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setMode("posts")}
          className={`px-4 py-2 rounded-l-lg ${mode === "posts" ? "bg-orange-600 text-white" : "bg-white text-orange-600 border"}`}
        >
          Add Post
        </button>
        <button
          onClick={() => setMode("events")}
          className={`px-4 py-2 rounded-r-lg ${mode === "events" ? "bg-orange-600 text-white" : "bg-white text-orange-600 border"}`}
        >
          Add Event
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />

        {mode === "posts" ? (
          <>
            <input
              type="text"
              placeholder="Summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full p-2 border rounded mb-3"
              required
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded mb-3"
              rows="5"
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Date (e.g. 2025-10-15)"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded mb-3"
              required
            />
            <input
              type="text"
              placeholder="Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />
            <textarea
              placeholder="Event Description"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full p-2 border rounded mb-3"
              rows="4"
              required
            />
          </>
        )}

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
        >
          {mode === "posts" ? "Add Post" : "Add Event"}
        </button>
      </form>
    </div>
  );
}
