import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED,DASHBOARD } from '../constants/actionTypes';

export default (state = {dashboard_data:{}}, action) => {
  switch (action.type) {
    case HOME_PAGE_LOADED:
      return {
        ...state,
        tags: action.payload[0].tags
      };
    case HOME_PAGE_UNLOADED:
      return {};
    case DASHBOARD:
        return {
          ...state,
          dashboard_data:action.payload.result
        };
    default:
      return state;
  }
};
