import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import useForm from '../../hooks/useForm';
import {
  startLoginAction,
  startRegisterAction,
} from '../../redux/actions/authActions';
import './login.css';
const LoginRegisterScreen = () => {
  const dispath = useDispatch();

  const { values, handleInputChange } = useForm({
    lEmail: 'andres@gmail.com',
    lPassword: '123456',
  });
  const { values: valuesForm, handleInputChange: handleChangeForm } = useForm({
    rName: '',
    rEmail: '',
    rPassword: '',
    rPassword2: '',
  });

  const { lEmail, lPassword } = values;
  const { rName, rEmail, rPassword, rPassword2 } = valuesForm;

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

  const handleRegister = (e) => {
    e.preventDefault();
    if (!rName || !rEmail || !rPassword || !rPassword2) {
      return Swal.fire('Error', 'Debes rellenar todos los campos', 'error');
    } else if (rPassword !== rPassword2) {
      return Swal.fire('Error', 'Las contraseñas deben coincidir.', 'error');
    } else {
      dispath(
        startRegisterAction({ name: rName, email: rEmail, password: rPassword })
      );
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
          <form onSubmit={handleRegister}>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Nombre'
                name='rName'
                onChange={handleChangeForm}
                value={rName}
              />
            </div>
            <div className='form-group'>
              <input
                type='email'
                className='form-control'
                placeholder='Correo'
                name='rEmail'
                onChange={handleChangeForm}
                value={rEmail}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                placeholder='Contraseña'
                name='rPassword'
                value={rPassword}
                onChange={handleChangeForm}
              />
            </div>

            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                placeholder='Repita la contraseña'
                name='rPassword2'
                value={rPassword2}
                onChange={handleChangeForm}
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
