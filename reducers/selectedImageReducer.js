const INITIAL_STATE = { image: null };


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SELECTED_IMAGE':

      const img = action.payload.image;


      return { image: img };
    default:
      return state;
  }
};
