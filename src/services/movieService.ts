// src/services/movieService.ts
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Movie } from '../types/movie';

interface ApiResponse {
    results: Movie[];
    total_results: number;
    total_pages: number;
}

const BASE_URL = 'https://api.themoviedb.org/3';
const token = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (query: string): Promise<Movie[]> => {
    try {
        const response: AxiosResponse<ApiResponse> = await axios.get(
            `${BASE_URL}/search/movie`,
            {
                params: {
                    query,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data.results;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw new Error('Failed to fetch movies');
    }
};

// import axios from 'axios';

// const url = 'https://api.themoviedb.org/3/search/movie?query=batman&include_adult=false&language=en-US&page=1';
// const options = {
//     method: 'GET',
//     headers: {
//         accept: 'application/json',
//         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MjJhNzBmMTEyM2IyMDhmY2FjYTZlZGFkNGNjNWFlYyIsIm5iZiI6MTc0NDUzNDAzMC42OTI5OTk4LCJzdWIiOiI2N2ZiN2EwZTMxMTBiZDgyZGZhY2U2MzYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.uSclX3vVunuHCxPY_dCMDxSrbIn3f3rqe8wvnSL5wms'
//     }
// };

// axios(url, options)
//     .then(res => res.json())
//     .then(json => console.log(json))
//     .catch(err => console.error(err));