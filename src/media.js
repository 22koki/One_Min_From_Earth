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
