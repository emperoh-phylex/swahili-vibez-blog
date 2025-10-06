"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-orange-500 via-pink-600 to-red-500 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/" className="text-4xl font-extrabold tracking-wide font-serif drop-shadow-lg">
          Swahili Vibez
        </Link>
        <div className="space-x-6 text-lg">
          <Link href="/">Home</Link>
          <Link href="/events">Events</Link>
          <Link href="/blogs">Blogs</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
