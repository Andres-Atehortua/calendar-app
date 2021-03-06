import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import { addHours, isBefore, isEqual, setMinutes, setSeconds } from 'date-fns';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import { uiSetCloseModalAction } from '../../redux/actions/uiActions';
import {
  startAddNewAction,
  calendarClearActiveAction,
  startUpdateAction,
} from '../../redux/actions/calendarActions';
import useForm from '../../hooks/useForm';
import './modal.css';
import { useEffect } from 'react';
import { useRef } from 'react';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');

const now = addHours(setMinutes(setSeconds(new Date(), 0), 0), 1);

const CalendarModal = () => {
  const { openModal } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const { values, handleInputChange, reset, setNewValues } = useForm({
    title: '',
    notes: '',
    start: now,
    end: addHours(now, 1),
  });

  const setted = useRef(false);

  const { notes, title, start, end } = values;

  useEffect(() => {
    if (activeEvent && !setted.current) {
      setted.current = true;
      setNewValues(activeEvent);
    }

    if (!activeEvent && setted.current) {
      setted.current = false;
      reset();
    }
  }, [activeEvent, setNewValues, reset]);

  const closeModal = () => {
    if (setted.current) {
      setted.current = false;
    }
    activeEvent && dispatch(calendarClearActiveAction());
    reset();
    dispatch(uiSetCloseModalAction());
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (isEqual(start, end) || isBefore(end, start)) {
      Swal.fire(
        'Aviso',
        'La fecha fin debe ser mayor a la fecha de inicio.',
        'warning'
      );
    } else if (!title.trim()) {
      Swal.fire('Aviso', 'El evento debe tener un t??tulo', 'warning');
    } else {
      if (activeEvent) {
        dispatch(startUpdateAction(values));
      } else {
        dispatch(startAddNewAction(values));
      }
      closeModal();
    }
  };

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='no se loco'
      className='modal'
      overlayClassName='modal-fondo'
      closeTimeoutMS={200}
      ariaHideApp={!process.env.NODE_ENV === 'test'}
    >
      <h1>{activeEvent ? 'Editar evento' : 'Nuevo evento'}</h1>
      <hr />
      <form onSubmit={handleSubmitForm} className='container'>
        <div className='form-group'>
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            className='form-control'
            value={start}
            onChange={(e) =>
              handleInputChange({ target: { name: 'start', value: e } })
            }
          />
        </div>

        <div className='form-group'>
          <label>Fecha y hora fin</label>
          <DateTimePicker
            className='form-control'
            minDate={start}
            value={end}
            onChange={(e) =>
              handleInputChange({ target: { name: 'end', value: e } })
            }
          />
        </div>

        <hr />
        <div className='form-group'>
          <label>Titulo y notas</label>
          <input
            type='text'
            className='form-control'
            placeholder='T??tulo del evento'
            name='title'
            autoComplete='off'
            value={title}
            onChange={handleInputChange}
          />
          <small id='emailHelp' className='form-text text-muted'>
            Una descripci??n corta
          </small>
        </div>

        <div className='form-group'>
          <textarea
            type='text'
            className='form-control'
            placeholder='Notas'
            rows='5'
            name='notes'
            value={notes}
            onChange={handleInputChange}
            style={{ resize: 'none' }}
          ></textarea>
          <small id='emailHelp' className='form-text text-muted'>
            Informaci??n adicional
          </small>
        </div>

        <button type='submit' className='btn btn-outline-primary btn-block'>
          <i className='far fa-save'></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};

export default CalendarModal;
