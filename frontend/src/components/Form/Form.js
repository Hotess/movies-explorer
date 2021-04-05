import './Form.css';

export default function Form(props) {
    const {
        children,
        formName,
    } = props;

    return (
        <form
            name={formName}
            className='form'
        >
            {children}
        </form>
    );
}