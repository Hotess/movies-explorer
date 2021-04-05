import './404.css';
import { useHistory } from "react-router-dom";

export default function NotFound() {
    const history = useHistory();

    /** Вернуться на предыдущую страницу */
    function handleGoBack() {
        history.goBack();
    }

    return (
        <div className='notFound'>
            <h1 className='notFound__title'>404</h1>
            <p className='notFound__text'>Страница не найдена</p>
            <button
                aria-label='Назад'
                className='notFound__goBack'
                onClick={handleGoBack}
            >Назад</button>
        </div>
    );
}