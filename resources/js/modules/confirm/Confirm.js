import React from 'react'
import './Confirm.css'
import {Button} from 'react-bootstrap'

const Confirm = ({ handleClose, handleOk, show, children }) => {
    return (
      <div className={show ? "modal display-block" : "modal display-none"}>
        <section className="modal-main">
          {children}
          <Button variant='success' onClick={handleOk}> Ok </Button>
          <Button variant='light' onClick={handleClose}> Close </Button>
        </section>
      </div>
    );
  };

export default Confirm