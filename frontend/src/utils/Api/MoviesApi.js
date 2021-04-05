import { apiOptions, sendRequest } from './ApiOptions';

/**
 * Класс Api
 * @constructor
 * @param {string} url - основная ссылка.
 * @param {string} headers - авторизация.
 */
class Api {
    constructor(options) {
        this._url = options.urlBM;
        this._headers = options.headers;
        this._sendRequest = sendRequest;
    }

    /** Получить карточки из сервера */
    getMovies() {
        return this._sendRequest('', {
            headers: {
                ...this._headers,
            }
        });
    }
}

export const moviesApi = new Api(apiOptions);