import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import DeleteEventFab from '../../../components/ui/DeleteEventFab';
import { startDeleteAction } from '../../../redux/actions/calendarActions';

jest.mock('../../../redux/actions/calendarActions', () => ({
  startDeleteAction: jest.fn(),
}));

const middlewares = [thunk];

const mockStore = configureStore(middlewares);

const initStore = {};

let store = mockStore(initStore);
store.dispatch = jest.fn();

describe('Testing DeleteEventFab component', () => {
  const wrapper = mount(
    <Provider store={store}>
      <DeleteEventFab />
    </Provider>
  );
  test('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should call startDeleteAction', () => {
    wrapper.find('button').simulate('click');

    expect(startDeleteAction).toHaveBeenCalled();
  });
});
