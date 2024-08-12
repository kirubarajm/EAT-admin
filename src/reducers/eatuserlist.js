import { EAT_USERS_LIST, EAT_USERS_FILTER_APPLY, EAT_USRE_PAGE_LOADED} from '../constants/actionTypes';

export default (state = {eatuserlist:[],listtype:-1,search:'',totalcount:0}, action) => {
  switch (action.type) {
    case EAT_USRE_PAGE_LOADED:
      return {
        ...state,
        listtype:-1,
        search:'',
        totalcount:0
      };
    case EAT_USERS_LIST:
      return {
        ...state,
        eatuserlist:action.payload.result,
        totalcount:action.payload.totalcount
      };

      case EAT_USERS_FILTER_APPLY:
      return {
        ...state,
        listtype:action.listtype,
        search:action.search
      };
    default:
      return state;
  }
};
