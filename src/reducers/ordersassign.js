import { ORDERS_LIST, ORDERS_ITEM_CLICK, MOVEIT_LIST, MOVEIT_ITEM_CLICK, MOVEIT_ORDERS_ASSIGN,ORDERS_TABS_CLICK, MOVEIT_ORDERS_UN_ASSIGN, ORDERS_MOVETO_DUNZO } from '../constants/actionTypes'

export default (state = {orderslist:[],moveitmanlist:[],
    selectedIndex:-1,
    selectedItem:{},
    selectedMoveitndex:-1,
    selectedMoveitItem:{},
    selectedtab:1,
    orderstatus:false
}, action) => {
  switch (action.type) {
    case ORDERS_LIST:
      return {
        ...state,
        orderslist:action.payload.result,
        orderstatus:false,
        selectedMoveitndex:-1,
        selectedMoveitItem:{},
        selectedIndex:-1,
        selectedItem:{},
        moveitmanlist:[],
      };

      case ORDERS_ITEM_CLICK:
      return {
        ...state,
        selectedIndex:action.selectedIndex,
        selectedItem:state.orderslist[action.selectedIndex]
      };
      case ORDERS_TABS_CLICK:
      return {
        ...state,
        selectedtab:action.selectedtab,
      };
      case MOVEIT_LIST:
        var list =action.payload.result;
        if(list&&list.length>0)
        list.sort(function(a, b){
            return a.distance-b.distance
        })
      return {
        ...state,
        moveitmanlist:list,
        selectedMoveitndex:-1,
        selectedMoveitItem:{},
      };
      case MOVEIT_ITEM_CLICK:
      return {
        ...state,
        selectedMoveitndex:action.selectedMoveitndex,
        selectedMoveitItem:state.moveitmanlist[action.selectedMoveitndex]
      };

      case MOVEIT_ORDERS_ASSIGN:
      return {
        ...state,
        selectedMoveitndex:-1,
        selectedMoveitItem:{},
        selectedIndex:-1,
        selectedItem:{},
        moveitmanlist:[],
        orderstatus:action.payload.success
      };
      case MOVEIT_ORDERS_UN_ASSIGN:
      return {
        ...state,
        selectedMoveitndex:-1,
        selectedMoveitItem:{},
        selectedIndex:-1,
        selectedItem:{},
        moveitmanlist:[],
        orderstatus:action.payload.success
      };
      case ORDERS_MOVETO_DUNZO:
      return {
        ...state,
        selectedMoveitndex:-1,
        selectedMoveitItem:{},
        orderstatus:action.payload.status
      };
    default:
      return state;
  }
};
