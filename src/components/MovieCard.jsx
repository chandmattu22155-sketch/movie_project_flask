import { Link } from "react-router-dom";
import {
  getPoster,
  getTitle,
  getGenres,
  getRating,
  getYear,
  getQualities,
} from "../utils/movieUtils";

const MovieCard = ({ movie }) => {
  if (!movie) return null;

  const image = getPoster(movie);
  const title = getTitle(movie);
  const rating = getRating(movie);
  const year = getYear(movie);
  const quality = getQualities(movie)[0] || "N/A";
  const genres = getGenres(movie).join(", ");

  return (
    <div className="w-full max-w-xs bg-[#18181B] rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/60 transition-all duration-300">
      <div className="relative">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-80 object-cover"
          />
        ) : (
          <div className="w-full h-80 bg-zinc-800 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}

        <span className="absolute top-3 right-3 bg-black/80 text-white px-3 py-1 rounded-lg text-sm">
          ⭐ {rating ?? "N/A"}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-white text-lg font-semibold truncate">{title}</h3>

        <div className="flex justify-between items-center mt-3">
          <span className="text-gray-400 text-sm">{year}</span>

          <span className="bg-purple-500/15 text-purple-400 px-2 py-1 rounded-md text-sm">
            {quality}
          </span>
        </div>

        <p className="text-gray-400 text-sm mt-3 truncate">{genres}</p>

        <Link to={`/movie/${movie.id}`}>
          <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
