import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFormWithValidation from './../../utils/useFormWithValidation';
import Form from './../Form/Form';
import Logo from './../ui/Logo/Logo';

export default function Register(props) {
    const registerNameField = useFormWithValidation();
    const registerEmailField = useFormWithValidation();
    const registerPasswordField = useFormWithValidation();
    const {
        errorRequest,
        setErrorRequest,
        onRegister,
    } = props;
    useEffect(() => {
        registerNameField.isValid ? registerNameField.setIsDirty(false) : registerNameField.setIsDirty(true);

    }, [registerNameField.isValid]);

    useEffect(() => {
        registerEmailField.isValid ? registerEmailField.setIsDirty(false) : registerEmailField.setIsDirty(true);
    }, [registerEmailField.isValid]);

    useEffect(() => {
        registerPasswordField.isValid ? registerPasswordField.setIsDirty(false) : registerPasswordField.setIsDirty(true);
    }, [registerPasswordField.isValid]);

    useEffect(() => {
        registerNameField.setIsDirty(false);
        registerEmailField.setIsDirty(false);
        registerPasswordField.setIsDirty(false);
        setErrorRequest(false);
    }, []);

    /** Отправить запрос на регистрацию */
    function handleRegister(event) {
        event.preventDefault();

        onRegister(registerNameField.value, registerEmailField.value, registerPasswordField.value);
    }

    return (
        <Form formName='register'>
            <Logo />
            <fieldset className='form__container'>
                <legend className='form__heading'>Добро пожаловать!</legend>
                <label htmlFor='name' className='form__field'>Имя
                    <input
                        name='RegisterName'
                        type='text'
                        placeholder='Введите имя'
                        id='name'
                        className={`form__input${registerNameField.isDirty ? ' form__input_invalid' : ''}`}
                        required
                        minLength='2'
                        maxLength='30'
                        autoComplete='new-password'
                        onChange={(event) => { registerNameField.onChange(event, setErrorRequest)}}
                    />
                    <span className={`form__error${registerNameField.isDirty ? ' form__error_visible' : ''}`}>
                        {registerNameField.isDirty ? registerNameField.isError : ''}
                     </span>
                </label>
                <label htmlFor='email' className='form__field'>E-mail
                    <input
                        name='RegisterEmail'
                        type='email'
                        placeholder='Введите E-mail'
                        id='email'
                        className={`form__input${registerEmailField.isDirty ? ' form__input_invalid' : ''}`}
                        required
                        minLength='6'
                        maxLength='30'
                        autoComplete='new-password'
                        onChange={(event) => { registerEmailField.onChange(event, setErrorRequest)}}
                    />
                    <span className={`form__error${registerEmailField.isDirty ? ' form__error_visible' : ''}`}>
                        {registerEmailField.isDirty ? registerEmailField.isError : ''}
                     </span>
                </label>
                <label htmlFor='password' className='form__field'>Пароль
                    <input
                        name='RegisterPassword'
                        type='password'
                        placeholder='Введите пароль'
                        id='password'
                        className={`form__input${registerPasswordField.isDirty ? ' form__input_invalid' : ''}`}
                        required
                        minLength='8'
                        maxLength='30'
                        autoComplete='new-password'
                        onChange={(event) => { registerPasswordField.onChange(event, setErrorRequest)}}
                    />
                    <span className={`form__error${registerPasswordField.isDirty ? ' form__error_visible' : ''}`}>
                        {registerPasswordField.isDirty ? registerPasswordField.isError : ''}
                     </span>
                </label>
                <div className='form__button-overlay'>
                    <span className={`form__error${errorRequest ? ' form__error_visible' : ''}`}>Ошибка при регистрации</span>
                    <button
                        type='button'
                        aria-label='Авторизоваться'
                        className='form__submit'
                        disabled={ !(registerNameField.isValid && registerEmailField.isValid && registerPasswordField.isValid) || errorRequest }
                        onClick={handleRegister}
                    >Зарегистрироваться</button>
                    <p className='form__text'>Уже зарегистрированы? <Link to='/signin' title='Регистрация' className='form__link'>Войти</Link></p>
                </div>
            </fieldset>
        </Form>
    );
}