import { PACKAGE_BOX_LIST} from '../constants/actionTypes';
export default (state = {packageBoxList:[]}, action) => {
  switch (action.type) {
    case PACKAGE_BOX_LIST:
        return {
          ...state,
          packageBoxList:action.payload.result,
        };
    default:
      return state;
  }
};
