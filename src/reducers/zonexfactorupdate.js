import { ZONE_XFACTOR_UPDATE, ZONE_XFACTOR_UPDATE_CLEAR} from '../constants/actionTypes';

export default (state = {zoneupdateStatus:false}, action) => {
  switch (action.type) {
      case ZONE_XFACTOR_UPDATE:
      return{
        ...state,
        zoneupdateStatus:action.payload.status
      }
      case ZONE_XFACTOR_UPDATE_CLEAR:
      return{
        ...state,
        zoneupdateStatus:false
      }
    default:
      return state;
  }
};
