const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'SEARCH_IMAGES':


      return [...action.payload];
    default:
      return state;
  }
};
