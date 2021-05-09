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
        cheking: true,
      },
    };

    let store = mockStore(initStore);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
