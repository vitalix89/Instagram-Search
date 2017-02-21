const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'SEARCH_IMAGES':

      console.log('SEARCH_IMAGESSSSS', action.payload);
      return [...action.payload];
    default:
      return state;
  }
};
