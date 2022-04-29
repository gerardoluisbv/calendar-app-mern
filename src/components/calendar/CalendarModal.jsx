import React, { useState } from 'react';
import Modal from 'react-modal';

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

  Modal.setAppElement('#root');

export const CalendarModal = () => {

    const [isOpen, setisOpen] = useState(true)

    const closeModal = () => {
        setisOpen(!isOpen);
    }

  return (
    <Modal
        isOpen={ isOpen }
        onRequestClose={closeModal}
        style={ customStyles }
        closeTimeoutMS={200}
        className="modal"
        overlayClassName="modal-fondo"
      >

          <h2> HOLA DESDE MODAL </h2>

    </Modal>
  )
}
