export function getPoster(movie) {
  const img = movie?.images || {};
  return (
    img.large_cover_image ||
    img.medium_cover_image ||
    img.small_cover_image ||
    movie?.poster ||
    null
  );
}

export function getTitle(movie) {
  return movie?.title || movie?.title_english || "Untitled";
}

export function getGenres(movie) {
  return Array.isArray(movie?.genres) ? movie.genres : [];
}

export function getRating(movie) {
  const r = movie?.rating;
  return r === undefined || r === null || r === "" ? null : r;
}

export function getYear(movie) {
  return movie?.year ?? null;
}

export function getQualities(movie) {
  return Array.isArray(movie?.torrents)
    ? movie.torrents.map((t) => t?.quality).filter(Boolean)
    : [];
}

export function getScreenshots(movie) {
  const img = movie?.images || {};
  return [
    img.large_screenshot_image1 || img.medium_screenshot_image1,
    img.large_screenshot_image2 || img.medium_screenshot_image2,
    img.large_screenshot_image3 || img.medium_screenshot_image3,
  ].filter(Boolean);
}

export function getCast(movie) {
  if (Array.isArray(movie?.cast)) return movie.cast;
  if (Array.isArray(movie?.actors)) return movie.actors;
  return [];
}

export function getTrailer(movie) {
  return movie?.yt_trailer_code
    ? `https://www.youtube.com/embed/${movie.yt_trailer_code}`
    : null;
}

export function formatRuntime(minutes) {
  const n = Number(minutes);
  if (!n) return null;
  const h = Math.floor(n / 60);
  const m = n % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
}


