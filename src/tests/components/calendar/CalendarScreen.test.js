import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import CalendarScreen from '../../../components/calendar/CalendarScreen';
import { messages } from '../../../helpers/calendar-messages-ES';
import { uiTypes } from '../../../redux/types/uiTypes';
import { calendarSetActiveAction } from '../../../redux/actions/calendarActions';
import { act } from '@testing-library/react';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../../redux/actions/calendarActions', () => ({
  calendarSetActiveAction: jest.fn(),
  startLoadAction: jest.fn(),
}));

// jest.mock('sweetalert2', () => ({
//   fire: jest.fn(),
// }));

const initStore = {
  auth: {
    checking: false,
    uid: '123',
    name: 'Andres',
  },
  calendar: {
    events: [],
  },
  ui: {
    openModal: false,
  },
};

let store = mockStore(initStore);

store.dispatch = jest.fn();
Storage.prototype.setItem = jest.fn();

describe('Testing CalendarScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const wrapper = mount(
    <Provider store={store}>
      <CalendarScreen />
    </Provider>
  );

  test('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should interact with Calendar', () => {
    const calendar = wrapper.find('Calendar');

    const calendarMessages = calendar.prop('messages');

    expect(calendarMessages).toEqual(messages);

    calendar.prop('onDoubleClickEvent')();

    expect(store.dispatch).toHaveBeenCalledWith({ type: uiTypes.OPEN_MODAL });

    const event = {
      start: new Date(),
    };

    calendar.prop('onSelectEvent')(event);
    expect(calendarSetActiveAction).toHaveBeenCalledWith(event);

    act(() => {
      calendar.prop('onView')('week');
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week');
  });
});
