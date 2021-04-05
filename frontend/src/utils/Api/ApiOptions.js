export const apiOptions = {
    url: 'http://localhost:3000/',
    urlBM: 'https://api.nomoreparties.co/beatfilm-movies/',
    headers: {
        'Content-Type': 'application/json',
    }
}

/** Отправить запрос */
export function sendRequest(path, parameters) {
    return fetch(`${this._url}${path}`, parameters).then((res) => {
        return (res.ok) ? res.json() : Promise.reject(res.status);
    });
}