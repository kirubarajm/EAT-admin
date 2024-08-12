import { ZONE_XFACTOR_LIST, ZONE_XFACTOR_UPDATE} from '../constants/actionTypes';

export default (state = {zonedata:[]}, action) => {
  switch (action.type) {
    case ZONE_XFACTOR_LIST:
      return {
        ...state,
        zonedata:action.payload.result,
      };
      case ZONE_XFACTOR_UPDATE:
      return{
        ...state,
        search:action.search,
        page:action.page
      }
    default:
      return state;
  }
};
