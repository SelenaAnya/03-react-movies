import React, { useState } from 'react';

const API_KEY = '4287c4d1';
const API_URL = 'https://www.omdbapi.com/';

// Компонент модального вікна
const Modal = ({ movie, isOpen, onClose }) => {
    React.useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen || !movie) return null;

    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
            onClick={handleBackdropClick}
        >
            <div className="bg-white p-6 rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto relative shadow-2xl m-4">
                <button
                    className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-black transition-colors"
                    onClick={onClose}
                >
                    ×
                </button>

                <div className="text-center">
                    {movie.Poster && movie.Poster !== 'N/A' && (
                        <img
                            src={movie.Poster}
                            alt={movie.Title}
                            className="w-48 h-auto rounded mx-auto mb-4"
                        />
                    )}

                    <h2 className="text-2xl font-bold mb-4 text-gray-800">{movie.Title}</h2>

                    <div className="text-left space-y-3">
                        <p><span className="font-semibold">Рік:</span> {movie.Year}</p>
                        <p><span className="font-semibold">Жанр:</span> {movie.Genre}</p>
                        <p><span className="font-semibold">Режисер:</span> {movie.Director}</p>
                        <p><span className="font-semibold">Актори:</span> {movie.Actors}</p>
                        <p><span className="font-semibold">Сюжет:</span> {movie.Plot}</p>
                        {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                            <p><span className="font-semibold">Рейтинг IMDB:</span> {movie.imdbRating}/10</p>
                        )}
                        <p><span className="font-semibold">Тривалість:</span> {movie.Runtime}</p>
                        <p><span className="font-semibold">Мова:</span> {movie.Language}</p>
                        <p><span className="font-semibold">Країна:</span> {movie.Country}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Компонент картки фільму
const MovieCard = ({ movie, onClick }) => {
    return (
        <div
            className="border border-gray-300 rounded-lg p-4 w-48 text-center shadow-lg cursor-pointer transform transition-transform hover:scale-105 bg-white"
            onClick={() => onClick(movie.imdbID)}
        >
            {movie.Poster && movie.Poster !== 'N/A' ? (
                <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-72 object-cover rounded mb-3"
                />
            ) : (
                <div className="w-full h-72 bg-gray-200 rounded mb-3 flex items-center justify-center text-gray-500">
                    Немає зображення
                </div>
            )}
            <h3 className="font-bold text-sm mb-1 line-clamp-2">{movie.Title}</h3>
            <p className="text-gray-600 text-sm">{movie.Year}</p>
        </div>
    );
};

// Головний компонент додатку
const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Пошук фільмів
    const searchMovies = async () => {
        if (!searchTerm.trim()) return;

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}?s=${searchTerm}&apikey=${API_KEY}`);
            const data = await response.json();

            if (data.Response === 'True') {
                setMovies(data.Search);
            } else {
                setMovies([]);
                alert('Фільми не знайдено');
            }
        } catch (error) {
            console.error('Помилка пошуку:', error);
            alert('Помилка при пошуку фільмів');
        } finally {
            setLoading(false);
        }
    };

    // Отримання детальної інформації про фільм
    const getMovieDetails = async (imdbID) => {
        try {
            const response = await fetch(`${API_URL}?i=${imdbID}&apikey=${API_KEY}`);
            const data = await response.json();

            if (data.Response === 'True') {
                setSelectedMovie(data);
                setShowModal(true);
            } else {
                alert('Не вдалося завантажити деталі фільму');
            }
        } catch (error) {
            console.error('Помилка завантаження деталей:', error);
            alert('Помилка при завантаженні деталей фільму');
        }
    };

    // Закриття модального вікна
    const closeModal = () => {
        setShowModal(false);
        setSelectedMovie(null);
    };

    // Обробка натискання Enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchMovies();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-5">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                    🎬 Пошук фільмів
                </h1>

                {/* Пошукова панель */}
                <div className="flex justify-center mb-8">
                    <div className="flex gap-3 w-full max-w-md">
                        <input
                            type="text"
                            className="flex-1 px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Введіть назву фільму..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button
                            className="px-6 py-3 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            onClick={searchMovies}
                            disabled={loading}
                        >
                            {loading ? 'Пошук...' : 'Знайти'}
                        </button>
                    </div>
                </div>

                {/* Список фільмів */}
                <div className="flex flex-wrap justify-center gap-6">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.imdbID}
                            movie={movie}
                            onClick={getMovieDetails}
                        />
                    ))}
                </div>

                {/* Повідомлення якщо немає результатів */}
                {movies.length === 0 && !loading && (
                    <div className="text-center text-gray-500 mt-10">
                        <p className="text-lg">Введіть назву фільму для пошуку</p>
                    </div>
                )}

                {/* Модальне вікно */}
                <Modal
                    movie={selectedMovie}
                    isOpen={showModal}
                    onClose={closeModal}
                />
            </div>
        </div>
    );
};

export default App;