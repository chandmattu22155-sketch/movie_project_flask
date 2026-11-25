import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMovies, normalizeList } from "../../services/movieService";

export const fetchMovies = createAsyncThunk(
  "movie/fetchMovies",
  async (params, { rejectWithValue }) => {
    try {
      const data = await getMovies(params);
      const movies = normalizeList(data);

      const response = data?.data || data;
      const count =
        response?.count ??
        response?.total ??
        response?.total_movies ??
        response?.pagination?.count ??
        null;

      const pages =
        response?.total_pages ??
        response?.totalPages ??
        response?.pages ??
        response?.pagination?.total_pages ??
        null;

      return {
        movies,
        totalMovies: count,
        totalPages:
          pages ??
          (count !== null
            ? Math.ceil(Number(count) / (params?.per_page || 20))
            : null),
        currentPage: Number(params?.page || 1),
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  movies: [],
  loading: false,
  error: null,
  totalMovies: 0,
  totalPages: 1,
  currentPage: 1,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    clearMovies: (state) => {
      state.movies = [];
      state.error = null;
      state.totalMovies = 0;
      state.totalPages = 1;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.movies;
        state.totalMovies = action.payload.totalMovies ?? 0;
        state.totalPages = action.payload.totalPages ?? 1;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to load movies.";
        state.movies = [];
      });
  },
});

export const { clearMovies } = movieSlice.actions;
export default movieSlice.reducer;

