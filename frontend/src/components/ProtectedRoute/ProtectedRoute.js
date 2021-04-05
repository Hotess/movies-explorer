import { Route, Redirect } from 'react-router-dom';

/** Создать высокого уровня компонент */
const ProtectedRoute = ({ component: Component, ...props }) => (
    <Route>
        {
            () => (props.loggedIn ? <Component {...props} /> : <Redirect exact to='/' />)
        }
    </Route>
);

export default ProtectedRoute;