import { Route } from 'react-router-dom';

const PublicRoutes = ({ children, ...rest }) => {
  // TODO: utlizar auth para redireccionar
  return <Route {...rest}>{children}</Route>;
};

export default PublicRoutes;
