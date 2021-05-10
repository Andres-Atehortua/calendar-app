import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import AppRouter from '../../routers/AppRouter';
const middlewares = [thunk];

const mockStore = configureStore(middlewares);

describe('Testing AppRouter', () => {
  test('should match snapshot', () => {
    const initStore = {
      auth: {
        checking: true,
      },
    };

    let store = mockStore(initStore);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h1').exists()).toBeTruthy();
  });

  test('should show public routes', () => {
    const initStore = {
      auth: {
        uid: null,
      },
    };

    let store = mockStore(initStore);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper.find('.login-container').exists()).toBeTruthy();
  });

  test('should show private routes', () => {
    const initStore = {
      auth: {
        uid: '123-abc',
        name: 'ficticio',
      },
      calendar: {
        events: [],
      },
      ui: {
        openModal: false,
      },
    };

    let store = mockStore(initStore);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper.find('.calendar__container').exists()).toBeTruthy();
  });
});
