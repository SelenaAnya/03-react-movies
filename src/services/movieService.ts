// // src/services/movieService.ts
// import axios from 'axios';
// import type { AxiosResponse } from 'axios';
// import type { Movie } from '../types/movie';

// interface ApiResponse {
//     results: Movie[];
//     total_results: number;
//     total_pages: number;
// }

// const BASE_URL = 'https://api.themoviedb.org/3';

// export const fetchMoviesWithApiKey = async (query: string): Promise<Movie[]> => {
//     const API_KEY = import.meta.env.REACT_APP_TMDB_API_KEY;

//     if (!API_KEY) {
//         throw new Error('API key is not configured');
//     }

//     if (!query || query.trim() === '') {
//         throw new Error('Search query is required');
//     }

//     try {
//         const response: AxiosResponse<ApiResponse> = await axios.get(
//             `${BASE_URL}/search/movie`,
//             {
//                 params: {
//                     api_key: API_KEY,
//                     query: query.trim(),
//                     include_adult: false,
//                     language: 'en-US',
//                     page: 1
//                 }
//             }
//         );

//         return response.data.results || [];
//     } catch (error) {
//         console.error('Error fetching movies:', error);
//         throw new Error('Failed to fetch movies. Please try again.');
//     }
// };

// movieService.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    "Content-Type": "application/json;charset=utf-8",
  },
});

export const searchMovies = async (query: string) => {
  try {
    const response = await axiosInstance.get("/search/movie", {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};
