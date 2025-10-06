"use client";
import { Facebook, Instagram, Mail, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white py-8 mt-10">
      <div className="container mx-auto text-center">
        <p className="font-semibold text-lg mb-4">Follow Swahili Vibez</p>
        <div className="flex justify-center gap-6 mb-4">
          <Link href="https://facebook.com" target="_blank"><Facebook className="w-6 h-6 hover:scale-125 transition-transform" /></Link>
          <Link href="https://x.com" target="_blank"><Twitter className="w-6 h-6 hover:scale-125 transition-transform" /></Link>
          <Link href="https://instagram.com" target="_blank"><Instagram className="w-6 h-6 hover:scale-125 transition-transform" /></Link>
          <Link href="mailto:swahilivibez@gmail.com"><Mail className="w-6 h-6 hover:scale-125 transition-transform" /></Link>
        </div>
        <p className="text-sm">© {new Date().getFullYear()} Swahili Vibez. All rights reserved.</p>
      </div>
    </footer>
  );
}
