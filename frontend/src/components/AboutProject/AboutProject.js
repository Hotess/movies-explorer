import './AboutProject.css';

export default function AboutProject() {
    return (
        <section id='aboutProject' className='aboutProject'>
            <h2 className='aboutProject__title'>О проекте</h2>
            <div className='aboutProject__table'>
                <div className='aboutProject__cell'>
                    <h3 className='aboutProject__heading'>Дипломный проект включал 5 этапов</h3>
                    <p className='aboutProject__text'>Составление плана, работу над backend, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className='aboutProject__cell'>
                    <h3 className='aboutProject__heading'>На выполнение диплома ушло 5 недель</h3>
                    <p className='aboutProject__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className='aboutProject__mark'>
                <div className='aboutProject__indicator'>
                    <p className='aboutProject__one-week'>1 неделя</p>
                    <p className='aboutProject__development'>Back&#8209;end</p>
                </div>
                <div className='aboutProject__indicator'>
                    <p className='aboutProject__four-week'>4 недели</p>
                    <p className='aboutProject__development'>Front&#8209;end</p>
                </div>
            </div>
        </section>
    );
}