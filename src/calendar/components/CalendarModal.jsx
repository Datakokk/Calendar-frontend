import { useEffect, useMemo, useState } from "react";
import { addHours, differenceInSeconds } from "date-fns";

import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css'

import Modal from "react-modal";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import nb from 'date-fns/locale/nb';
import { useCalendarStore, useUiStore } from "../../hooks";
import { getEnvVariable } from "../../helpers";

registerLocale('nb', nb);


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

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');   // I find this solution in the internet

// if( getEnvVariable().VITE_MODE !== 'test'){
//   Modal.setAppElement('#root');
// }

export const CalendarModal = () => {

  const { activeEvent, starSavingEvent } = useCalendarStore();

  const { isDataModalOpen, closeDateModal } = useUiStore();

  const [formSubmitted, setformSubmitted] = useState( false );

  const [formValues, setFormValues] = useState({
    title: '',
    notes : '',
    start: new Date(),
    end  : addHours( new Date(), 2 )
  });

  const titleClass = useMemo(() => {
    if( !formSubmitted ) return '';

    return ( formValues.title.length > 0)
            ? 'is-valid'
            : 'is-invalid';

  }, [formValues.title, formSubmitted])  

  const oncloseModal = () => {
    closeDateModal();
  };

  useEffect(() => {
    if( activeEvent !== null){
     setFormValues( {...activeEvent} )
    }
  }, [ activeEvent ])
  
  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  };

  const onDateChanged = ( event, changing ) => {
    setFormValues({
      ...formValues,
      [changing]: event
    })
  };

  const onSubmit = async( event ) => {
    event.preventDefault();
    setformSubmitted( true );

    const difference = differenceInSeconds( formValues.end, formValues.start );

    if( isNaN( difference ) || difference <= 0 ){
      Swal.fire('Feil datoer', 'Sjekk datoene du har lagt inn', 'error');
      return;
    };

    if( formValues.title.length <= 0 ) return;

    console.log(formValues)

    // TODO: 
    await starSavingEvent( formValues );
    closeDateModal();
    setformSubmitted( false );
  }

  return (
    <Modal
      isOpen={ isDataModalOpen} 
      onRequestClose={oncloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMs={200}
    >

      <h1> Nytt Arrangement </h1>
      <hr />
      <form 
        onSubmit={ onSubmit }
        className="container">

        <div className="form-group mb-2">
          <label>Startdato og klokkeslett</label>
          <DatePicker 
            selected={ formValues.start }
            onChange={ (event) => onDateChanged( event, 'start')}
            dateFormat="Pp"
            className="form-control"
            showTimeSelect
            locale="nb"
            //timeCaption="" when we need to put the caption
            />
        </div>

        <div className="form-group mb-2">
          <label>Sluttdato og klokkeslett</label>
          <DatePicker 
            minDate={ formValues.start }
            selected={ formValues.end }
            onChange={ (event) => onDateChanged( event, 'end')}
            dateFormat="Pp"
            className="form-control"
            showTimeSelect
            locale="nb"
            />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Tittel og notater</label>
          <input
            type="text"
            className={`form-control ${ titleClass }`}
            placeholder="Hendelsestittel"
            name="title"
            autoComplete="off"
            value={ formValues.title }
            onChange={ onInputChange }
          />
          <small id="emailHelp" className="form-text text-muted">En kort beskrivelse</small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notater"
            rows="5"
            name="notes"
            value={ formValues.notes }
            onChange={ onInputChange }
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Tilleggsinformasjon</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Lagre </span>
        </button>

      </form>
    </Modal>
  )
}
