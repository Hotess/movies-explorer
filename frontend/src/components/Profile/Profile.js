import './Profile.css';
import React, { useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormWithValidation from './../../utils/useFormWithValidation';
import Header from "../Header/Header";
import Form from "../Form/Form";

export default function Profile(props) {
    let currentUser;

    currentUser = React.useContext(CurrentUserContext);

    const profileNameField = useFormWithValidation();
    const profileEmailField = useFormWithValidation();
    const [dirtyBtn, setDirtyBtn] = useState(true);
    const {
        loggedIn,
        hamburger,
        errorRequest,
        setErrorRequest,
        successRequest,
        onLogout,
        onEditProfile,
        onHandleHamburger,
    } = props;

    useEffect(() => {
        profileNameField.isValid ? profileNameField.setIsDirty(false) : profileNameField.setIsDirty(true);
    }, [profileNameField.isValid]);

    useEffect(() => {
        profileEmailField.isValid ? profileEmailField.setIsDirty(false) : profileEmailField.setIsDirty(true);
    }, [profileEmailField.isValid]);

    useEffect(() => {
            profileNameField.setValue(currentUser.name);
            profileEmailField.setValue(currentUser.email);
            profileNameField.setIsDirty(false);
            profileEmailField.setIsDirty(false);
            profileEmailField.setIsValid(true);
            profileNameField.setIsValid(true);
    }, []);

    /** Выйти из аккаунта */
    function handleLogout() {
        onLogout();
    }
    /** Редактировать профиль */
    function handleSubmit() {
        setDirtyBtn(true);

        onEditProfile(profileNameField.value, profileEmailField.value);
    }

    /** Валидация кнопки редактирования */
    function validateBtn() {
        console.log(dirtyBtn)
        return !(profileNameField.isValid && profileEmailField.isValid)
            || errorRequest
            || dirtyBtn
            || (profileNameField.value === currentUser.name && profileEmailField.value === currentUser.email)
            || profileNameField.value === '' || profileEmailField.value === '';
    }

    return (
        <>
            <Header
                loggedIn={loggedIn}
                hamburger={hamburger}
                onHandleHamburger={onHandleHamburger}
            />
            <Form>
                <fieldset className='form__container form__container_type_profile'>
                    <legend className='form__heading form__heading_type_profile'>{`Привет, ${currentUser.name || 'пользователь'}!`}</legend>
                    <label htmlFor='name' className='form__field form__field_type_profile'>Имя
                        <input
                            type='text'
                            value={profileNameField.value || ''}
                            placeholder='Введите имя'
                            id='name'
                            className={`form__input form__input_type_profile${profileNameField.isDirty ? ' form__input_invalid' : ''}`}
                            minLength='2'
                            maxLength='30'
                            onChange={(event) => { profileNameField.onChange(event, setErrorRequest, setDirtyBtn(false))}}
                        />
                    </label>
                    <label htmlFor='email' className='form__field form__field_type_profile'>E-mail
                        <input
                            type='email'
                            value={profileEmailField.value || ''}
                            placeholder='Введите E-mail'
                            id='email'
                            className={`form__input form__input_type_profile${profileEmailField.isDirty ? ' form__input_invalid' : ''}`}
                            minLength='6'
                            maxLength='30'
                            onChange={(event) => { profileEmailField.onChange(event, setErrorRequest, setDirtyBtn(false))}}
                        />
                    </label>
                    <div className='form__button-overlay'>
                            <span className={`form__request${errorRequest ? ' form__request_error' : (successRequest ? ' form__request_success ' : '')}`}>{ errorRequest ? 'Некорректные данные' : (setTimeout(() => successRequest) ? 'Данные успешно обновлены' : '')}</span>
                        <button
                            type='button'
                            aria-label='Редактировать'
                            className='form__edit'
                            disabled={validateBtn()}
                            onClick={handleSubmit}
                        >Редактировать</button>
                        <button
                            type='button'
                            aria-label='Выйти из аккаунта'
                            className='form__logout'
                            onClick={handleLogout}
                        >Выйти из аккаунта</button>
                    </div>
                </fieldset>
            </Form>
        </>
    );
}