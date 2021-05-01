import { useDispatch } from 'react-redux';
import { uiSetOpenModalAction } from '../../redux/actions/uiActions';

const AddNewFab = () => {
  const dispatch = useDispatch();
  const handleAdd = () => {
    dispatch(uiSetOpenModalAction());
  };
  return (
    <button onClick={handleAdd} className='btn btn-primary fab '>
      <i className='fas fa-plus'></i>
    </button>
  );
};

export default AddNewFab;
