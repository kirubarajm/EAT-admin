import {
  LOGIN,
  LOGOUT,
  LOGIN_PAGE_UNLOADED,
  ASYNC_START,
  UPDATE_FIELD_AUTH,
} from '../constants/actionTypes';

export default (state = {loginsuccess:false,logindetail:null,isRedirect:false}, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        inProgress: false,
        loginsuccess:action.payload.status,
        logindetail:action.payload.result[0],
        isRedirect:action.payload.status,
      };
    case LOGOUT:
      return {
        ...state,
        inProgress: false,
        //loginsuccess:action.payload.status,
        //logindetail:null
      };
    
    case LOGIN_PAGE_UNLOADED:
      return {};
    case ASYNC_START:
      if (action.subtype === LOGIN) {
        return { ...state, inProgress: true };
      }
      break;
    case UPDATE_FIELD_AUTH:
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }

  return state;
};
