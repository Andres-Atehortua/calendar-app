import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import CalendarModal from '../../../components/calendar/CalendarModal';
import { addHours, setMinutes, setSeconds } from 'date-fns';
import {
  startUpdateAction,
  calendarClearActiveAction,
} from '../../../redux/actions/calendarActions';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../../redux/actions/calendarActions', () => ({
  startUpdateAction: jest.fn(),
  calendarClearActiveAction: jest.fn(),
}));

// jest.mock('sweetalert2', () => ({
//   fire: jest.fn(),
// }));
const now = addHours(setMinutes(setSeconds(new Date(), 0), 0), 1);

const initStore = {
  auth: {
    checking: false,
    uid: '123',
    name: 'Andres',
  },
  calendar: {
    events: [],
    activeEvent: {
      title: 'titulo test',
      notes: 'notes test',
      start: now,
      end: addHours(now, 1),
    },
  },
  ui: {
    openModal: true,
  },
};

let store = mockStore(initStore);

store.dispatch = jest.fn();

describe('Testing CalendarScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const wrapper = mount(
    <Provider store={store}>
      <CalendarModal />
    </Provider>
  );

  test('should render correctly', () => {
    expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
  });

  test('should call action to update and close modal', () => {
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    expect(startUpdateAction).toHaveBeenCalledWith(
      initStore.calendar.activeEvent
    );
    expect(calendarClearActiveAction).toHaveBeenCalled();
  });
});
