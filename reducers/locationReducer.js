
const INITIAL_STATE = { lat: 0, lng: 0 };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'HAVE_COORDS':


      const locations = {
        lat: action.payload.lat,
        lng: action.payload.long
      };


      return { ...locations };
      // here for example, you can check if this reducer is returning object with
      // lat and lng. and lat and lng are numbers.
      // if you fuck up api service, your test are going to break.
      // you going to pass here some shit, and then look for bug for hours.
      // because you have shit in redux state.

    default:
      return state;
  }
};
