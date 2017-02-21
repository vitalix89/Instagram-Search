const INITIAL_STATE = { openDialog: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'OPEN_DIALOG':

      return { ...action.payload };
    default:
      return state;
  }
};
