import React from 'react'
import './Modal.css'
import {Button} from 'react-bootstrap'

const Modal = ({ handleClose, handleOk, handleOkText, show, children }) => {
    return (
      <div className={show ? "modal display-block" : "modal display-none"}>
        <section className="modal-main">
          {children}
          <Button variant='success' onClick={handleOk}> {handleOkText} </Button>
          <Button variant='light' onClick={handleClose}> Cancel </Button>
        </section>
      </div>
    );
  };

export default Modal