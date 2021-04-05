import './MoviesCardList.css';
import React, { useState, useEffect } from 'react';
import MoviesCard from './../MoviesCard/MoviesCard';

export default function MoviesCardList(props) {
    const {
        movies,
        handleSavedMovie,
        pathSavedMovie = false,
        count,
        isSavedMovie,
    } = props;

    const [addMoreCards, setAddMoreCards] = useState(0);

    const addMoreMovies = () => {
        count.setCountMovies(count.countMovies + addMoreCards)
    }
    const displayWidthCheck = () => {
        const display = window.innerWidth;

        if (display > 900) {
            count.setCountMovies(12);
            setAddMoreCards(3);
        } else if (display > 750) {
            count.setCountMovies(8);
            setAddMoreCards(2);
        } else if (display < 750) {
            count.setCountMovies(5);
            setAddMoreCards(2);
        }
    }

    useEffect(() => {
        displayWidthCheck();
    }, []);

    return (
        <>
            <div className='movies__table'>
                { movies.slice(0, count.countMovies).map((movie) => {
                        return (
                            <MoviesCard
                                key={movie.id || movie.movieId}
                                movie={movie}
                                pathSavedMovie={pathSavedMovie}
                                isSavedMovie={isSavedMovie}
                                handleSavedMovie={handleSavedMovie}
                            />
                        );
                }) }
            </div>
            { ((movies.length > count.countMovies) || (movies.length <! 3)) ? (
                <div className='movies__button-overlay'>
                    <button
                        className='movies__still'
                        onClick={addMoreMovies}
                    >Ещё</button>
                </div>
            ) : null }
        </>
    );
}