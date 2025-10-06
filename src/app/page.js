"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/Supabase";
import TrendingSwiper from "../components/TrendingSwiper";
import Link from "next/link";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch posts and events from Supabase
  useEffect(() => {
    const fetchData = async () => {
      const [{ data: postsData, error: postError }, { data: eventsData, error: eventError }] = await Promise.all([
        supabase.from("posts").select("*").order("id", { ascending: false }),
        supabase.from("events").select("*").order("date", { ascending: false }),
      ]);

      if (postError || eventError) {
        console.error("Supabase fetch error:", postError || eventError);
      }

      setPosts(postsData || []);
      setEvents(eventsData || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 to-indigo-100">
        <p className="text-lg text-indigo-700 font-semibold animate-pulse">Loading awesome content...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-indigo-100 text-gray-800 px-4 py-8">
      {/* 🌟 Header */}
      <header className="text-center mb-10">
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3497119242149361"
     crossorigin="anonymous"></script>
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-3 drop-shadow">
          🎓 Coastal Vibes Portal
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Your one-stop News hub — blogs, events, and campus trends!
        </p>
      </header>

      {/* 🔥 Trending Swiper */}
      <section className="mb-12">
        <TrendingSwiper posts={posts} events={events} />
      </section>

      {/* 📝 Latest Blog Posts */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 border-l-4 border-yellow-400 pl-3">
          📰 Latest Blog Posts
        </h2>

        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet — check back soon!</p>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blogs/${post.id}`}
                className="bg-white rounded-2xl shadow hover:shadow-xl transition-all overflow-hidden border border-indigo-100"
              >
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-48 w-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-indigo-700">{post.title}</h3>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-3">{post.description}</p>
                  <span className="text-indigo-500 font-medium text-sm mt-3 inline-block">
                    Read more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 🎤 Upcoming Events */}
      <section>
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 border-l-4 border-pink-400 pl-3">
          🎉 Upcoming Events
        </h2>

        {events.length === 0 ? (
          <p className="text-gray-500">No events yet — stay tuned!</p>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow hover:shadow-xl transition-all border border-pink-100 p-5"
              >
                {event.image && (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-40 w-full object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="text-lg font-semibold text-pink-600 mb-1">{event.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  📅 {event.date ? new Date(event.date).toLocaleDateString() : "Date not set"}
                </p>
                <p className="text-gray-700 text-sm mb-3">{event.description}</p>
                <p className="text-indigo-600 text-sm font-medium">
                  📍 {event.location || "Campus Grounds"}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 🌈 Footer */}
      <footer className="mt-20 text-center text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} <span className="font-semibold text-indigo-700">Campus Vibes</span> — 
          built for students by students 🎓
        </p>
      </footer>
    </main>
  );
}
