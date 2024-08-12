import { CHECKOUT_USERS_SELECTED, CHECKOUT_USERS_LIST, CHECKOUT_ORDER_POST, CHECKOUT_ORDER_SUCCESS, CHECKOUT_PAGE_LOADED, CHECKOUT_PAGE_UNLOADED, CHECKOUT_USERS_PLACE} from '../constants/actionTypes';
//13.0074317,80.2037626

var defaultState={eatvuserlist:[],listOfAddress:[],selectedVUserIndex:-1,selectedVUser:{},orderstatus:false,selectedPlaceIndex:-1,selectedPlaceItem:{}}
export default (state = defaultState, action) => {
  switch (action.type) {
    case CHECKOUT_PAGE_LOADED:
      return {
        ...state,
       
      };
    case CHECKOUT_PAGE_UNLOADED:
      return {
        ...state,
        selectedVUserIndex:-1,
        selectedVUser:{},
        selectedPlaceIndex:-1,
        selectedPlaceItem:{},
      };
    case CHECKOUT_USERS_LIST:
      return {
        ...state,
        eatvuserlist:action.payload.result,
      };
      case CHECKOUT_USERS_SELECTED:
      return {
        ...state,
        selectedVUserIndex:action.Index,
        selectedVUser:state.eatvuserlist[action.Index]
      };
      case CHECKOUT_USERS_PLACE:
      return {
        ...state,
        selectedPlaceIndex:action.Index,
        selectedPlaceItem:action.item
      };
      case CHECKOUT_ORDER_POST:
      return {
        ...state,
        orderstatus:action.payload.status
      };
      case CHECKOUT_ORDER_SUCCESS:
      return { ...state,
        eatvuserlist:[],
        selectedVUserIndex:-1,
        selectedVUser:{},
        selectedPlaceIndex:-1,
        selectedPlaceItem:{},
        orderstatus:false
      };
    default:
      return state;
  }
};
