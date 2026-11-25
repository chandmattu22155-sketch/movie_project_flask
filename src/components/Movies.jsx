import MovieCard from "./MovieCard";

const Movies = ({ movies = [], loading, error }) => {
  if (loading) {
    return <div className="text-white text-center p-10">Loading movies...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-10">{error}</div>;
  }

  return (
    <div className="bg-[#09090B] p-6 max-w-7xl mx-auto">
      <h1 className="text-white text-2xl font-bold mb-6">All Movies</h1>

      {movies.length === 0 ? (
        <p className="text-gray-400 text-center py-10">No movies found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie, index) => (
            <MovieCard key={movie.id ?? index} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Movies;
