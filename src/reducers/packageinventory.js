import {
  MAKEIT_PACKAGE_INVENTORY_ADD,
  MAKEIT_PACKAGE_INVENTORY_CLEAR,
  MAKEIT_PACKAGE_BOX_LIST,
  PACKAGE_GET_ALL_MAKEIT_LIST,
  PACKAGE_GET_SINGLE_INVENTORY,
  MAKEIT_PACKAGE_BOX_FILTER
} from "../constants/actionTypes";
export default (
  state = {
    packageInventoryAddSuccess: false,
    packageInvetoryPrefillSuccess: false,
    makeit_list:[],
    packageBox:[],
    eatCoverId:0,
    packageBoxFiltered:[],
    package_inventory:{}
  },
  action
) => {
  switch (action.type) {
    case MAKEIT_PACKAGE_BOX_LIST:
      return {
        ...state,
        packageInvetoryPrefillSuccess: false,
        packageBox: action.payload.result,
        packageBoxFiltered:action.payload.result,
        eat_cover_id: action.payload.eat_cover_id
      };

      case MAKEIT_PACKAGE_BOX_FILTER:
        const packageid = action.packageid;
      return {
        ...state,
        packageBoxFiltered: packageid!==0?state.packageBox.filter(item => item.id === packageid):state.packageBox,
      };
    case MAKEIT_PACKAGE_INVENTORY_ADD:
      return {
        ...state,
        packageInventoryAddSuccess: action.payload.status
      };
    case MAKEIT_PACKAGE_INVENTORY_CLEAR:
      return {
        ...state,
        packageInventoryAddSuccess: false,
        packageInvetoryPrefillSuccess: false
      };
      case PACKAGE_GET_ALL_MAKEIT_LIST:
        return {
          ...state,
          makeit_list: action.payload.result
        };
        case PACKAGE_GET_SINGLE_INVENTORY:
          return {
            ...state,
            packageInvetoryPrefillSuccess: true,
            package_inventory: action.payload.result[0]
          };
    default:
      return state;
  }
};
