import { MAKEIT_PRODUCT_UNAPPROVED_LIST,MAKEIT_UNAPPROVED_FILTER} from '../constants/actionTypes';

export default (state = {productList:[],approved_status:3,new_product_count:0,edit_product_count:0,total_product_count:0}, action) => {
  switch (action.type) {
      case MAKEIT_PRODUCT_UNAPPROVED_LIST:
      return {
        ...state,
        productList:action.payload.result || [],
        new_product_count:action.payload.newCount || 0,
        edit_product_count:action.payload.editCount ||0,
        total_product_count:action.payload.totalCount ||0
      };
      case MAKEIT_UNAPPROVED_FILTER:
      return {
        ...state,
        approved_status:action.approved_status,
      };
    default:
      return state;
  }
};
