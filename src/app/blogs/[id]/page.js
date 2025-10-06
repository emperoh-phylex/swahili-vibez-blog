"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/Supabase";

export default function BlogPostPage({ params }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const id = await Promise.resolve(params).then(p => p.id); // Fix for new Next.js param behavior

        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id", id)
          .limit(1); // safer than .single()

        if (error) {
          console.error("Error fetching post:", error.message);
        } else if (data && data.length > 0) {
          setPost(data[0]);
        } else {
          console.warn("No post found for ID:", id);
        }
      } catch (err) {
        console.error("Unexpected error:", err.message);
      }
    };

    fetchPost();
  }, [params]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading post...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-purple-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <img
          src={post.image}
          alt={post.title}
          className="w-full rounded-xl mb-6 shadow-md"
        />
        <h1 className="text-3xl font-bold text-purple-700 mb-3">{post.title}</h1>
        <p className="text-gray-500 text-sm mb-6">
          {new Date(post.created_at).toLocaleDateString()}
        </p>
        <p className="text-gray-800 leading-relaxed whitespace-pre-line">
          {post.content}
        </p>
      </div>
    </div>
  );
}
