import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MovieFilters from "../components/MovieFilters";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import Movies from "../components/Movies";
import { useMovies } from "../features/movie/movieHooks";

const PAGE_SIZE = 20;

const EMPTY_FILTERS = {
  quality: "",
  rating: "",
  language: "",
  year: "",
};

function Home() {
  const {
    movies,
    loading,
    error,
    totalPages,
    totalMovies,
    fetchMovies,
  } = useMovies();

  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchMovies({
      page,
      per_page: PAGE_SIZE,
      q: search.trim(),
      year: filters.year,
      rating: filters.rating,
      quality: filters.quality,
      language: filters.language,
    });
  }, [page, search, filters.year, filters.rating, filters.quality,filters.language, fetchMovies]);

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));

    setPage(1);
  };

  const handleClearFilters = () => {
    setFilters(EMPTY_FILTERS);
    setSearch("");
    setPage(1);
  };

  const handleQuickFilter = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));

    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;

    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-[#09090B]">
      <Navbar
        searchValue={search}
        onSearchChange={handleSearch}
        onQuickFilter={handleQuickFilter}
      />

      <MovieFilters
        filters={filters}
        onChange={handleFilterChange}
        onClear={handleClearFilters}
      />

      <Movies
        movies={movies}
        loading={loading}
        error={error}
      />

      {!loading && !error && movies.length > 0 && (
        <>
          <p className="text-center text-gray-400 text-sm mt-4">
            Total Movies: {totalMovies}
          </p>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      <Footer />
    </div>
  );
}

export default Home;
