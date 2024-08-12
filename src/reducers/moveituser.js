import { MOVEIT_USRE_PAGE_LOADED, MOVEIT_USRE_PAGE_UNLOADED, MOVEIT_UPDATE_FIELD, MOVEIT_ADD_USER, MOVEIT_FORM_CLEAR, MOVEIT_USER_DETAIL, MOVEIT_UPDATE_IMAGE_FIELD, MOVEIT_CLEAR_IMAGE_FIELD } from '../constants/actionTypes';

export default (state = {userAddSuccess:false,userPrefillSuccess:false,viewmoveittuser:{}}, action) => {
  switch (action.type) {
    case MOVEIT_USRE_PAGE_LOADED:
      return {
        ...state
      };
     case MOVEIT_USRE_PAGE_UNLOADED:
      return {};
     case MOVEIT_UPDATE_FIELD:
      return { ...state, [action.key]: action.payload.data.Location };
      case MOVEIT_UPDATE_IMAGE_FIELD:
      return { ...state, [action.key]: action.data };
    case MOVEIT_ADD_USER:
      return {
        ...state,userAddSuccess:action.payload.success,
      };
      case MOVEIT_FORM_CLEAR:
      return {
        ...state,
        userAddSuccess:false,
        userPrefillSuccess:false
      };
      case MOVEIT_CLEAR_IMAGE_FIELD:
      return {
        ...state,
        driver_lic:null,
        vech_insurance:null,
        vech_rcbook:null,
        photo:null,
        legal_document:null
      };
      case MOVEIT_USER_DETAIL:
      return {
        ...state,
        userPrefillSuccess:true,
        viewmoveittuser:action.payload.result[0],
      };
    default:
      return state;
  }
};
