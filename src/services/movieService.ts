// src/services/movieService.ts
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Movie } from '../types/movie';

interface ApiResponse {
    results: Movie[];
    total_results: number;
    total_pages: number;
}

// Базовий URL для TMDB API
const BASE_URL = 'https://api.themoviedb.org/3';

// Bearer token для авторизації (використайте ваш реальний токен)
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MjJhNzBmMTEyM2IyMDhmY2FjYTZlZGFkNGNjNWFlYyIsIm5iZiI6MTc0NDUzNDAzMC42OTI5OTk4LCJzdWIiOiI2N2ZiN2EwZTMxMTBiZDgyZGZhY2U2MzYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.uSclX3vVunuHCxPY_dCMDxSrbIn3f3rqe8wvnSL5wms';

export const fetchMovies = async (query: string): Promise<Movie[]> => {
    try {
        const response: AxiosResponse<ApiResponse> = await axios.get(
            `${BASE_URL}/search/movie`,
            {
                params: {
                    query,
                    include_adult: false,
                    language: 'en-US',
                    page: 1
                },
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${BEARER_TOKEN}`,
                },
            }
        );

        return response.data.results;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw new Error('Failed to fetch movies');
    }
};

// // Альтернативна функція з використанням API ключа (якщо маєте)
// export const fetchMoviesWithApiKey = async (query: string): Promise<Movie[]> => {
//     const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    
//     if (!API_KEY) {
//         throw new Error('API key is not configured');
//     }

//     try {
//         const response: AxiosResponse<ApiResponse> = await axios.get(
//             `${BASE_URL}/search/movie`,
//             {
//                 params: {
//                     api_key: API_KEY,
//                     query,
//                     include_adult: false,
//                     language: 'en-US',
//                     page: 1
//                 }
//             }
//         );

//         return response.data.results;
//     } catch (error) {
//         console.error('Error fetching movies:', error);
//         throw new Error('Failed to fetch movies');
//     }
// };