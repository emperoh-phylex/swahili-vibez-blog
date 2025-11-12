import posts from "@/data/posts.json";

export async function GET() {
  const baseUrl = "https://swahili-vibez-blog.vercel.app";

  // Generate URL entries dynamically
  const urls = posts
    .map((post) => {
      return `
        <url>
          <loc>${baseUrl}/blogs/${post.id}</loc>
          <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `;
    })
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

