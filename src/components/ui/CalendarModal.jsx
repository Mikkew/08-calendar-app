import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import moment from "moment";
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2'
import { uiCloseModal } from "../../redux/actions/ui";
import { eventStartAddNew, eventClearActiveEvent, eventStartUpdate } from "../../redux/actions/Events";
// import uuidv4 from "../../utils/GeneratorUUID";

import "./CalendarModal.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

const now = moment().minutes(0).second(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');


const initEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: nowPlus1.toDate()
}


export const CalendarModal = () => {

  const dispatch = useDispatch();
  const { modalOpen } = useSelector(state => state.ui);
  const { activeEvent } = useSelector(state => state.calendar);

  const [dateStart, setDateStart] = useState( now.toDate() );
  const [dateEnd, setDateEnd] = useState( nowPlus1.toDate() );
  const [titleValid, setTitleValid] = useState( true );

  const [formValues, setFormValues] = useState(initEvent);

  const { title, notes, start, end } = formValues;

  useEffect(() => {

    if( activeEvent ) setFormValues( activeEvent );
    
  }, [activeEvent, setFormValues]);

  const handleStartDateChange = (e) => {
    setDateStart(e);
    setFormValues({
      ...formValues,
      start: e
    });
  }

  const handleEndDateChange = (e) => {
    setDateEnd(e);
    
    setFormValues({
      ...formValues,
      end: e
    });
  }

  const handleInputChange = ({ target }) => {

    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });

  }

  const closeModal = () => {
    dispatch( uiCloseModal() );
    dispatch( eventClearActiveEvent() );
    setFormValues( initEvent );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if( momentStart.isSameOrAfter( momentEnd ) ) {
      
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La fecha fin debe de ser mayor a la fecha de inicio',
      });

    }

    if( title.trim() < 5 ) {
      setTitleValid(false)
    }

    if ( activeEvent ) {

      dispatch( eventStartUpdate( formValues ) );
      
    } else {
      
      dispatch( 
        eventStartAddNew({
          ...formValues
        }) 
      );

    }


    setTitleValid( true );
    closeModal();
  }


  return (
    <Modal
      isOpen={ modalOpen }
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      closeTimeoutMS={250}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
    >
      
      <form className="container mt-2" onSubmit={ handleSubmit }>
        <h1> { (!activeEvent) ? 'Nuevo Evento' : 'Editar Evento' } </h1>
        <hr />
        <div className="form-group my-2">
          <label className="mb-1 mx-auto row">Fecha y hora inicio</label>
          <div className="d-grid gap-2 mx-auto">
            <DateTimePicker
              className="from-control"
              format="dd-MM-y h:mm:ss a"
              onChange={ handleStartDateChange }
              value={ dateStart }
            />
          </div>
        </div>

        <div className="form-group my-2">
          <label className="mb-1">Fecha y hora fin</label>
          <div className="d-grid gap-2 mx-auto">
            <DateTimePicker
              className="from-control"
              format="dd-MM-y h:mm:ss a"
              onChange={ handleEndDateChange }
              value={ dateEnd }
            />
          </div>
        </div>

        <hr />
        <div className="form-group my-3">
          <label className="mb-1">Titulo y notas</label>
          <input
            type="text"
            className={ `form-control ${!titleValid && 'is-valid'}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={ title }
            onChange={ handleInputChange }
          />
          <small id="emailHelp" className="form-text text-muted my-2">
            Una descripción corta
          </small>
        </div>

        <div className="form-group my-3">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={ notes }
            onChange={ handleInputChange }
          />
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>
        
        <div className="d-grid gap-2 mx-auto">
          <button type="submit" className="btn btn-danger btn-block">
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
        </div>

      </form>
    </Modal>
  );
};
