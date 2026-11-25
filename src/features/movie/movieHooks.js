import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import {
  getMovieById,
  getSimilarMovies,
} from "../../services/movieService";
import { fetchMovies } from "./movieSlice";

export const useMovies = () => {
  const dispatch = useDispatch();

  const {
    movies,
    loading,
    error,
    totalMovies,
    totalPages,
    currentPage,
  } = useSelector((state) => state.movie);

  const loadMovies = useCallback(
    (params) => dispatch(fetchMovies(params)),
    [dispatch]
  );

  return {
    movies,
    loading,
    error,
    totalMovies,
    totalPages,
    currentPage,
    fetchMovies: loadMovies,
  };
};

export const useMovieDetail = (id) =>
  useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieById(id),
    enabled: Boolean(id),
  });

export const useSimilarMovies = (id) =>
  useQuery({
    queryKey: ["similar-movies", id],
    queryFn: () => getSimilarMovies(id),
    enabled: Boolean(id),
  });