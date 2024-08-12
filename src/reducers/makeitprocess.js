import { MAKEIT_PRODUCT_PAGE_LOAD, MAKEIT_ITEM_LIST,MAKEIT_PRODUCT_MENU_DELETE,MAKEIT_SUBMENU_SELECT, MAKEIT_PRODUCT_MENU, MAKEIT_PRODUCT_PAGE_UNLOAD, MAKEIT_PRODUCT_GET_LIVE, MAKEIT_PRODUCT_DELETE_CLEAR, KITCHEN_PRODUCT_PERCENTAGE, MAKEIT_PACKAGE_INVENTORY_LIST, MAKEIT_PRODUCT_DEAIL_ADD_LIVE} from '../constants/actionTypes';

var subMenu = [{ id: 1, name: 'Item Inventory' }, { id: 1, name: 'Menu Product' }, { id: 1, name: 'Live Product' }, { id: 1, name: 'Product Succession' }]

var initState={
    makeit_detail:{},
    makeit_Item_list:[],
    makeit_Product_list:[],
    makeit_Product_Live_list:[],
    sub_menu_id:0,
    sub_menu_name:subMenu[0].name,
    subMenu:subMenu,
    product_delete:false,
    product_percentage_list:0,
    kitchen_percentage:[],
    packageInventorylist:[]
}

export default (state = initState, action) => {
  switch (action.type) {
    case MAKEIT_PRODUCT_PAGE_LOAD:
      return {
        ...state,
        makeit_detail:action.payload.result[0],
        sub_menu_id:0,
        sub_menu_name:subMenu[0].name,
      };
      case MAKEIT_PRODUCT_PAGE_UNLOAD:
      return {...state};
      case MAKEIT_ITEM_LIST:
      return {
        ...state,
        makeit_Item_list:action.payload.result
      };
      case MAKEIT_PRODUCT_MENU:
      return {
        ...state,
        makeit_Product_list:action.payload.result
      };
      case MAKEIT_PRODUCT_GET_LIVE:
      return {
        ...state,
        makeit_Product_Live_list:action.payload.result
      };
      case KITCHEN_PRODUCT_PERCENTAGE:
      return {
        ...state,
        product_percentage_list:action.payload.result,
        kitchen_percentage:action.payload.kitchen_percentage
      };
      case MAKEIT_PRODUCT_MENU_DELETE:
      return {
        ...state,
        product_delete:action.payload.success
      };
      case MAKEIT_PRODUCT_DELETE_CLEAR:
      return {
        ...state,
        product_delete:false,
        productMoveToLive:false
      };
      case MAKEIT_SUBMENU_SELECT:
      return {
        ...state,
        sub_menu_id:action.sub_menu_id,
        sub_menu_name:subMenu[action.sub_menu_id].name,
      };
      
      case MAKEIT_PACKAGE_INVENTORY_LIST:
        return {
          ...state,
          packageInventorylist:action.payload.result,
        };
        case MAKEIT_PRODUCT_DEAIL_ADD_LIVE:
          return { ...state, productMoveToLive:action.payload.status };
    default:
      return state;
  }
};
