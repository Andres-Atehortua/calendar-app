import { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, add } from 'date-fns';
import { es } from 'date-fns/locale';
import Navbar from '../ui/Navbar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages-ES';
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';

const locales = { es };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: 'Cumpleaños',
    start: add(new Date(), { hours: 10 }),
    end: add(new Date(), { hours: 13 }),
    bgcolor: '#fafafa',
    user: {
      _id: 123,
      name: 'Andrés',
    },
  },
];
const CalendarScreen = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'month'
  );

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
    console.log(e);
  };

  const onSelectEvent = (e) => {
    console.log(e);
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
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
      />
      <CalendarModal />
    </div>
  );
};

export default CalendarScreen;
