import { PACKAGE_SINGLE_BOX_DETAIL,PACKAGE_BOX_ADD,PACKAGE_BOX_FROM_CLEAR} from '../constants/actionTypes';
export default (state = {packageAddSuccess:false,packagePrefillSuccess:false}, action) => {
  switch (action.type) {
    case PACKAGE_SINGLE_BOX_DETAIL:
        return {
          ...state,
          packagePrefillSuccess:true,
          packagesingleBox:action.payload.result[0],
        };
        case PACKAGE_BOX_ADD:
            return {
              ...state,packageAddSuccess:action.payload.status
            };
            case PACKAGE_BOX_FROM_CLEAR:
            return {
              ...state,
              packageAddSuccess:false,
              packagePrefillSuccess:false,
            };
    default:
      return state;
  }
};
