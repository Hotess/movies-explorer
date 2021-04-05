import { apiOptions, sendRequest } from './ApiOptions';

/**
 * Класс Api
 * @constructor
 * @param {string} url - основная ссылка.
 * @param {string} headers - авторизация.
 * @param {function} sendRequest - функция для отправки запроса.
 */
class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
        this._sendRequest = sendRequest;
    }

    /** Авторизоваться */
    authorize(email, password) {
        return this._sendRequest('signin', {
            method: 'POST',
            headers: {
                ...this._headers,
            },
            body: JSON.stringify({ email, password }),
        })
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('jwt', data.token);

                    return data;
                }
            });
    }

    /** Зарегистрироваться */
    register(name, email, password) {
        return this._sendRequest('signup', {
            method: 'POST',
            headers: {
                ...this._headers,
            },
            body: JSON.stringify({ name, email, password }),
        });
    }

    /** Редактировать профиль */
    editProfile(name, email) {
        return this._sendRequest('users/me', {
            method: 'PATCH',
            headers: {
                ...this._headers,
                'authorization':`Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify({ name, email }),
        });
    }

    /** Проверка токена */
    checkToken() {
        return this._sendRequest('users/me', {
            method: 'GET',
            headers: {
                ...this._headers,
                'authorization':`Bearer ${localStorage.getItem('jwt')}`,
            }
        });
    }

    /** Получить сохранённые фильмы из сервера */
    getMovies() {
        return this._sendRequest('movies', {
            headers: {
                ...this._headers,
                'authorization':`Bearer ${localStorage.getItem('jwt')}`,
            }
        });
    }

    /** Сохранить фильм в список пользователя */
    saveMovie(movie) {
        return this._sendRequest('movies', {
            method: 'POST',
            headers: {
                ...this._headers,
                'authorization':`Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: `https://api.nomoreparties.co${movie.image.url}`,
                trailer: movie.trailerLink,
                movieId: movie.id,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
                thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
            }),
        });
    }

    /** Удалить сохранённый фильм из списка пользователя */
    deleteSavedMovie(movieId) {
        return this._sendRequest(`movies/${movieId}`, {
            method: 'DELETE',
            headers: {
                ...this._headers,
                'authorization':`Bearer ${localStorage.getItem('jwt')}`,
            },
        });
    }
}

export const mainApi = new Api(apiOptions);