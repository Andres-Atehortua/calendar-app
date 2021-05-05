import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import useForm from '../../hooks/useForm';
import { startLoginAction } from '../../redux/actions/authActions';
import './login.css';
const LoginRegisterScreen = () => {
  const dispath = useDispatch();

  const { values, handleInputChange, reset } = useForm({
    lEmail: 'andres@gmail.com',
    lPassword: '123456',
    rEmail: '',
    rPassword: '',
  });

  const { lEmail, lPassword } = values;

  const handleLogin = (e) => {
    e.preventDefault();

    if (!lEmail || !lPassword) {
      Swal.fire(
        'Rellene los datos',
        'Debe introducir un email válido y su correspondiente contraseña',
        'error'
      );
    } else {
      dispath(startLoginAction(lEmail, lPassword));
    }
  };

  return (
    <div className='container login-container'>
      <div className='row'>
        <div className='col-md-6 login-form-1'>
          <h3>Ingreso</h3>
          <form onSubmit={handleLogin}>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Correo'
                name='lEmail'
                value={lEmail}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                placeholder='Contraseña'
                name='lPassword'
                value={lPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <input type='submit' className='btnSubmit' value='Login' />
            </div>
          </form>
        </div>

        <div className='col-md-6 login-form-2'>
          <h3>Registro</h3>
          <form>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Nombre'
              />
            </div>
            <div className='form-group'>
              <input
                type='email'
                className='form-control'
                placeholder='Correo'
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                placeholder='Contraseña'
              />
            </div>

            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                placeholder='Repita la contraseña'
              />
            </div>

            <div className='form-group'>
              <input type='submit' className='btnSubmit' value='Crear cuenta' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterScreen;
