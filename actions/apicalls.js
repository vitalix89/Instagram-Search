import getCoordinatesFromLocation from './facebookcoordsservice';
import getImagesFromCoords from './instagramservice';

import superagent from 'superagent';
import jsonp from 'superagent-jsonp';

export const searchImages = location => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: { loading: true } });

  superagent
      .get(`/test?location=${location}`)
  //   .use(jsonp)
      .end((err, response) => {
        const images = JSON.parse(response.text);
        console.log('res', JSON.parse(response.text));
        dispatch({ type: 'LOADING', payload: { loading: false } });
        dispatch({ type: 'HAVE_COORDS', payload: images.coords });
        dispatch({ type: 'SEARCH_IMAGES', payload: images.images });
      });

  // try {
  //   const coordinates = await getCoordinatesFromLocation(location);

  //   dispatch({ type: 'HAVE_COORDS', payload: coordinates });
  //   const images = await getImagesFromCoords(coordinates);

  //   console.log('images', images);


  //   dispatch({ type: 'SEARCH_IMAGES', payload: images });
  //   dispatch({ type: 'LOADING', payload: { loading: false } });
  // } catch (error) {
  //   dispatch({ type: 'LOADING', payload: { loading: false, error } });
  // }
};

