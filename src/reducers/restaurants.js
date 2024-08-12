import {LIVE_GET_RESTAURANTS, LIVE_RESTAURANTS_FILTER,LIVE_RESTAURANTS_SELECT, LIVE_RESTAURANTS_APPROVAL} from '../constants/actionTypes';
import { MAKEIT_APPROVEL } from '../constants/updateStatus';

export default (state = {restaurantslist:[], virtualkey:-1,appointment_status:3,search:'',selectedRestaurant:{}}, action) => {
  switch (action.type) {
    case LIVE_GET_RESTAURANTS:
      return {
        ...state,
        restaurantslist:action.payload.result,
      };
      case LIVE_RESTAURANTS_FILTER:
      return {
        ...state,
        virtualkey:action.virtualkey,
        search:action.search,
      };
      case LIVE_RESTAURANTS_SELECT:
      return {
        ...state,
        selectedRestaurant:action.selectedRestaurant
      };
      case LIVE_RESTAURANTS_APPROVAL:
      return{
        ...state,
        restaurantslist:state.restaurantslist.map((item, index) => {
          if (index === action.index) {
            return Object.assign({}, item, item.appointment_status=MAKEIT_APPROVEL)
          }
          return item
        })
      }
    default:
      return state;
  }
};
