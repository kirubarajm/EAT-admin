import { MAKEIT_USERS_LIST, MAKEIT_USERS_FILTER, MAKEIT_USERS_SERVICE, MAKEIT_USERS_DELETE} from '../constants/actionTypes';

export default (state = {makeituserlist:[],listtype:-1,search:'',totalKitchenCount:0,unServiceable:false,makeitDelete:false,kitchenLimit:0,page:1}, action) => {
  switch (action.type) {
    case MAKEIT_USERS_LIST:
      return {
        ...state,
        makeituserlist:action.payload.result,
        totalKitchenCount:action.payload.totalkitchencount || 0,
        kitchenLimit:action.payload.kitchenlimit || 0,
        unServiceable:false,
        makeitDelete:false
      };
      case MAKEIT_USERS_FILTER:
      return{
        ...state,
        listtype:action.listtype,
        search:action.search,
        page:action.page
      }
      case MAKEIT_USERS_SERVICE:
        return{
        ...state,
        unServiceable:action.payload.status
      }
      case MAKEIT_USERS_DELETE:
        return{
        ...state,
        makeitDelete:action.payload.status
      }
    default:
      return state;
  }
};
