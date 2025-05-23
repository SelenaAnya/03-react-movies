import { Movie } from "../../types/movie";
import styles from "../MovieModal.module.css";

interface MovieModalProps {
    movie: Movie | null;
    onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
    if (!movie) return null;

    return (
        <div className={styles.backdrop} role="dialog" aria-modal="true" onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} aria-label="Close modal" onClick={onClose}>
                    &times;
                </button>
                <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                    className={styles.image}
                />
                <div className={styles.content}>
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                    <p><strong>Release Date:</strong> {movie.release_date}</p>
                    <p><strong>Rating:</strong> {movie.vote_average}/10</p>
                </div>
            </div>
        </div>
    );
};

export default MovieModal; // ✅ Експортуємо компонент!
