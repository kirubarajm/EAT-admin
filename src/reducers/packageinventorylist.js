import { MAKEIT_PACKAGE_INVENTORY_ROOT_LIST_FILTER, MAKEIT_PACKAGE_INVENTORY_ROOT_LIST} from '../constants/actionTypes';

export default (state = {packageInventoryarray:[],search:'',page:1,totalInventoryArrayCount:0,pageLimt:10}, action) => {
  switch (action.type) {
    case MAKEIT_PACKAGE_INVENTORY_ROOT_LIST:
      return {
        ...state,
        packageInventoryarray:action.payload.result || [],
        totalInventoryArrayCount:action.payload.total_list_count || 0,
        pageLimt:action.payload.pageLimt || 0,
      };
      case MAKEIT_PACKAGE_INVENTORY_ROOT_LIST_FILTER:
      return{
        ...state,
        search:action.search,
        page:action.page
      }
    default:
      return state;
  }
};
