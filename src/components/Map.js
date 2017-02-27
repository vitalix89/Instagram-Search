import React, { Component } from 'react';
import { connect } from 'react-redux';

import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
import { OverlayView } from 'react-google-maps';

import { store } from '../index';
import ImageModal from './ImageModal';

class Maper extends Component {


  drawMarkers = () => this.props.images.map(image => <Marker
    position={{ lat: image.location.latitude, lng: image.location.longitude }} // this shit is this
    title="Click to zoom"
    onClick={() => {
      store.dispatch({ type: 'OPEN_DIALOG', payload: { openDialog: true } });
      store.dispatch({ type: 'SELECTED_IMAGE', payload: { image: image.images.standard_resolution.url } });
    }}
    icon={{ url: image.images.thumbnail.url, scaledSize: new google.maps.Size(42, 68) }}
    key={image.id}
  />);

  render() {
    const GoogleMapsAPI = window.google.maps;


    const mapContainer = <div style={{ height: '100%', width: '100%' }} />;

    return (
      <div style={{ height: '92%', width: '100%', position: 'absolute', top: '55px', left: '0' }}>

        <GoogleMapLoader
          containerElement={mapContainer}
          googleMapElement={
            <GoogleMap
              defaultZoom={10}
              defaultCenter={{ lat: 32, lng: 34 }}

              center={this.props.coords}
              options={{ streetViewControl: false, mapTypeControl: false }}
            >
              {this.drawMarkers()}


              <OverlayView
                style={{ backgroundColor: '#fff' }}
                position={new GoogleMapsAPI.LatLng(32.109333, 34.855499)}
                mapPaneName={OverlayView.MARKER_LAYER}
              >
                <p>Some content</p>
              </OverlayView>
            </GoogleMap>


    }
        />
        <ImageModal onToggle={() => store.dispatch({ type: 'OPEN_DIALOG', payload: { openDialog: false } })} imageUrl={this.props.selectedImage.image} dialog={this.props.dialog} />
      </div>

    );
  }


}


export default connect(state => ({
  images: state.images,
  selectedImage: state.selectedImage,
  dialog: state.openDialog,
  coords: state.coords
}), null)(Maper);

