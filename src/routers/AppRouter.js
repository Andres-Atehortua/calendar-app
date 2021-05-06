import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import LoginRegisterScreen from '../components/auth/LoginRegisterScreen';
import { useDispatch, useSelector } from 'react-redux';
import CalendarScreen from '../components/calendar/CalendarScreen';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import { useEffect } from 'react';
import { startChecking } from '../redux/actions/authActions';

const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) return <h1>Cargando...</h1>;

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoutes isAuthenticated={!!uid} path='/login'>
            <LoginRegisterScreen />
          </PublicRoutes>

          <PrivateRoutes isAuthenticated={!!uid} exact path='/'>
            <CalendarScreen />
          </PrivateRoutes>

          <Redirect to='/' />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
