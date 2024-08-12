import { EAT_VIEW_DETAIL } from '../constants/actionTypes';

export default (state = {vieweatuser:{}}, action) => {
  switch (action.type) {
    case EAT_VIEW_DETAIL:
      return {
        ...state,
        vieweatuser:action.payload.result[0]
      };
     
    default:
      return state;
  }
};
