export const curatedVideos = {
  "maasai-mara": [
    { title: "Wildlife, culture & adventure", youtubeId: "rkCMlxYj3ns", type: "Culture + wildlife" }
  ],
  "stone-town": [
    { title: "Street flavors of Stone Town", youtubeId: "cSSHT8NtJIY", type: "Food + culture" }
  ]
};

export async function fetchWikiImages(query, limit = 4) {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: query,
    gsrlimit: String(Math.max(limit, 4)),
    prop: "pageimages",
    piprop: "thumbnail",
    pithumbsize: "900",
    format: "json",
    origin: "*"
  });

  const response = await fetch(`https://en.wikipedia.org/w/api.php?${params.toString()}`);
  if (!response.ok) throw new Error("Image search failed");
  const json = await response.json();
  const pages = Object.values(json?.query?.pages || {});
  return pages
    .map((page) => ({
      title: page.title,
      url: page.thumbnail?.source || ""
    }))
    .filter((item) => item.url)
    .slice(0, limit);
}

export function youtubeSearchUrl(query) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}


export function topFoodHighlights(destination) {
  return String(destination.food || "")
    .replace(/\.$/, "")
    .split(/,|\band\b/i)
    .map((item) => item.trim())
    .filter((item) => item.length > 2)
    .slice(0, 3);
}

export function topCultureHighlights(destination) {
  const cleaned = String(destination.culture || "").replace(/\.$/, "");
  const parts = cleaned
    .split(/,|;|\band\b/i)
    .map((item) => item.trim())
    .filter((item) => item.length > 4);

  const unique = [];
  for (const item of parts) {
    const normalized = item
      .replace(/^(while|where|with|the|a|an)\s+/i, "")
      .replace(/^(is|are|remain|remains|shape|shapes)\s+/i, "")
      .trim();
    if (normalized && !unique.some((value) => value.toLowerCase() === normalized.toLowerCase())) {
      unique.push(normalized);
    }
    if (unique.length === 3) break;
  }

  while (unique.length < 3) {
    const fallback = destination.knownFor?.[unique.length];
    if (!fallback) break;
    unique.push(fallback);
  }
  return unique.slice(0, 3);
}

export async function fetchFeatureImage(query, fallbackQuery = "") {
  const primary = await fetchWikiImages(query, 1).catch(() => []);
  if (primary[0]) return primary[0];
  if (fallbackQuery) {
    const fallback = await fetchWikiImages(fallbackQuery, 1).catch(() => []);
    if (fallback[0]) return fallback[0];
  }
  return null;
}
