import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';


import SearchImageReducer from './searchImageReducer';
import LoadingReducer from './loadingReducer';
import OpenDialogReducer from './openDialogReducer';
import SelectedImageReducer from './selectedImageReducer';
import LocationReducer from './locationReducer';
import ErrorReducer from './errorReducer';


const rootReducer = combineReducers({
  form: formReducer,
  error: ErrorReducer,

  images: SearchImageReducer,
  loading: LoadingReducer,
  openDialog: OpenDialogReducer,
  selectedImage: SelectedImageReducer,
  coords: LocationReducer

});

export default rootReducer;

