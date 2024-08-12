import { MAKEIT_VIEW_DETAIL, MAKEIT_USERS_SERVICE, MAKEIT_ZONE_AREA } from '../constants/actionTypes';

export default (state = {viewmakeituser:{},unServiceable:false,ZoneData:[]}, action) => {
  switch (action.type) {
    case MAKEIT_VIEW_DETAIL:
      return {
        ...state,
        viewmakeituser:action.payload.result[0],
        unServiceable:false
      };
      case MAKEIT_USERS_SERVICE:
          return{
          ...state,
          unServiceable:action.payload.status
        }
        case MAKEIT_ZONE_AREA:
        return {
          ...state,
          ZoneData: action.payload.result || []
        };
    default:
      return state;
  }
};
