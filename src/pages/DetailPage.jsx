import React, { useEffect, useRef } from "react";
import { Star, Clock, Calendar, Download, Play, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MovieCard from "../components/MovieCard";
import {
  useMovieDetail,
  useSimilarMovies,
} from "../features/movie/movieHooks";
import {
  getPoster,
  getTitle,
  getGenres,
  getRating,
  getYear,
  getScreenshots,
  getCast,
  getTrailer,
  formatRuntime,
} from "../utils/movieUtils";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const trailerRef = useRef(null);

  const { data: movie, isLoading, isError, error } = useMovieDetail(id);

  const {
    data: similarMovies = [],
    isLoading: similarLoading,
    isError: similarError,
    error: similarErr,
  } = useSimilarMovies(id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    if (movie) {
      console.log("Full Movie Data:", movie);
      console.log("Cast Data:", movie.cast);
      console.log("Actors Data:", movie.actors);
    }
  }, [movie]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center text-white">
        Loading movie...
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center text-white gap-4">
        <p className="text-red-400">{error?.message || "Movie nahi mili."}</p>
        <button
          onClick={() => navigate("/home")}
          className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const title = getTitle(movie);
  const poster = getPoster(movie);
  const rating = getRating(movie);
  const year = getYear(movie);
  const genres = getGenres(movie);
  const runtime = formatRuntime(movie.runtime);
  const trailer = getTrailer(movie);
  const screenshots = getScreenshots(movie);
  const cast = (getCast(movie) || []).slice(0, 4);
  const description = movie.description_full || "No description available.";

  const handleWatchNow = () => {
    trailerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDownload = () => {
    alert("Download feature will be available soon!");
  };

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-[#09090B] text-white px-5 md:px-10 lg:px-20 py-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-2 text-gray-400 hover:text-purple-500 mb-8 transition"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="shrink-0">
              {poster ? (
                <img
                  src={poster}
                  alt={title}
                  className="w-56 h-80 md:w-72 md:h-104 object-cover rounded-xl"
                />
              ) : (
                <div className="w-56 h-80 md:w-72 md:h-104 rounded-xl bg-zinc-800 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-5">
                {title}
              </h1>

              <div className="flex flex-wrap items-center gap-5 text-sm text-gray-400 mb-5">
                {rating !== null && (
                  <span className="flex items-center gap-1 text-yellow-400">
                    <Star size={17} fill="currentColor" />
                    {rating}/10
                  </span>
                )}

                {year && (
                  <span className="flex items-center gap-2">
                    <Calendar size={16} />
                    {year}
                  </span>
                )}

                {runtime && (
                  <span className="flex items-center gap-2">
                    <Clock size={16} />
                    {runtime}
                  </span>
                )}

                {movie.mpa_rating && (
                  <span className="border border-gray-600 px-2 py-0.5 rounded text-xs">
                    {movie.mpa_rating}
                  </span>
                )}
              </div>

              {genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {genres.map((genre, index) => (
                    <span
                      key={index}
                      className="bg-zinc-800 text-gray-300 px-4 py-2 rounded-full text-xs"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              <h2 className="text-2xl font-semibold mb-2">
                Description
              </h2>

              <p className="text-gray-200 leading-7 text-sm md:text-base max-w-3xl mb-7">
                {description}
              </p>

              <div className="flex flex-wrap gap-3">
                {trailer && (
                  <button
                    onClick={handleWatchNow}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition"
                  >
                    <Play size={18} fill="currentColor" />
                    Watch Now
                  </button>
                )}

                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-lg font-semibold transition"
                >
                  <Download size={18} />
                  Download
                </button>
              </div>
            </div>
          </div>

          {trailer && (
            <section ref={trailerRef} className="mt-16">
              <h2 className="text-2xl font-bold mb-7">
                Official Trailer
              </h2>

              <div className="w-full max-w-3xl aspect-video rounded-2xl overflow-hidden bg-zinc-900">
                <iframe
                  src={trailer}
                  title={`${title} Trailer`}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            </section>
          )}

          {cast.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold mb-7">
                Cast
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 max-w-4xl">
                {cast.map((person, index) => {
                  const name = person.name || "Unknown";
                  const character = person.character_name || "";
                  const image = person.url_small_image || null;

                  return (
                    <div
                      key={person.id ?? index}
                      className="text-center"
                    >
                      {image ? (
                        <img
                          src={image}
                          alt={name}
                          className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover mx-auto mb-3 border-2 border-zinc-800"
                        />
                      ) : (
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-zinc-800 mx-auto mb-3 border-2 border-zinc-700 flex items-center justify-center text-xl text-gray-400">
                          {name.charAt(0)}
                        </div>
                      )}

                      <h3 className="text-sm font-semibold">
                        {name}
                      </h3>

                      {character && (
                        <p className="text-gray-500 text-xs mt-1">
                          {character}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {screenshots.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold mb-7">
                Screenshots
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {screenshots.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Screenshot ${index + 1}`}
                    className="w-full h-48 md:h-56 object-cover rounded-xl hover:scale-[1.02] transition duration-300"
                  />
                ))}
              </div>
            </section>
          )}

          <section className="mt-16 pb-10">
            <h2 className="text-2xl font-bold mb-7">
              Similar Movies
            </h2>

            {similarLoading && (
              <p className="text-gray-400">
                Loading similar movies...
              </p>
            )}

            {similarError && (
              <p className="text-red-400 text-sm">
                {similarErr?.message || "Similar movies load nahi ho sakin."}
              </p>
            )}

            {!similarLoading && !similarError && similarMovies.length === 0 && (
              <p className="text-gray-500 text-sm">
                No similar movies found.
              </p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {similarMovies.map((similar, index) => (
                <MovieCard
                  key={similar.id ?? index}
                  movie={similar}
                />
              ))}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default DetailPage;
