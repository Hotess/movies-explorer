import './Footer.css';

export default function Footer() {
    return (
        <footer className='footer'>
            <h2 className='footer__title'>Яндекс.Практикум х BeatFilm</h2>
            <div className='footer__container'>
                <div className='footer__container-link'>
                    <a href='' title='facebook' className='footer__link'>facebook</a>
                    <a href='https://github.com/Hotess' title='Github' className='footer__link'>Github</a>
                    <a href="https://www.instagram.com/h.o.t.e.s" title='Instagram' className='footer__link'>Instagram</a>
                </div>
                <p className='footer__text'>&copy; 2021</p>
            </div>
        </footer>
    );
}