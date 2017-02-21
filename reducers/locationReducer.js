
const INITIAL_STATE = { lat: 0, lng: 0 };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'HAVE_COORDS':



      const locations = {
        lat: action.payload.lat,
        lng: action.payload.long
      };


      return { ...locations };


    default:
      return state;
  }
};
