// /src/app/sitemap.xml/route.js
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client (use your env variables)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET() {
  const baseUrl = "https://swahili-vibez-blog.vercel.app";

  // Fetch all blog posts from Supabase
  const { data: posts, error } = await supabase
    .from("blogs") // replace with your actual table name
    .select("id, updated_at"); // adjust column names if needed

  if (error) {
    console.error("Supabase fetch error:", error);
    return new Response("Error generating sitemap", { status: 500 });
  }

  const urls = posts
    .map(
      (post) => `
    <url>
      <loc>${baseUrl}/blogs/${post.id}</loc>
      <lastmod>${new Date(post.updated_at).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>`
    )
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  ${urls}
</urlset>`;

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
