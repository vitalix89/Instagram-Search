 const INITIAL_STATE = false;

 export default (state = INITIAL_STATE, action) => {
   switch (action.type) {


     case 'ERROR':
       console.log('ERROR', action.payload);

       const error = action.payload;


       return { error };


     default:
       return state;
   }
 };
