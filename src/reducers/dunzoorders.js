import { DUNZO_ORDERS_ALL_LIST,DUNZO_ORDERS_FILTER_LIST } from '../constants/actionTypes'
export default (state = {orderslist:[] ,orderType:-1,search:'',totalcount:0,page:1,currentpage:'today'}, action) => {
  switch (action.type) {
    
    case DUNZO_ORDERS_ALL_LIST:
      return {
        ...state,
        // updateStatus:false,
        //  currentpage:action.currentpage,
        orderslist:action.payload.result,
       // totalcount:action.payload.totalorder,
      };
      case DUNZO_ORDERS_FILTER_LIST:
      return {
        ...state,
        orderType:action.orderType,
        search:action.search,
        selectedPage:action.selectedPage
      };
      
    default:
      return state;
  }
};
