"use client";

import { useState } from "react";
import { supabase } from "../../lib/Supabase"; // make sure this path is correct

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");

  const [mode, setMode] = useState("posts"); // "posts" or "events"

  // Post fields
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  // Event fields
  const [eventTitle, setEventTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [link, setLink] = useState("");

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "1234";

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true);
    } else {
      alert("❌ Incorrect password!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "posts") {
      if (!title || !summary || !content || !image) {
        alert("❌ Please fill all post fields");
        return;
      }

      const { data, error } = await supabase.from("posts").insert([
        { title, summary, content, image },
      ]);

      if (error) {
        console.error("Supabase insert error:", error);
        alert("❌ Failed to add post — check console for details.");
      } else {
        alert("✅ Post added successfully!");
        setTitle("");
        setSummary("");
        setContent("");
        setImage("");
      }
    } else {
      // events
      if (!eventTitle || !description || !date || !link) {
        alert("❌ Please fill all event fields");
        return;
      }

      const { data, error } = await supabase.from("events").insert([
        { title: eventTitle, description, date, link },
      ]);

      if (error) {
        console.error("Supabase insert error:", error);
        alert("❌ Failed to add event — check console for details.");
      } else {
        alert("✅ Event added successfully!");
        setEventTitle("");
        setDescription("");
        setDate("");
        setLink("");
      }
    }
  };

  if (!loggedIn) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Admin Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-2 w-64">
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded"
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Portal</h1>

      <div className="mb-6">
        <button
          className={`p-2 mr-2 rounded ${
            mode === "posts" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setMode("posts")}
        >
          Add Post
        </button>
        <button
          className={`p-2 rounded ${
            mode === "events" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setMode("events")}
        >
          Add Event
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {mode === "posts" ? (
          <>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="p-2 border rounded"
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="p-2 border rounded"
            />
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Event Title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="p-2 border rounded"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Event Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="p-2 border rounded"
            />
          </>
        )}

        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Add {mode === "posts" ? "Post" : "Event"}
        </button>
      </form>
    </div>
  );
}
