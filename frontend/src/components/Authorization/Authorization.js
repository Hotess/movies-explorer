import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFormWithValidation from './../../utils/useFormWithValidation';
import Form from './../Form/Form';
import Logo from './../ui/Logo/Logo';

export default function Authorization(props) {
    const authEmailField = useFormWithValidation();
    const authPasswordField = useFormWithValidation();
    const {
        errorRequest,
        setErrorRequest,
        onAuthentication,
    } = props;

    useEffect(() => {
        authEmailField.isValid ? authEmailField.setIsDirty(false) : authEmailField.setIsDirty(true);
    }, [authEmailField.isValid]);

    useEffect(() => {
        authPasswordField.isValid ? authPasswordField.setIsDirty(false) : authPasswordField.setIsDirty(true);
    }, [authPasswordField.isValid]);

    useEffect(() => {
        authEmailField.setIsDirty(false);
        authPasswordField.setIsDirty(false);
        setErrorRequest(false);
    }, []);

    /** Пройти аутентификацию */
    function handleSubmit(event) {
        event.preventDefault();

        onAuthentication(authEmailField.value, authPasswordField.value);
    }

    return (
            <Form formName='profile'>
                <Logo />
                <fieldset className='form__container'>
                    <legend className='form__heading'>Рады видеть!</legend>
                    <label htmlFor='email' className='form__field'>E-mail
                        <input
                            name='authEmail'
                            type='email'
                            placeholder='Введите E-mail'
                            id='email'
                            minLength='6'
                            maxLength='30'
                            className={`form__input${authEmailField.isDirty ? ' form__input_invalid' : ''}`}
                            onChange={(event) => { authEmailField.onChange(event, setErrorRequest)}}
                        />
                        <span className='form__error'>
                            {authEmailField.isDirty ? authEmailField.isError : ''}
                        </span>
                    </label>
                    <label htmlFor='password' className='form__field'>Пароль
                        <input
                            name='authPassword'
                            type='password'
                            placeholder='Введите пароль'
                            id='password'
                            minLength='8'
                            maxLength='30'
                            className={`form__input${authPasswordField.isDirty ? ' form__input_invalid' : ''}`}
                            onChange={ (event) => { authPasswordField.onChange(event, setErrorRequest) }}
                        />
                        <span className='form__error'>
                            {authPasswordField.isDirty ? authPasswordField.isError : ''}
                        </span>
                    </label>
                    <div className='form__button-overlay'>
                        <span className={`form__error${errorRequest ? ' form__error_visible' : ''}`}>Неверный пароль, либо Email</span>
                        <button
                            type='button'
                            aria-label='Авторизоваться'
                            className='form__submit'
                            disabled={!(authEmailField.isValid && authPasswordField.isValid) || errorRequest}
                            onClick={handleSubmit}
                        >Войти</button>
                        <p className='form__text'>Ещё не зарегистрированы? <Link to='/signup' title='Регистрация' className='form__link'>Регистрация</Link></p>
                    </div>
                </fieldset>
            </Form>
    );
}