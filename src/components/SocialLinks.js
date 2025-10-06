"use client";

import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function SocialLinks() {
  return (
    <div className="flex justify-center gap-6 mt-10">
      {/* Facebook */}
      <a
        href="https://www.facebook.com/profile.php?id=100063968023231&open_field=website&sk=about_contact_and_basic_i"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 transition-transform transform hover:scale-125"
      >
        <FaFacebook size={32} />
      </a>

      {/* Twitter / X */}
      <a
        href="https://x.com/yourhandle"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-900 hover:text-black transition-transform transform hover:scale-125"
      >
        <FaXTwitter size={32} />
      </a>

      {/* Instagram */}
      <a
        href="https://instagram.com/yourpage"
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-500 hover:text-pink-700 transition-transform transform hover:scale-125"
      >
        <FaInstagram size={32} />
      </a>

      {/* Gmail */}
      <a
        href="mailto:swahilivibez@gmail.com"
        className="text-red-500 hover:text-red-700 transition-transform transform hover:scale-125"
      >
        <MdEmail size={34} />
      </a>
    </div>
  );
}
