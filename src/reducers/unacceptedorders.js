import { ORDER_UNACCPETED_LIST} from '../constants/actionTypes';

export default (state = {orderunaccptedlist:[]}, action) => {
  switch (action.type) {
    case ORDER_UNACCPETED_LIST:
      return {
        ...state,
        orderunaccptedlist:action.payload.result
      };
      
    default:
      return state;
  }
};
