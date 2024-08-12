import { PACKAGE_STOCK_LIST,PACKAGE_STOCK_LIST_FILTER} from '../constants/actionTypes';

export default (state = {packagestockarray:[],search:'',page:1,totalStockArrayCount:0,stockLimt:10}, action) => {
  switch (action.type) {
    case PACKAGE_STOCK_LIST:
      return {
        ...state,
        packagestockarray:action.payload.result,
        totalStockArrayCount:action.payload.total_list_count || 0,
        stockLimt:action.payload.pageLimt || 0,
      };
      case PACKAGE_STOCK_LIST_FILTER:
      return{
        ...state,
        search:action.search,
        page:action.page
      }
    default:
      return state;
  }
};
