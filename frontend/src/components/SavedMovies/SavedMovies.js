import './SavedMovies.css';
import Header from "./../Header/Header";
import MoviesCardList from "./../MoviesCardList/MoviesCardList";
import Preloader from "./../Preloader/Preloader";
import Footer from "./../Footer/Footer";
import SearchForm from "./../SearchForm/SearchForm";
import { useState } from "react";

export default function SavedMovies(props) {
    const [countMovies, setCountMovies] = useState(0);
    const {
        movies,
        savedMovies,
        findSavedMovies,
        loggedIn,
        hamburger,
        isPreloader,
        searchMovies,
        onHandleHamburger,
        onDeleteSavedMovie,
    } = props;

    /** Удаление сохранённого фильма */
    function onModDeleteSavedMovie(movie) {
        if (movies.some((item) => item.id === +movie.movieId))
            onDeleteSavedMovie(movie);
    }

    return (
        <>
            <Header
                loggedIn={loggedIn}
                hamburger={hamburger}
                onHandleHamburger={onHandleHamburger}
            />
            <SearchForm
                searchMovies={searchMovies}
            />
            { isPreloader ? (
                <div className='container'>
                    <Preloader/>
                </div>
            ) : (
                ( findSavedMovies ? (
                    <section className='movies'>
                        <MoviesCardList
                            movies={savedMovies}
                            count={{ countMovies, setCountMovies }}
                            pathSavedMovie={true}
                            handleSavedMovie={onModDeleteSavedMovie}
                        />
                    </section>
                ) : (
                    <h2 className='movies__title'>Нет сохранённых фильмов</h2>
                ))
            )}
            <Footer/>
        </>
    );
}