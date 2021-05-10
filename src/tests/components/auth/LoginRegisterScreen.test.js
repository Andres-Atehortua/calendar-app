import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import LoginRegisterScreen from '../../../components/auth/LoginRegisterScreen';
import {
  startLoginAction,
  startRegisterAction,
} from '../../../redux/actions/authActions';
import Swal from 'sweetalert2';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../../redux/actions/authActions', () => ({
  startLoginAction: jest.fn(),
  startRegisterAction: jest.fn(),
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

const initStore = {
  auth: {
    checking: false,
  },
};

let store = mockStore(initStore);

store.dispatch = jest.fn();

describe('Testing LoginRegisterScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const wrapper = mount(
    <Provider store={store}>
      <LoginRegisterScreen />
    </Provider>
  );
  test('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should call dispatch of login', () => {
    wrapper.find("input[name='lEmail']").simulate('change', {
      target: {
        name: 'lEmail',
        value: 'andres@gmail.com',
      },
    });
    wrapper.find("input[name='lPassword']").simulate('change', {
      target: {
        name: 'lPassword',
        value: '123456',
      },
    });

    wrapper.find('form').at(0).prop('onSubmit')({ preventDefault: () => {} });

    expect(store.dispatch).toHaveBeenCalled();
    expect(startLoginAction).toHaveBeenCalledWith('andres@gmail.com', '123456');
  });

  test('should not register if passwords are differents', () => {
    wrapper.find("input[name='rName']").simulate('change', {
      target: {
        name: 'rName',
        value: 'juan',
      },
    });

    wrapper.find("input[name='rEmail']").simulate('change', {
      target: {
        name: 'rEmail',
        value: 'andres@gmail.com',
      },
    });
    wrapper.find("input[name='rPassword']").simulate('change', {
      target: {
        name: 'rPassword',
        value: '123456',
      },
    });

    wrapper.find("input[name='rPassword2']").simulate('change', {
      target: {
        name: 'rPassword2',
        value: '1234567',
      },
    });

    wrapper.find('form').at(1).prop('onSubmit')({ preventDefault: () => {} });

    expect(store.dispatch).not.toHaveBeenCalled();
    expect(startRegisterAction).not.toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'Las contraseñas deben coincidir.',
      'error'
    );
  });
});
