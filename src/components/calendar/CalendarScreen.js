import { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { es } from 'date-fns/locale';
import Navbar from '../ui/Navbar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages-ES';
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiSetOpenModalAction } from '../../redux/actions/uiActions';
import {
  calendarClearActiveAction,
  calendarSetActiveAction,
} from '../../redux/actions/calendarActions';
import AddNewFab from '../ui/AddNewFab';
import DeleteEventFab from '../ui/DeleteEventFab';

const locales = { es };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarScreen = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'month'
  );

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: 'red',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white',
    };
    return { style };
  };

  const onDoubleClickEvent = (e) => {
    dispatch(uiSetOpenModalAction());
  };

  const onSelectEvent = (e) => {
    dispatch(calendarSetActiveAction(e));
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  };

  const onSelectSlot = (e) => {
    activeEvent && dispatch(calendarClearActiveAction());
  };

  return (
    <div className='calendar__container'>
      <Navbar />
      <Calendar
        messages={messages}
        culture='es'
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={onDoubleClickEvent}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        view={lastView}
        selectable
        onSelectSlot={onSelectSlot}
      />

      <AddNewFab />
      {activeEvent && <DeleteEventFab />}

      <CalendarModal />
    </div>
  );
};

export default CalendarScreen;
