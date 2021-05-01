import { useDispatch } from 'react-redux';
import { calendarDeleteAction } from '../../redux/actions/calendarActions';

const DeleteEventFab = () => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(calendarDeleteAction());
  };
  return (
    <button onClick={handleDelete} className='btn btn-danger fab-danger'>
      <i className='fas fa-trash'></i>
      <span> Borrar Evento </span>
    </button>
  );
};

export default DeleteEventFab;
