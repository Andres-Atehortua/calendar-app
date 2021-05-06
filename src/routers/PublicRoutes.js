import { Redirect, Route } from 'react-router-dom';

const PublicRoutes = ({ isAuthenticated, children, ...rest }) => {
  // TODO: utlizar auth para redireccionar
  return (
    <Route {...rest}>{!isAuthenticated ? children : <Redirect to='/' />}</Route>
  );
};

export default PublicRoutes;
