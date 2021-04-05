import './Navigation.css';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className='header__navigation'>
        <NavLink to='/movies' title='Фильмы' className='header__link header__link_type_films' activeClassName='header__link_active'>Фильмы</NavLink>
        <NavLink to='/saved-movies' title='Сохранённые фильмы' className='header__link header__link_type_saved-films' activeClassName='header__link_active'>Сохранённые фильмы</NavLink>
    </nav>
  );
}