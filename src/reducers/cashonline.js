import { ORDERS_COD_ONLINE_LIST} from '../constants/actionTypes';
import Moment from 'moment';
var startDate=Moment(new Date()).format("YYYY-MM-DD ")+"07:00:00";
var endDate=Moment(new Date()).format("YYYY-MM-DD HH:MM:SS");
export default (state = {order_data:[],totalamount:0,startDate:startDate,endDate:endDate,paymentType:3}, action) => {
  switch (action.type) {
    case ORDERS_COD_ONLINE_LIST:
        return {
          ...state,
          order_data:action.payload.result,
          startDate:action.startDate,
          endDate:action.endDate,
          paymentType:action.paymentType,
          totalamount:action.payload.totalamount
        };
    default:
      return state;
  }
};
