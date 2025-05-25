// src/services/movieService.ts
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Movie } from '../types/movie';

interface ApiResponse {
    results: Movie[];
    total_results: number;
    total_pages: number;
}

export const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
export const BASE_URL = 'https://api.themoviedb.org/3';

// import dotenv from 'dotenv';
// dotenv.config();

export const fetchMovies = async (query: string): Promise<Movie[]> => {
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    
    if (!API_KEY) {
        throw new Error('API key is not configured');
    }

    try {
        const response: AxiosResponse<ApiResponse> = await axios.get(
            `${BASE_URL}/search/movie`,
            {
                params: {
                    api_key: API_KEY,
                    query,
                    include_adult: false,
                    language: 'en-US',
                    page: 1
                }
            }
        );

        return response.data.results;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw new Error('Failed to fetch movies');
    }
};