import { useDispatch, useSelector } from 'react-redux';
import { startLogoutAction } from '../../redux/actions/authActions';

const Navbar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(startLogoutAction());
  };
  return (
    <div className='navbar navbar-dark bg-dark mb-4'>
      <span className='navbar-brand'>{name}</span>
      <button onClick={handleLogout} className='btn btn-outline-danger'>
        <i className='fas fa-sign-out-alt'></i>
        <span> Salir</span>
      </button>
    </div>
  );
};

export default Navbar;
