import { FEEDBACK_PAGE_LOAD, FEEDBACK_GET_ALL } from '../constants/actionTypes';

var initState={
  feedbackList:[],
};


export default (state = initState, action) => {
  switch (action.type) {
    case FEEDBACK_PAGE_LOAD:
    return {
      ...state,
    };
    case FEEDBACK_GET_ALL:
    return {
      ...state,
      feedbackList:action.payload.result,
    };
    default:
      return state;
  }
};
