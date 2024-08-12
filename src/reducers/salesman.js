import { SALESMAN_DETAIL, SALES_USERS_FILTER } from '../constants/actionTypes';

export default (state = {salesmandetail:[],search:''}, action) => {
  switch (action.type) {
    case SALESMAN_DETAIL:
      return {
        ...state,
        salesmandetail:action.payload.result,
        totalSalesuserArrayCount:action.payload.total_list_count || 0,
        pageLimt:action.payload.pageLimt || 0,
      };
      case SALES_USERS_FILTER:
      return {
        ...state,
        search:action.search
      };
    default:
      return state;
  }
};
