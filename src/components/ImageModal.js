import React from 'react';


import Modal from 'reactstrap/lib/Modal';
import ModalBody from 'reactstrap/lib/ModalBody';


const ImageModal = (props) => {
  // here is super easy to test function.
  // you pass it function as a prop named "onToggle", and just execute it
  // if it executes, it works.
  // doesn't matter what function, just execute and that's it.
  // and you won't break it anymore. like never./?/?
  //

  // const props = {
  //  onToggle() {
  //    return 'suka';
  //  }
  // };

  // you test it like this, you fake props
  // and you pass it your own props. now when toggle executes,
  // it execute fake onToggle and you know what fake onToggle returns.
  // brain dademaadge
// not enougth memory, don't need to memorize. look at it tomorrow.
// i'll help writing some tests for your app.
  const toggle = () => {
    props.onToggle();
  };


  // here you can test if modal is open when you pass it dialog.openDialog prop.
  // if you change it or do something with it, it will break.
  // you can refactor code in someplace else, and forget about this component.
  // maybe you change name of openDialog. maybe something else.
  return (
    <Modal isOpen={props.dialog.openDialog} toggle={toggle}>

      <ModalBody>

        <img className="img-fluid" alt="Responsive image" height="503" width="490" src={props.imageUrl} />

      </ModalBody>

    </Modal>
  );
};


export default ImageModal;

