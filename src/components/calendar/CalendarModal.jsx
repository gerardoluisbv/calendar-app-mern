import React, { useState } from "react";
import Modal from "react-modal";
import DateTimePicker from 'react-datetime-picker';
import moment from "moment";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../actions/ui";



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

const now = moment().minutes(0).seconds(0).add(1,"hours"); //3:00:00
const nowOneMore = now.clone().add(1,"hours"); //4:00:00



export const CalendarModal = () => {

  
  const dispatch = useDispatch();
  const { modalOpen } = useSelector( state  => state.ui);

  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowOneMore.toDate());
  const [titleValid, setTitleValid] = useState(true)

  
  const [formValues, setFormValues] = useState({
    title: "Evento",
    notes: "",
    start: now.toDate(),
    end: nowOneMore.toDate()
  });

  const { notes,   title, start, end } = formValues;

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name] : target.value
    })
    console.log(formValues);
  }

  const closeModal = () => {
    dispatch( uiCloseModal() );
   
  };

 
  const handleStartDateChange = (e) => {
    setDateStart( e );
    setFormValues({
      ...formValues,
      start: e
    })
  }

  
  const handleEndDateChange = (e) => {
    setDateEnd(e);
    setFormValues({
      ...formValues,
      end: e
    })
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();  

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (  momentStart.isSameOrAfter(momentEnd) ) {
      Swal.fire('Error', 'La fecha de inicio debe ser menor a la fecha de fin', 'error');
      return;
    }

    if ( title.trim().length === 0 ) {
     
      return setTitleValid(false);
    }

    // REALIZAR GRABACION

    setTitleValid(true);
    closeModal();
   
  }

  return (
   <> 
    <Modal
      isOpen={ modalOpen }
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form 
        className="container"
        onSubmit={ handleSubmitForm }
       
      >
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker 
            onChange={handleStartDateChange} 
            value={ dateStart } 
            maxDate = { dateEnd }
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker 
            onChange={handleEndDateChange} 
            value={ dateEnd } 
            minDate={ dateStart }
            className="form-control"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleValid && 'is-invalid'}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={ title }
            onChange={ handleInputChange } 
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className={`form-control ${!titleValid && 'is-invalid'}`}
            placeholder="Notas"
            rows="5"
            name="notes"
            value={ notes }
            onChange={ handleInputChange } 
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>

    </>
  );
};
