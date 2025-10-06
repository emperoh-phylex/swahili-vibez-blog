import "../app/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Swahili Vibez",
  description: "Your ultimate source for Swahili culture, music & lifestyle.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3497119242149361"
     crossorigin="anonymous"></script>
      <body className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-50 via-orange-100 to-pink-50">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
