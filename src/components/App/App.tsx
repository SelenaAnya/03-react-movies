import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import { Movie } from "../../types/movie";
import toast from "react-hot-toast";

const App: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleSearch = async (query: string) => {
        setMovies([]);
        setSelectedMovie(null);
        setError(false);
        setLoading(true);

        try {
            const results = await fetchMovies(query);
            if (results.length === 0) {
                toast.error("No movies found for your request.");
            }
            setMovies(results);
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectMovie = (movie: Movie) => {
        setSelectedMovie(movie);
    };

    const handleCloseModal = () => {
        setSelectedMovie(null);
    };

    return (
        <div>
            <SearchBar onSubmit={handleSearch} />
            {loading && <Loader />}
            {error && <ErrorMessage />}
            {!loading && !error && <MovieGrid movies={movies} onSelect={handleSelectMovie} />}
            {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleCloseModal} />}
        </div>
    );
};

export default App;