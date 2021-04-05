import './NavTab.css';

export default function NavTab() {
    return (
        <nav className='navigation'>
            <a href='#aboutProject' title='О проекте' className='link' >О проекте</a>
            <a href='#techs' title='Технологии' className='link' >Технологии</a>
            <a href='#aboutMe' title='Студент' className='link' >Студент</a>
        </nav>
    );
}