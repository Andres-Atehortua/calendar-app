import { Redirect, Route } from 'react-router-dom';

const PrivateRoutes = ({ isAuthenticated, children, ...rest }) => {
  return (
    <Route {...rest}>
      {isAuthenticated ? children : <Redirect to='/login' />}
    </Route>
  );
};

export default PrivateRoutes;
