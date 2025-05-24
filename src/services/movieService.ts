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
// const token = import.meta.env.VITE_TMDB_TOKEN;

// export const fetchMovies = async (query: string): Promise<Movie[]> => {
//     try {
//         const response: AxiosResponse<ApiResponse> = await axios.get(
//             `${BASE_URL}/search/movie`,
//             {
//                 params: {
//                     query,
//                 },
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             }
//         );

//         return response.data.results;
//     } catch (error) {
//         console.error('Error fetching movies:', error);
//         throw new Error('Failed to fetch movies');
//     }
// };

import axios from 'axios';

const fetchMovies = async () => {
    try {
        const apiKey = meta.env.REACT_APP_API_KEY;
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
            params: { query: 'batman', api_key: apiKey }
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
};

console.log('API Key:', meta.env.REACT_APP_API_KEY);