import { Route } from 'react-router-dom';

const PrivateRoutes = ({ children, ...rest }) => {
  return <Route {...rest}>{children}</Route>;
};

export default PrivateRoutes;
