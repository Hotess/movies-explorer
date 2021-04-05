import './Movies.css';
import Header from "../Header/Header";
import SearchForm from "./../SearchForm/SearchForm";
import MoviesCardList from "./../MoviesCardList/MoviesCardList";
import Preloader from "./../Preloader/Preloader";
import Footer from "./../Footer/Footer";
import React, { useState } from "react";

export default function Movies(props) {
    const [countMovies, setCountMovies] = useState(0);
    const {
        movies,
        findMovies,
        loggedIn,
        savedMovies,
        isShortMovies,
        hamburger,
        isPreloader,
        isSavedMovie,
        searchMovies,
        onHandleHamburger,
        onSaveMovie,
        onDeleteSavedMovie,
    } = props;

    /** Удаление сохранённого фильма */
    const onModDeleteSavedMovie = function(movie) {
        savedMovies.forEach((item) => {
            if (+item.movieId === movie.id)
                onDeleteSavedMovie(item);
        });
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
                ( findMovies ? (
                    <>
                        <section className='movies'>
                            <MoviesCardList
                                movies={movies}
                                count={{ countMovies, setCountMovies }}
                                handleSavedMovie={{ onSaveMovie, onModDeleteSavedMovie }}
                                isSavedMovie={isSavedMovie}
                            />
                        </section>
                    </>
                ) : (
                    <h2 className='movies__title'>Нет фильмов</h2>
                ))
            )}
            <Footer/>
        </>
    );
}