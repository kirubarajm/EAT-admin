import { MAKEIT_ITEM_POPUP_LOAD,MAKEIT_ITEM_POPUP_UNLOAD,MAKEIT_ITEM_CLEAR,MAKEIT_ITEM_LOAD,MAKEIT_ITEM_ADD } from '../constants/actionTypes';

export default (state = {itemAddSuccess:false,itemPrefillSuccess:false}, action) => {
  switch (action.type) {
    case MAKEIT_ITEM_POPUP_LOAD:
      return {
        ...state
      };
     case MAKEIT_ITEM_POPUP_UNLOAD:
      return {};
    case MAKEIT_ITEM_ADD:
      return {
        ...state,itemAddSuccess:action.payload.success
      };
      case MAKEIT_ITEM_CLEAR:
      return {
        ...state,
        itemAddSuccess:false,
        itemPrefillSuccess:false,
      };
    case MAKEIT_ITEM_LOAD:
    return {
      ...state,
      itemPrefillSuccess:true,
      itemdetail:action.payload.result[0],
    };
    
    default:
      return state;
  }
};
