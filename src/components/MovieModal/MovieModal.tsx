import axios from "axios";
import { Movie } from "../../types/movie";

const API_URL = "https://api.themoviedb.org/3/search/movie";
const API_KEY = import.meta.env.VITE_TMDB_TOKEN;

export async function fetchMovies(query: string): Promise<Movie[]> {
    try {
        const response = await axios.get(API_URL, {
            params: { query, api_key: API_KEY },
        });
        return response.data.results;
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
}

export default MovieModal;