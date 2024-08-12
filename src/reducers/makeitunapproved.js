import { MAKEIT_UNAPPROVED_USERS_LIST, MAKEIT_UNAPPROVED__USERS_FILTER} from '../constants/actionTypes';

export default (state = {makeituserlist:[],search:''}, action) => {
  switch (action.type) {
    case MAKEIT_UNAPPROVED_USERS_LIST:
      return {
        ...state,
        makeituserlist:action.payload.result
      };
      case MAKEIT_UNAPPROVED__USERS_FILTER:
      return{
        ...state,
        search:action.search
      }
    default:
      return state;
  }
};
