const INITIAL_STATE = { image: null };
// img: null

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SELECTED_IMAGE':

      const img = action.payload.image;

    //  console.log('SELECTED_IMAGE', action.payload);
      return { image: img };
    default:
      return state;
  }
};
