import { ORDERS_COD_ONLINE_LIST} from '../constants/actionTypes';
import Moment from 'moment';
export default (state = {Product_data:[],date}, action) => {
  switch (action.type) {
    case ORDERS_COD_ONLINE_LIST:
        return {
          ...state,
          Product_data:action.payload.result,
          date:action.date,
        };
    default:
      return state;
  }
};
