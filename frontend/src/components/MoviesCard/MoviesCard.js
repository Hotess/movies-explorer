import './MoviesCard.css';

export default function MoviesCard(props) {
    const {
        movie,
        pathSavedMovie,
        isSavedMovie,
        handleSavedMovie,
    } = props;

    const timeFormat = (duration) => {
        const hours = Math.floor(duration / 60);
        const min = duration % 60;
        return `${hours > 0 ? hours + 'ч ' : ''}${min}м`;
    }

    return (
        <>
        <article className='movies__cell'>
            <div className='movies__block'>
                <a href={movie.trailerLink} title={movie.trailerLink} className='movies__link'>
                    <h2 className='movies__heading'>{movie.nameRU}</h2>
                </a>
                { pathSavedMovie ? (
                    <button
                        className={`movies__button movies__button_delete`}
                        onClick={() => handleSavedMovie(movie)}
                    />
                ) : (
                    <button
                        className={`movies__button${isSavedMovie(movie) ? ' movies__button_saved' : ' movies__button_not-saved'}`}
                        onClick={isSavedMovie(movie) ? () => handleSavedMovie.onModDeleteSavedMovie(movie) : () => handleSavedMovie.onSaveMovie(movie)}
                    />
                )}
            </div>
                <p className='movies__duration'>{`${timeFormat(movie.duration)}`}</p>
            <a href={movie.trailerLink} title={movie.trailerLink} className='movies__link'>
                <img src={movie.image.url ? `https://api.nomoreparties.co${movie.image.url}` : movie.image} alt={movie.nameRU} className='movies__image'/>
            </a>
        </article>
    </>
    );
}