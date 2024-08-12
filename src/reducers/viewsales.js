import { SALESMAN_VIEW_DETAIL} from '../constants/actionTypes';

export default (state = {viewsalesuser:{}}, action) => {
  switch (action.type) {
    case SALESMAN_VIEW_DETAIL:
      return {
        ...state,
        viewsalesuser:action.payload.result[0]
      };
     
    default:
      return state;
  }
};
