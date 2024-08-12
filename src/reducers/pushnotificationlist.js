import {PUSH_NOTIFICATION_USER_LIST_FILTER, PUSH_NOTIFICATION_USER_LIST, MAKEIT_GET_HUB, MAKEIT_GET_HUB_SELEDED, PUSH_NOTIFICATION_SEND, PUSH_NOTIFICATION_CLEAR,EAT_COUPON_LIST} from '../constants/actionTypes';

export default (state = {pushUserList:[],search:'',page:1,makeithub:[],hubItem:false,sendpush:false,usertype:1,eatuserlisttype:1,couponlist:[]}, action) => {
  switch (action.type) {
    case PUSH_NOTIFICATION_USER_LIST:
      return {
        ...state,
        pushUserList:action.payload.result || [],
      };
      case PUSH_NOTIFICATION_USER_LIST_FILTER:
      return{
        ...state,
        search:action.search,
        page:action.page,
        hubItem:action.hubitem,
        usertype:action.usertype,
        eatuserlisttype:action.eatuserlisttype
      }
      case MAKEIT_GET_HUB:
        return{
          ...state,
          makeithub:action.payload.result || []
        }
      case PUSH_NOTIFICATION_SEND:
        return{
          ...state,
          sendpush:action.payload.status || false
        }

        case PUSH_NOTIFICATION_CLEAR:
        return{
          ...state,
          sendpush:false
        }

        case EAT_COUPON_LIST:
          return{
            ...state,
            couponlist:action.payload.result || []
          }

    default:
      return state;
  }
};
