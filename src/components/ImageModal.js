import React from 'react';


import Modal from 'reactstrap/lib/Modal';
import ModalBody from 'reactstrap/lib/ModalBody';


const ImageModal = (props) => {
  const toggle = () => {
    props.onToggle();
  };


  return (
    <Modal isOpen={props.dialog.openDialog} toggle={toggle}>

      <ModalBody>

        <img className="img-fluid" alt="Responsive image" height="503" width="490" src={props.imageUrl} />

      </ModalBody>

    </Modal>
  );
};


export default ImageModal;

