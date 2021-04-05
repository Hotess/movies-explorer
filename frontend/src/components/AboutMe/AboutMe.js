import './AboutMe.css';

export default function AboutMe() {
    return (
        <section id='aboutMe' className='aboutMe'>
            <h2 className='aboutMe__title'>Студент</h2>
            <div className='aboutMe__container'>
                <div className='aboutMe__container-life'>
                    <h3 className='aboutMe__heading'>Павел Ополовнин</h3>
                    <p className='aboutMe__profession'>Frontend Developer, 25 лет</p>
                    <p className='aboutMe__text'>
                        Я родился и живу в Москве, закончил МФЮА (Московская финансово&#8209;юридическая академия),
                        Факультет информационных технологий, Организация и технология защиты информации.
                        После окончания учёбы служил в Учебном центре Зенитно-ракетных войск (ЗРВ) cтаршим оператором электронно-вычислительных машин ВКС.
                    </p>
                    <div className='aboutMe__container-link'>
                        <a href="https://github.com/Hotess" title='GitHub' className='aboutMe__link'>GitHub</a>
                        <a href="https://vk.com/hote_s" title='Vk' className='aboutMe__link'>Vk</a>
                    </div>
                </div>
                <div className='aboutMe__image'></div>
            </div>
        </section>
    );
}