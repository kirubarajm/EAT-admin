import { DUNZO_COD_ORDERS_ALL_LIST,DUNZO_COD_ORDERS_FILTER_LIST,DUNZO_ORDERS_ASSIGN,ORDERS_TABS_CLICK, ORDER_DELIVED_BY_ADMIN } from '../constants/actionTypes'
export default (state = {orderslist:[] ,orderType:1,search:'',totalcount:0,page:1,currentpage:'today',orderupdatestatus:false,selectedtab:1,}, action) => {
  switch (action.type) {
    
    case DUNZO_COD_ORDERS_ALL_LIST:
      return {
        ...state,
        orderupdatestatus:false,
        orderslist:action.payload.result,
      };
      case DUNZO_COD_ORDERS_FILTER_LIST:
      return {
        ...state,
        orderType:action.orderType,
        search:action.search,
        selectedPage:action.selectedPage
      };

      case DUNZO_ORDERS_ASSIGN:
        return{
          ...state,
          orderupdatestatus:action.payload.status
        };
        case DUNZO_ORDERS_ASSIGN:
          return {
            ...state,
            orderupdatestatus: action.payload.status,
          };
          case ORDER_DELIVED_BY_ADMIN:
            return {
              ...state,
              orderupdatestatus:action.payload.status,
            };

      case ORDERS_TABS_CLICK:
          return {
            ...state,
            selectedtab:action.selectedtab,
          };
      
    default:
      return state;
  }
};
