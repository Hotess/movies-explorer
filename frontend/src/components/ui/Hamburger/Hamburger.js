import './Hamburger.css';

export default function Hamburger(props) {
   const {
       onHandleHamburger,
   } = props;

    return (
        <button
            className='hamburger'
            onClick={onHandleHamburger}
        >
            <span></span>
        </button>
    );
}