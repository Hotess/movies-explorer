import './Portfolio.css';

export default function Portfolio() {
    return (
        <section className='portfolio'>
            <h2 className='portfolio__title'>Портфолио</h2>
            <a href='https://hotess.github.io/how-to-learn' title='Статический сайт' className='portfolio__link'>Статический сайт</a>
            <hr className='portfolio__horizontal-rule'></hr>
            <a href='https://hotess.github.io/russian-travel' title='Адаптивный сайт' className='portfolio__link'>Адаптивный сайт</a>
            <hr className='portfolio__horizontal-rule'></hr>
            <a href='https://tiger.students.nomoreparties.xyz' title='Одностраничное приложение' className='portfolio__link'>Одностраничное приложение</a>
            <hr className='portfolio__horizontal-rule'></hr>
        </section>
    );
}