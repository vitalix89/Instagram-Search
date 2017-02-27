import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Card from 'reactstrap/lib/Card';
import CardImg from 'reactstrap/lib/CardImg';
import CardText from 'reactstrap/lib/CardText';
import CardBlock from 'reactstrap/lib/CardBlock';

import ImageModal from './ImageModal';

import { store } from '../index';
import { searchImages } from '../../actions/apicalls';

class ImagesCard extends Component {


  state = { firstSearch: true };

  btnClick = (obj, index) => {
    store.dispatch({ type: 'OPEN_DIALOG', payload: { openDialog: true } });
    store.dispatch({ type: 'SELECTED_IMAGE', payload: { image: obj.images.standard_resolution.url } });
  }


  renderError() {
    // console.log(this.props.error);

    if (this.props.error.error) {
      return (
        <div className="m-t-6 ">
          <h3 style={{ color: 'white', textAlign: 'center' }} className="display-3">Network Connection Error!</h3>
          <h3 style={{ color: 'white', textAlign: 'center' }} className="display-5">Please cheack your internet connection</h3>
        </div>
      );
    }

   // console.log('no_error');
  }


  renderPreview() {
    if (this.props.params.locationName && !this.props.images.length && this.state.firstSearch) {
      this.props.searchImages(this.props.params.locationName);
      this.setState({ firstSearch: false });


      return <div style={{ marginTop: '118px' }} className="center-block loader" />;
    }


    if (!this.props.images.length && this.state.firstSearch && !this.props.error.error) {
      return (
        <div className="m-t-6" style={{ borderRadius: '45px', margin: 20, backgroundSize: 'cover' }}>


          <h1 style={{ color: 'white', textAlign: 'center' }} className="display-3">Global Photo Search</h1>
          <h3 style={{ color: 'white', textAlign: 'center' }} className="display-5">Find photos from all over the world in one click.</h3>
          <br />
          <h1 style={{ color: 'white', textAlign: 'center' }} className="h3 m-t-0">Popular searches: </h1>
          <h3 style={{ color: 'white', textAlign: 'center' }} className="h3">
            <Link to="/location/tel-aviv" className="lead m-r-2"><a style={{ color: 'rgb(251, 255, 0)' }}>Tel Aviv - Yaffo, Israel</a></Link>
            <Link to="/location/eilat" className="lead m-r-2"><a style={{ color: 'rgb(251, 255, 0)' }}>Eilat City, Israel</a></Link>
            <Link to="/location/big-ben-london/" className="lead"><a style={{ color: 'rgb(251, 255, 0)' }}>Big Ben, London</a></Link>
          </h3>


        </div>
      );
    }
  }


  renderImages() {
   // const imageUrl = ('img' in this.props.selectedImage) ? this.props.selectedImage.img : null;


    if (this.props.loading.loading) {
      return (
        <div style={{ marginTop: '118px' }} className="center-block loader" />
      );
    }
    return (
      <div >

        { this.props.images.map((image, index) =>
          <div key={image.id} style={{ margin: '8px' }} className="col-md-2 pull-left" onClick={() => this.btnClick(image, index)}>
            <Card >
              <CardImg top width="100%" src={image.images.thumbnail.url} alt="Card image cap" />
              <CardBlock>

                <CardText ><i className="fa fa-thumbs-up" aria-hidden="true" /> {image.likes.count}</CardText>

              </CardBlock>
            </Card>
          </div>
        )}

        <ImageModal onToggle={() => store.dispatch({ type: 'OPEN_DIALOG', payload: { openDialog: false } })} imageUrl={this.props.selectedImage.image} dialog={this.props.dialog} />
      </div>

    );
  }

  render() {
    return (
      <div >
        {this.renderPreview()}
        {this.renderImages()}
        {this.renderError()}

      </div>
    );
  }


}


export default connect(state => ({
  images: state.images,
  loading: state.loading,
  dialog: state.openDialog,
  error: state.error,
  selectedImage: state.selectedImage
}), { searchImages })(ImagesCard);

