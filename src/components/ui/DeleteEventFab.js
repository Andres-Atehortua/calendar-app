import { useDispatch } from 'react-redux';
import { startDeleteAction } from '../../redux/actions/calendarActions';

const DeleteEventFab = () => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(startDeleteAction());
  };
  return (
    <button onClick={handleDelete} className='btn btn-danger fab-danger'>
      <i className='fas fa-trash'></i>
      <span> Borrar Evento </span>
    </button>
  );
};

export default DeleteEventFab;
