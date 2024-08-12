import { MAKEIT_PRODUCT_DEAIL_LOAD, MAKEIT_PRODUCT_DEAIL_ADD_LIVE, MAKEIT_PRODUCT_DEAIL_REMOVE_LIVE, MAKEIT_PRODUCT_DEAIL_CLEAR, MAKEIT_PRODUCT_DEAIL_EDIT_COUNT} from '../constants/actionTypes';

var initState={
  productdetail:[],
  productAddToLive:false,
  productRemoveToLive:false,
  productDetailLoad:false,
  productEdittQuantity:false,
  productEditQuantityStatus:false
};

export default (state = initState, action) => {
  switch (action.type) {
    case MAKEIT_PRODUCT_DEAIL_LOAD:
    return {
      ...state,
      productdetail:action.payload.result[0],
      productDetailLoad:true
    };
    case MAKEIT_PRODUCT_DEAIL_ADD_LIVE:
    return { ...state, productMoveToLive:action.payload.status };
    case MAKEIT_PRODUCT_DEAIL_CLEAR:
    return { ...state, productMoveToLive:false,productRemoveToLive:false,productDetailLoad:false,productEdittQuantity:false,productEditQuantityStatus:false};
    case MAKEIT_PRODUCT_DEAIL_EDIT_COUNT:
    return { ...state, productEdittQuantity:action.payload.success,productEditQuantityStatus:action.payload.status };
    case MAKEIT_PRODUCT_DEAIL_REMOVE_LIVE:
    return { ...state, productRemoveToLive:action.payload.success };
    default:
      return state;
  }
};
