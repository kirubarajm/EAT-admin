import {ORDER_VIEW_DETAIL, ORDER_VIEW_QUALITY, ORDER_CALL_NEXT_API, ORDER_STATUS_UPDATE,ORDER_STATUS_CANCEL,ORDER_ITEM_MISSING, ORDER_DELIVED_BY_ADMIN, ORDER_PAYMENT_SUCCESS, ORDER_STATUS_PREPARED_CANCEL, ORDER_STATUS_PICKEDUP_CANCEL, ORDER_CREATE_TICKET, GET_ZENDESK_ISSUES} from '../constants/actionTypes';

export default (state = {vieworders:{},qualityCheck:[],issue_list:[],isCallCheckApi:false,isStopCallApi:false,updateStatus:false,refund:false}, action) => {
  switch (action.type) {
    case ORDER_VIEW_DETAIL:
      return {
        ...state,
        vieworders:action.payload.result[0],
        qualityCheck:[],
        isCallCheckApi:true,
        updateStatus:false,
        refund:false,
      };
      case ORDER_CALL_NEXT_API:
      return {
        ...state,
        isCallCheckApi:false,
        isStopCallApi:false,
        updateStatus:false,
        refund:false,
      };
      case ORDER_VIEW_QUALITY:
      return {
        ...state,
        qualityCheck:action.payload.result,
        isStopCallApi:true,
      };
      case GET_ZENDESK_ISSUES:
      return {
        ...state,
        issue_list:action.payload.result,
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
        case ORDER_PAYMENT_SUCCESS:
        return {
          ...state,
          updateStatus:action.payload.status,
        };
        case ORDER_DELIVED_BY_ADMIN:
        return {
          ...state,
          updateStatus:action.payload.status,
        };
        case ORDER_ITEM_MISSING:
        return {
          ...state,
          refund:action.payload.status,
        };
        case ORDER_STATUS_PREPARED_CANCEL:
            return {
              ...state,
              updateStatus:action.payload.status,
            };
            case ORDER_STATUS_PICKEDUP_CANCEL:
            return {
              ...state,
              updateStatus:action.payload.status,
            };
            case ORDER_CREATE_TICKET:
            return {
              ...state,
              updateStatus:action.payload.status,
            };
    default:
      return state;
  }
};
