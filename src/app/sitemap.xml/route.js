export async function GET() {
  const baseUrl = "https://swahili-vibez-blog.vercel.app"; // your site URL

  const posts = [
    { slug: "first-post", updatedAt: "2025-11-01" },
    { slug: "second-post", updatedAt: "2025-11-05" },
  ];

  const urls = posts
    .map(
      (post) => `
    <url>
      <loc>${baseUrl}/blog/${post.slug}</loc>
      <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
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
