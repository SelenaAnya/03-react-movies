import axios from "axios";
import { Movie } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3/search/movie";
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (query: string): Promise<Movie[]> => {
    try {
        const response = await axios.get(API_URL, {
            params: { query },
            headers: { Authorization: `Bearer ${API_TOKEN}` },
        });
        return response.data.results;
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
};