import { authFetch } from "./apiClient";

const SKIP_KEYS = [
  "torrents",
  "cast",
  "actors",
  "genres",
  "images",
];

const KNOWN_KEYS = [
  "data",
  "movies",
  "results",
  "recommendations",
  "similar_movies",
  "items",
  "movie_list",
];

function isObjectList(arr) {
  return (
    Array.isArray(arr) &&
    (arr.length === 0 ||
      arr.some((item) => item && typeof item === "object"))
  );
}

function looksLikeMovie(obj) {
  return (
    obj &&
    typeof obj === "object" &&
    !Array.isArray(obj) &&
    obj.id !== undefined &&
    Boolean(obj.title || obj.title_english)
  );
}

export function normalizeList(data, depth = 0) {
  if (!data || depth > 4) return [];

  if (Array.isArray(data)) {
    return isObjectList(data) ? data : [];
  }

  if (typeof data !== "object") return [];

  if (looksLikeMovie(data)) {
    return [data];
  }

  for (const key of KNOWN_KEYS) {
    if (data[key] !== undefined) {
      const found = normalizeList(data[key], depth + 1);

      if (found.length) return found;
    }
  }

  for (const [key, value] of Object.entries(data)) {
    if (SKIP_KEYS.includes(key)) continue;

    if (
      Array.isArray(value) &&
      value.length &&
      isObjectList(value)
    ) {
      return value;
    }
  }

  for (const [key, value] of Object.entries(data)) {
    if (SKIP_KEYS.includes(key)) continue;

    if (value && typeof value === "object" && !Array.isArray(value)) {
      const found = normalizeList(value, depth + 1);

      if (found.length) return found;
    }
  }

  return [];
}

export async function getMovies({
  id,
  include,
  page,
  per_page,
  year,
  rating,
  language,
  quality,
  q,
} = {}) {
  const params = new URLSearchParams();

  if (id !== undefined && id !== null && id !== "") {
    params.append("id", id);
  }

  if (include) params.append("include", include);

  if (page !== undefined && page !== null) {
    params.append("page", page);
  }

  if (per_page !== undefined && per_page !== null) {
    params.append("per_page", per_page);
  }

  if (year) params.append("year", year);

  if (rating !== undefined && rating !== null && rating !== "") {
    params.append("rating", rating);
  }

  if (language) params.append("language", language);

  if (quality) params.append("quality", quality);

  if (q?.trim()) params.append("q", q.trim());

  const query = params.toString();

  return authFetch(
    query ? `/movies/?${query}` : "/movies/",
    { method: "GET" }
  );
}

export async function getMovieById(id) {
  const data = await getMovies({
    id,
    include: "--actors",
  });

  if (looksLikeMovie(data)) return data;

  for (const key of ["movie", "data", "result"]) {
    if (looksLikeMovie(data?.[key])) {
      return data[key];
    }
  }

  const list = normalizeList(data);

  if (list.length) {
    return (
      list.find((movie) => String(movie.id) === String(id)) ||
      list[0]
    );
  }

  return null;
}

export async function getSimilarMovies(movieId) {
  const data = await authFetch(
    `/movies/recommendation?id=${encodeURIComponent(movieId)}`,
    {
      method: "POST",
    }
  );

  return normalizeList(data).slice(0, 4);
}
