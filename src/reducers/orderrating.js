import { ORDER_RATING_PAGE_LOAD, ORDER_RATING_GET_ALL, ORDER_RATING_SET_FILTER } from '../constants/actionTypes';

var initState={
  orderRatingList:[], page:1,page_count:0,
};


export default (state = initState, action) => {
  switch (action.type) {
    case ORDER_RATING_PAGE_LOAD:
    return {
      ...state,
    };
    case ORDER_RATING_GET_ALL:
    return {
      ...state,
      orderRatingList:action.payload.result,
      page_count:action.payload.totalcount||0
    };
    case ORDER_RATING_SET_FILTER:
    return {
      ...state,
      page:action.page,
    };
    default:
      return state;
  }
};
