import { EAT_REFUND_ORDER_LIST,REPAYMENT,PAYMENT_CLEAR} from '../constants/actionTypes';

export default (state = {reFundList:[],refunded:false}, action) => {
  switch (action.type) {
    case EAT_REFUND_ORDER_LIST:
      return {
        ...state,
        reFundList:action.payload.result || [],
        refunded:false,
      };
      case REPAYMENT:
      return {
        ...state,
        refunded:action.payload.status,
      };
      case PAYMENT_CLEAR:
        return {
          ...state,
          refunded:false,
        };
    default:
      return state;
  }
};
