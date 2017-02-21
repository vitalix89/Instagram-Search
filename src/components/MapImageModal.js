import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { store } from '../index';

class MapImageModal extends React.Component {

  toggle = () => {
    store.dispatch({ type: 'OPEN_DIALOG', payload: { openDialog: false } });
  }


  // renderImages() {
  //   if (this.props.image.img) {
  //     return (
  //       <img height="503" width="490" src={this.props.image.img.images.thumbnail.url} />
  //     );
  //   } else {
  //     console.log('no');
  //   }
  // }

//  <img height="503" width="490" src={this.props.image.img.images.thumbnail.url} />

  render() {
    console.log('SEEEELECTEED', this.props.image);
    const styles = {
      marginTop: '-4px',
      marginLeft: '-11px'
    };

    return (
      <div>

        <Modal isOpen={this.props.dialog.openDialog} toggle={this.toggle} className={this.props.className}>

          <ModalBody style={styles} />

          <img height="503" width="490" src={this.props.image} />

        </Modal>
      </div>
    );
  }
}

// export default ImageModal;

export default connect(state => ({
  selectedImage: state.selectedImage,
  dialog: state.openDialog
}), null)(MapImageModal);
