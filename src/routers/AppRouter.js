import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import LoginRegisterScreen from '../components/auth/LoginRegisterScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <PublicRoutes path='/login'>
            <LoginRegisterScreen />
          </PublicRoutes>

          <PrivateRoutes exact path='/'>
            <CalendarScreen />
          </PrivateRoutes>

          <Redirect to='/' />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
