import './App.css';
import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import Main from './Main/Main';
import Movies from './Movies/Movies';
import SavedMovies from "./SavedMovies/SavedMovies";
import Authorization from './Authorization/Authorization';
import Register from './Register/Register';
import Profile from './Profile/Profile';
import NotFound from "./404/404";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { mainApi } from "../utils/Api/MainApi";
import { moviesApi } from "../utils/Api/MoviesApi";

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [movies, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [findMovies, setFindMovies] = useState(true);
    const [findSavedMovies, setFindSavedMovies] = useState(true);
    const [isHamburger, setIsHamburger] = useState(false);
    const [isPreloader, setIsPreloader] = useState(true);
    const [isShortMovies, setIsShortMovies] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [errorRequest, setErrorRequest] = useState(false);
    const [successRequest, setSuccessRequest] = useState(false);
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            mainApi.checkToken()
                .then(({ name, email, _id }) => {
                    setLoggedIn(true);
                    setCurrentUser({ name, email, _id });

                    history.push(location.pathname);
                })
                .catch((err) => {
                    setLoggedIn(false);
                    localStorage.removeItem('jwt');

                    history.push('/');

                    console.log(`Ошибка при проверке токена: ${err}`);
                });
        }
    }, []);

    useEffect(() => {
        if (loggedIn && location.pathname === '/movies') {
            setIsPreloader(true);

            moviesApi.getMovies()
                .then((res) => {
                   if (res.length) {
                       localStorage.setItem('movies',
                           JSON.stringify(res.filter((item) => (item.image && item.country && item.nameEN && item.director && item.trailerLink.startsWith('http'))))
                       );

                       setMovies(JSON.parse(localStorage.getItem('movies')));

                       setFindMovies(true);
                    } else {
                       setFindMovies(false);
                   }
                })
                .catch((err) => {
                    setFindMovies(false);

                    console.log(`Ошибка при загрузке списка фильмов: ${err}`)
                })
                .finally(() => setTimeout(() => {
                    setIsPreloader(false);
                },2000));
        }
    }, [loggedIn, location]);

    useEffect(() => {
        if (loggedIn && (location.pathname === '/saved-movies' || location.pathname === '/movies')) {
                mainApi.getMovies()
                    .then((res) => {
                        if (res.length) {
                            const ownerSavedMovies = res.filter(item => (item.owner === currentUser._id));

                            localStorage.setItem('savedMovies', JSON.stringify(ownerSavedMovies));

                            setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')));

                            setFindSavedMovies(true);
                        } else {
                            setFindSavedMovies(false);
                        }
                    })
                    .catch((err) => {
                        setFindSavedMovies(false);

                        console.log(`Ошибка при загрузке списка сохранённых фильмов: ${err}`)
                    })
                    .finally(() => setTimeout(() => {
                        setIsPreloader(false);
                    }, 2000));
        }
    }, [loggedIn, location, currentUser]);

    /** Зарегистрироваться */
    function onRegister(name, email, password) {
        mainApi.register(name, email, password)
            .then(() => {
                history.push('/signin');
            })
            .catch((err) => {
                setErrorRequest(true);

                console.log(`Ошибка при регистрации: ${err}`);
            });
    }

    /** Авторизоваться */
    async function onAuthentication(email, password) {
       await mainApi.authorize(email, password)
            .then(() => {
                setLoggedIn(true);
                history.push('/movies');
            })
            .catch((err) => {
                setErrorRequest(true);

                console.log(`Ошибка при авторизации: ${err}`);
            });
    }

    /** Выйти из аккаунта */
    function onLogout() {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        history.push('/');
    }

    /** Редактировать профиль */
    function onEditProfile(name, email) {
        mainApi.editProfile(name, email)
            .then((user) => {
                setCurrentUser(user);
                setErrorRequest(false);
                setSuccessRequest(true);

                setTimeout(() => setSuccessRequest(false), 4000);
            })
            .catch((err) => {
                setErrorRequest(true);
                setSuccessRequest(false);

                setTimeout(() => setErrorRequest(false), 4000);

                console.log(`Ошибка при выходе из аккаунта: ${err}`);
            });
    }

    /** Сохранить фильм в список пользователя на сервере */
    function onSaveMovie(movie) {
        mainApi.saveMovie(movie)
            .then((newSavedMovie) => {
                localStorage.setItem('savedMovies', JSON.stringify(newSavedMovie));

                setSavedMovies([JSON.parse(localStorage.getItem('savedMovies')), ...savedMovies]);
            })
            .catch((err) => {
                console.log(`Ошибка при сохранения фильма: ${err}`);
            });
    }

    /** Удалить из списка сохранённый фильм пользователя на сервере */
    function onDeleteSavedMovie(movie) {
        mainApi.deleteSavedMovie(movie.movieId)
            .then(() => {
                const res = savedMovies.filter((item) => item.movieId !== movie.movieId);

                localStorage.setItem('savedMovies', JSON.stringify(res));

                setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')));

                if (!JSON.parse(localStorage.getItem('savedMovies')).length)
                    setFindSavedMovies(false);
            })
            .catch((err) => {
                console.log(`Ошибка при удаления сохранённого фильма из списка: ${err}`);
            });
    }

    /** Поиск фильмов */
    function onSearchSubmit(movie) {
        if (movie) {
            let token;
            let setAllMovies;
            let setFind;

            if (location.pathname === '/movies') {
                token = 'movies';
                setAllMovies = setMovies;
                setFind = setFindMovies;
            } else {
                token = 'savedMovies';
                setAllMovies = setSavedMovies;
                setFind = setFindSavedMovies;
            }

            const movies = JSON.parse(localStorage.getItem(token));
            const findMovies = movies.filter((item) => (item.nameRU.toLowerCase().includes(movie.toLowerCase())) && (isShortMovies ? item.duration < 40 : ' '));

            if (findMovies.length) {
                setFind(true);
                setAllMovies(findMovies);
            } else {
                setFind(false);
            }
        }
    }

    /** Открыть/закрыть гамбургер */
    function onHandleHamburger() {
        setIsHamburger(!isHamburger);
    }

    /** Искать/не искать короткометражные фильмы */
    function onSearchShortMovies() {
        setIsShortMovies(!isShortMovies);
    }

    /** Проверка на сохраненность фильмов */
    function isSavedMovie(movie) {
        return savedMovies.some((item) => +item.movieId === movie.id);
    }

  return (
      <CurrentUserContext.Provider value={currentUser}>
          <div className='page'>
              <Switch>
                  <Route exact path='/'>
                      <Main
                          loggedIn={loggedIn}
                          hamburger={{ isHamburger, setIsHamburger }}
                          onHandleHamburger={onHandleHamburger}
                      />
                  </Route>
                  <Route path='/signin'>
                      <Authorization
                          errorRequest={errorRequest}
                          setErrorRequest={setErrorRequest}
                          onAuthentication={onAuthentication}
                      />
                  </Route>
                  <Route path='/signup'>
                      <Register
                          errorRequest={errorRequest}
                          setErrorRequest={setErrorRequest}
                          onRegister={onRegister}
                      />
                  </Route>
                  <ProtectedRoute
                      path='/movies'
                      loggedIn={loggedIn}
                      movies={movies}
                      savedMovies={savedMovies}
                      hamburger={{ isHamburger, setIsHamburger }}
                      isPreloader={isPreloader}
                      isSavedMovie={isSavedMovie}
                      findMovies={findMovies}
                      onHandleHamburger={onHandleHamburger}
                      searchMovies={{ isShortMovies, onSearchSubmit, onSearchShortMovies }}
                      onSaveMovie={onSaveMovie}
                      onDeleteSavedMovie={onDeleteSavedMovie}
                      component={Movies}
                  />
                  <ProtectedRoute
                      path='/saved-movies'
                      loggedIn={loggedIn}
                      movies={movies}
                      savedMovies={savedMovies}
                      hamburger={{ isHamburger, setIsHamburger }}
                      isPreloader={isPreloader}
                      findSavedMovies={findSavedMovies}
                      searchMovies={{ isShortMovies, onSearchSubmit, onSearchShortMovies }}
                      onHandleHamburger={onHandleHamburger}
                      onDeleteSavedMovie={onDeleteSavedMovie}
                      component={SavedMovies}
                  />
                  <ProtectedRoute
                      path='/profile'
                      loggedIn={loggedIn}
                      hamburger={{ isHamburger, setIsHamburger }}
                      errorRequest={errorRequest}
                      successRequest={successRequest}
                      setErrorRequest={setErrorRequest}
                      onLogout={onLogout}
                      onEditProfile={onEditProfile}
                      onHandleHamburger={onHandleHamburger}
                      component={Profile}
                  />
                  <Route path='*'>
                      <NotFound/>
                  </Route>
              </Switch>
          </div>
      </CurrentUserContext.Provider>
  );
}
