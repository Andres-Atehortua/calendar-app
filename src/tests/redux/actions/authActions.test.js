import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';
import * as fetchModule from '../../../helpers/fetch';
import {
  startChecking,
  startLoginAction,
  startRegisterAction,
} from '../../../redux/actions/authActions';
import { authTypes } from '../../../redux/types/authTypes';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

describe('Testing authActions', () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test('should work correctly startLoginAction', async () => {
    await store.dispatch(startLoginAction('andres@gmail.com', '123456'));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: authTypes.LOGIN,
      payload: {
        uid: expect.any(String),
        name: expect.any(String),
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token',
      expect.any(String)
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token-init-date',
      expect.any(Number)
    );

    // Obtener los valores con los que se ha llamado una funcion en forma de arreglo
    // console.log(localStorage.setItem.mock.calls);
  });

  test('should not work correctly startLoginAction', async () => {
    await store.dispatch(startLoginAction('ficticio@gmail.com', '123456'));

    const actions = store.getActions();

    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'No existe ningún usuario asociado a este email.',
      'error'
    );
  });

  test('should work startRegister', async () => {
    fetchModule.fetchWithoutToken = jest.fn(() => ({
      json: () => ({
        success: true,
        uid: '123',
        name: 'test',
        token: 'token-ficticio',
      }),
    }));

    await store.dispatch(
      startRegisterAction({
        name: 'test',
        email: 'test@gmail.com',
        password: '123456',
      })
    );

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: authTypes.LOGIN,
      payload: { uid: '123', name: 'test' },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token',
      'token-ficticio'
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token-init-date',
      expect.any(Number)
    );
  });

  test('should work startChecking', async () => {
    fetchModule.fetchWithToken = jest.fn(() => ({
      json: () => ({
        success: true,
        uid: '123',
        name: 'testeando ando',
        token: 'token bueno',
      }),
    }));

    await store.dispatch(startChecking());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: authTypes.LOGIN,
      payload: {
        uid: '123',
        name: 'testeando ando',
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'token bueno');
  });
});
