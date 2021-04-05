import './Header.css';
import { Link } from 'react-router-dom';
import Logo from './../ui/Logo/Logo';
import Navigation from './../Navigation/Navigation';
import Hamburger from './../ui/Hamburger/Hamburger';
import AuthMobile from './../AuthMobile/AuthMobile';

export default function Header(props) {
    const { loggedIn,
        hamburger,
        onHandleHamburger,
    } = props;

  return (
      <>
          { loggedIn ? (
              <AuthMobile
                  hamburger={hamburger}
                  onHandleHamburger={onHandleHamburger}
              />
          ) : null}
          <header className='header'>
              <Logo />
              { loggedIn ?
                  (
                      <>
                          <Hamburger
                              onHandleHamburger={onHandleHamburger}
                          />
                          <Navigation />
                          <Link to='/profile' title='Аккаунт' className='header__link header__link_type_account'>
                              <p className='header__account'>Аккаунт</p>
                              <span className='header__image'/>
                          </Link>
                      </>
                  ) :
                  (
                      <div className='header__sign'>
                          <Link to='/signup' title='Регистрация' className='header__link'>Регистрация</Link>
                          <Link to='/signin' title='Войти' className='header__link header__link_type_enter'>Войти</Link>
                      </div>
                  )
              }
          </header>
      </>
  );
}