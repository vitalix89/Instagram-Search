 const INITIAL_STATE = false;

 export default (state = INITIAL_STATE, action) => {
   switch (action.type) {


     case 'ERROR':


       const error = action.payload;


       return { error };


     default:
       return state;
   }
 };
