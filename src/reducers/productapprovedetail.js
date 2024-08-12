import { MAKEIT_UNAPPROVED_FILTER, MAKEIT_PRODUCT_APPROVED_DETAIL, MAKEIT_PRODUCT_APPROVED_UPDTAE, MAKEIT_ITEM_APPROVED_UPDTAE} from '../constants/actionTypes';

export default (state = {productdetail:{},approved_status:0, product_approved:false, item_approved:false}, action) => {
  switch (action.type) {
      case MAKEIT_PRODUCT_APPROVED_DETAIL:
      return {
        ...state,
        productdetail:action.payload.result[0] || {},
        product_approved:false,
        item_approved:false,
      };
      case MAKEIT_UNAPPROVED_FILTER:
      return {
        ...state,
        approved_status:action.approved_status,
      };
      case MAKEIT_PRODUCT_APPROVED_UPDTAE:
        return {
          ...state,
          product_approved:action.payload.status,
        };
      case MAKEIT_ITEM_APPROVED_UPDTAE:
          return {
            ...state,
            item_approved:action.payload.status,
          };
    default:
      return state;
  }
};
