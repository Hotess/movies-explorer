import './Techs.css';

export default function Techs() {
    return (
        <section id='techs' className='techs'>
            <h2 className='techs__title'>Технологии</h2>
            <h3 className='techs__heading'>7 технологии</h3>
            <p className='techs__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <div className='techs__table'>
                <a href='https://webref.ru/html' title='webref.ru/html' className='techs__cell'>HTML</a>
                <a href='https://webref.ru/css' title='webref.ru/css' className='techs__cell'>CSS</a>
                <a href='https://learn.javascript.ru' title='learn.javascript.ru' className='techs__cell'>JS</a>
                <a href='https://ru.reactjs.org' title='ru.reactjs.org' className='techs__cell'>React</a>
                <a href='https://git-scm.com' title='git-scm.com' className='techs__cell'>Git</a>
                <a href='https://expressjs.com' title='expressjs.com' className='techs__cell'>Express.js</a>
                <a href='https://www.mongodb.com' title='mongodb.com' className='techs__cell'>mongoDB</a>
            </div>
        </section>
    );
}