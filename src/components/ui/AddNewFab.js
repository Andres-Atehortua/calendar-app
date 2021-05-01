import { useDispatch, useSelector } from 'react-redux';
import { calendarClearActiveAction } from '../../redux/actions/calendarActions';
import { uiSetOpenModalAction } from '../../redux/actions/uiActions';

const AddNewFab = () => {
  const dispatch = useDispatch();
  const { activeEvent } = useSelector((state) => state.calendar);
  const handleAdd = () => {
    activeEvent && dispatch(calendarClearActiveAction());

    dispatch(uiSetOpenModalAction());
  };
  return (
    <button onClick={handleAdd} className='btn btn-primary fab '>
      <i className='fas fa-plus'></i>
    </button>
  );
};

export default AddNewFab;
