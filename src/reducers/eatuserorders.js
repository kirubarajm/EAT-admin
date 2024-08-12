import { ORDER_STATUS_UPDATE,ORDER_STATUS_CANCEL,ORDERS_ALL_LIST,ORDERS_FILTER_LIST, ORDERS_PAGE_ONLOAD, MAKEIT_GET_HUB_SELEDED,ORDERS_STATUS_FILTER_LIST } from '../constants/actionTypes'
export default (state = {isAlert:false,isAlertCount:0,orderslist:[] ,orderType:-1,search:'',totalcount:0,selectedHub:0,page:1,currentpage:'today',orderstatus:0,updateStatus:false,moveitfilter:-1}, action) => {
  switch (action.type) {
    case ORDERS_PAGE_ONLOAD:
      return {
        ...state,
        orderType:-1,
        search:'',
        totalcount:0,
        isAlert:false,
        isAlertCount:0
      };
    case ORDERS_ALL_LIST:
      return {
        ...state,
        updateStatus:false,
        currentpage:action.currentpage,
        orderslist:action.payload.result,
        totalcount:action.payload.totalorder,
        isAlert:action.payload.isAlert,
        isAlertCount:action.payload.isAlertCount
      };
      case ORDERS_FILTER_LIST:
      return {
        ...state,
        orderType:action.orderType,
        search:action.search,
        selectedPage:action.selectedPage,
        moveitfilter:action.moveitfilter
      };
      case ORDERS_STATUS_FILTER_LIST:
      return {
        ...state,
        orderstatus:action.orderstatus
      };
      case MAKEIT_GET_HUB_SELEDED:
      return {
        ...state,
        selectedHub:action.item,
      };

      case ORDER_STATUS_UPDATE:
        return {
          ...state,
          updateStatus:action.payload.status,
        };
        case ORDER_STATUS_CANCEL:
        return {
          ...state,
          updateStatus:action.payload.status,
        };

    default:
      return state;
  }
};
