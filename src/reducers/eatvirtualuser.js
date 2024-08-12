import { EAT_USRE_PAGE_LOADED, EAT_UPDATE_FIELD, EAT_ADD_USER, EAT_USRE_PAGE_UNLOADED, EAT_FORM_CLEAR } from '../constants/actionTypes';

export default (state = {userAddSuccess:false}, action) => {
  switch (action.type) {
    case EAT_USRE_PAGE_LOADED:
      return {
        ...state
      };
     case EAT_USRE_PAGE_UNLOADED:
      return {};
     case EAT_UPDATE_FIELD:
      return { ...state, [action.key]: action.value };
    case EAT_ADD_USER:
      return {
        ...state,
        userAddSuccess:action.payload.success
      };
      case EAT_FORM_CLEAR:
      return {
        ...state,
        userAddSuccess:false
      };
    default:
      return state;
  }
};
