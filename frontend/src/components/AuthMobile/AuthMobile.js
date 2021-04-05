import './AuthMobile.css';
import { NavLink} from "react-router-dom";

export default function AuthMobile(props) {
    const {
        hamburger,
        onHandleHamburger,
    } = props;

    return (
        <div className={`auth-mobile${hamburger.isHamburger ? ` auth-mobile_opened` : '' }`}>
            <div className='auth-mobile__container'>
                <button
                    className='auth-mobile__close'
                    onClick={onHandleHamburger}
                />
                <nav className='auth-mobile__navigation'>
                    <li className='auth-mobile__list-item'>
                        <NavLink
                            exact to='/'
                            className='auth-mobile__link'
                            activeClassName='authMobile__link_active'
                            onClick={ () => setTimeout(() => hamburger.setIsHamburger(false)) }
                        >Главная</NavLink>
                    </li>
                    <li className='auth-mobile__list-item'>
                        <NavLink
                            to='movies'
                            className='auth-mobile__link'
                            activeClassName='authMobile__link_active'
                            onClick={ () => setTimeout(() => hamburger.setIsHamburger(false)) }
                        >Фильмы</NavLink>
                    </li>
                    <li className='auth-mobile__list-item'>
                        <NavLink
                            to='saved-movies'
                            className='auth-mobile__link'
                            activeClassName='authMobile__link_active'
                            onClick={ () => setTimeout(() => hamburger.setIsHamburger(false)) }
                        >Сохранённые фильмы</NavLink>
                    </li>
                </nav>
            </div>
            <div className='auth-mobile__container'>
                <NavLink
                    to='/profile'
                    title='Аккаунт'
                    className='auth-mobile__link auth-mobile__link_type_account'
                    activeClassName='authMobile__link_active_account'
                    onClick={ () => setTimeout(() => hamburger.setIsHamburger(false)) }
                >
                    <p className='auth-mobile__account'>Аккаунт</p>
                    <div className='auth-mobile__image'/>
                </NavLink>
            </div>
        </div>
    );
}