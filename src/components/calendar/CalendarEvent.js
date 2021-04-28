const CalendarEvent = ({ event }) => {
  const { title, user } = event;
  return (
    <div>
      <span>{title}</span>
      <br />
      <small>- {user.name}</small>
    </div>
  );
};

export default CalendarEvent;
