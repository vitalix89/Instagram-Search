

import superagent from 'superagent';


export const searchImages = location => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: { loading: true } });

  superagent
      .get(`/test?location=${location}`)

      .end((err, response) => {
        if (err) {
          console.log('err', err);
          setTimeout(() => {
            dispatch({ type: 'LOADING', payload: { loading: false } });
            dispatch({ type: 'ERROR', payload: true });
          }, 3000);
        } else {
          const images = JSON.parse(response.text);


          dispatch({ type: 'LOADING', payload: { loading: false } });
          dispatch({ type: 'HAVE_COORDS', payload: images.coords });
          dispatch({ type: 'SEARCH_IMAGES', payload: images.images });
          dispatch({ type: 'ERROR', payload: false });
        }
      });
};

